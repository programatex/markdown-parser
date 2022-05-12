{
  // regex: RegExp;
  // elementCreator: (preload: { [string]: string; }) => { type: string; [string]: any; };
  // text: string;

  const generatePartialInlineParser = ({ regex, elementCreator }) => (text) => {
    if (typeof text !== "string") return text;

    const matchRanges = [...text.matchAll(regex)]
      .map(match => ({
        left: match.index,
        right: match.index + match[0].length,
        preload: match.groups
      }));

    if (!matchRanges.length) return [text];

    // splitting with `matchRanges`
    const result = [];

    if (matchRanges[0].left !== 0) {
      result.push(text.slice(0, matchRanges[0].left));
    }
    result.push(elementCreator(matchRanges[0].preload));

    for (let i = 0, l = matchRanges.length - 1; i < l; i++) {
      result.push(text.slice(matchRanges[i].right, matchRanges[i + 1].left));
      result.push(elementCreator(matchRanges[i + 1].preload));
    }

    if (matchRanges[matchRanges.length - 1].right !== text.length) {
      result.push(text.slice(matchRanges[matchRanges.length - 1].right));
    }

    return result;
  }

  const codeParser = generatePartialInlineParser({
    regex: /(`+)(?<content>.+?)\1/g,
    elementCreator: ({ content }) => ({ type: "code", content })
  });

  const boldParser = generatePartialInlineParser({
    regex: /[\*_]{2}(?<content>.+?)[\*_]{2}/g,
    elementCreator: ({ content }) => ({ type: "bold", content })
  });

  const italicParser = generatePartialInlineParser({
    regex: /[\*_](?<content>.+?)[\*_]/g,
    elementCreator: ({ content }) => ({ type: "italic", content })
  });

  const parseInline = (text) => {
    const parsed = [text]
      .map(codeParser).flat()
      .map(boldParser).flat()
      .map(italicParser).flat();

    return parsed;
  };

  const parseBlockquote = (text) => {
    const trimedText = text
      .split("\n")
      .map(line => line.replace(/^\>\s?/, ""))
      .join("\n");

    return peg$parse(trimedText);
  };

 const parseList = (text) => {
    const lines = text
      .split("\n")
      .slice(0, -1)
      .map(line => {
        const ulMatch = line.match(/^(\s*)[\-+*]\s+(.*)$/);
        if (!!ulMatch) {
          return {
            type: "unordered",
            indent: ulMatch[1].length,
            content: ulMatch[2]
          };
        }

        const olMatch = line.match(/^(\s*)[0-9]+\.\s(.*)$/);
        if (!!olMatch) {
          return {
            type: "ordered",
            indent: olMatch[1].length,
            content: olMatch[2]
          };
        }

        return {
          type: "none",
          content: line.trim()
        };
      })
      .reduce((acc, cur, i) => {
        if (cur.type === "none") acc[acc.length - 1].content += `\n${cur.content}`;
        else acc.push(cur);
        
        return acc;
      }, [])
      .map(item => ({
        ...item,
        content: parseInline(item.content)
      }));

    let list = [{ ...lines[0], level: 0 }];
    let indentList = [list[0].indent, Infinity];
    const lists = [list];

    for (let i = 1, l = lines.length; i < l; i++) {
      const level = Math.min(
        indentList.findIndex(indent => lines[i].indent <= indent),
        list[list.length - 1].level + 1
      );
      
      let flag = false;
      if (level === indentList.length - 1) {
        indentList.splice(indentList.length - 1, 0, lines[i].indent);
      } else {
        for(let j = list.length - 1; 0 <= j; j--) {
          if (list[j].level < level) break;
          if (list[j].level === level && list[j].type !== lines[i].type) {
            flag = true;
            break;
          }
        }
      }

      if (flag) {
        list = [{ ...lines[i], level: 0 }];
        lists.push(list);
        indentList = [lines[i].indent, Infinity];
      } else {
        list.push({ ...lines[i], level });
      }
    }

    const nestedLists = lists.map(list => {
      const newlist = {
        type: list[0].type,
        items: []
      };

      let prev = newlist;
      for (let i = 1, l = list.length; i < l; i++) {
        const levelDelta = list[i].level - list[i - 1].level;

        if (levelDelta === 0) {
          prev.items.push(list[i].content);
          continue;
        }
        
        if (levelDelta === 1) {
          const newitem = {
            type: list[i].type,
            items: [list[i].content]
          };
          prev.items.push(newitem);
          prev = newitem;
          continue;
        }
        
        let cur = newlist;
        for (let j = 0, m = list[i].level - 1; j < m; j++) {
          cur = cur.item[cur.item.length - 1];
        }
        cur.items.push(list[i].content);
        prev = cur;
      }

      return newlist;
    });

    return nestedLists;
  };

}

start =
  Document

Document =
  body:Body {
    return {
      body
    };
  }

Body =
  elements:BlockElement* eol* {
  	return elements;
  }

BlockElement =
  eol* element:(HOBlockElement / Paragraph) {
    return element;
  }

HOBlockElement = Codeblock / Blockquote / Heading / Table / List

Codeblock =
  "```" rawOption:$rawtext? eol
  content:Codeblock_Content
  "```" (eol / nothing) {
    const optionList = rawOption.split(":");
    const option = {
      language: optionList[0],
      filename: optionList[1]
    };

  	return {
      type: "codeblock",
      option,
      content
    };
  }

Codeblock_Content =
  content:$(!"```" rawtext? eol)* {
    return content
      .split("\n")
      .slice(0, -1)
      .map(line => (
        line.startsWith("\\")
        ? line.slice(1)
        : line
      ))
      .join("\n")
  }

Blockquote =
  lines:$(
       ">"+ _               rawtext? (eol / nothing)
    (((">"+ _) / (_* char)) rawtext? (eol / nothing))*
  ) {
  	return {
      type: "blockquote",
      content: parseBlockquote(lines)
    };
  }

Heading =
  prefix:Heading_Prefix __ content:$text &(eol / nothing) {
  	return {
      type: "heading",
      level: prefix.level,
      content
    };
  }

Heading_Prefix =
  prefix:("######" / "######" / "####" / "###" / "##" / "#") {
    return {
      level: prefix.length
    };
  }

Table =
  header:Table_Row eol
  aligner:Table_Aligner eol
  body:(Table_Row (eol / nothing))+ {
    return {
      type: "table",
      header: header.map(cell => parseInline(cell)),
      aligner,
      body: body.map(v => v[0].map(parseInline))
    };
  }
  
Table_Row =
  "|" rawText:$([^|\n\r]+ "|")+ _* {
    const row = rawText
      .split("|")
      .slice(0, -1)
      .map(cell => cell.trim());
    
    return row;
  }

Table_Aligner =
  "|" rawText:$(_* ":"? _* "-"+ _* ":"? _* "|")+ _* {
    const align = rawText
      .split("|")
      .slice(0, -1)
      .map(cell => {
        const alignList = ["none", "left", "right", "center"];
      
        const match = cell.match(/(\:?)\s*\-+\s*(\:?)/);
        const alignIndex =
          (!!match[1] ? 1 : 0 )
          + (!!match[2] ? 2 : 0);
        
        return alignList[alignIndex];
      });
    return align; 
  }

List = items:$(
    (_* List_Marker (__ text?)? (eol / nothing))
    (_* ((List_Marker (__ text?)?) / (char text?)) (eol / nothing))*
  ) {
    return {
      type: "list",
      content: parseList(items)
    };
  }

List_Marker = ([0-9]+ ".") / [-+*]

Paragraph =
  content:$(!HOBlockElement rawtext (eol / nothing))+ {
    const parsedContent = content
      .split("  \n")
      .map(item => parseInline(item))
      .flat();

    return {
      type: "paragraph",
      content: parsedContent 
    };
  }

text "text" = $(char / __)+
rawtext "rawtext" = $(char / _)+
char "char" = [^" "\n\r]
esc "esc" = ["\"] //"]
noesc = esc esc
_ "ws" = [" " "　"]
__ "mws" = _+ { return " "; }
eol = [\r\n]
nothing = !.