var $e=(o,m)=>()=>(m||o((m={exports:{}}).exports,m),m.exports);var Ae=$e((Sr,we)=>{"use strict";function Fr(o,m){function e(){this.constructor=o}e.prototype=m.prototype,o.prototype=new e}function M(o,m,e,E){var y=Error.call(this,o);return Object.setPrototypeOf&&Object.setPrototypeOf(y,M.prototype),y.expected=m,y.found=e,y.location=E,y.name="SyntaxError",y}Fr(M,Error);function ae(o,m,e){return e=e||" ",o.length>m?o:(m-=o.length,e+=e.repeat(m),o+e.slice(0,m))}M.prototype.format=function(o){var m="Error: "+this.message;if(this.location){var e=null,E;for(E=0;E<o.length;E++)if(o[E].source===this.location.source){e=o[E].text.split(/\r\n|\n|\r/g);break}var y=this.location.start,k=this.location.source+":"+y.line+":"+y.column;if(e){var P=this.location.end,I=ae("",y.line.toString().length),D=e[y.line-1],A=y.line===P.line?P.column:D.length+1;m+=`
 --> `+k+`
`+I+` |
`+y.line+" | "+D+`
`+I+" | "+ae("",y.column-1)+ae("",A-y.column,"^")}else m+=`
 at `+k}return m};M.buildMessage=function(o,m){var e={literal:function(A){return'"'+y(A.text)+'"'},class:function(A){var w=A.parts.map(function(F){return Array.isArray(F)?k(F[0])+"-"+k(F[1]):k(F)});return"["+(A.inverted?"^":"")+w+"]"},any:function(){return"any character"},end:function(){return"end of input"},other:function(A){return A.description}};function E(A){return A.charCodeAt(0).toString(16).toUpperCase()}function y(A){return A.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(w){return"\\x0"+E(w)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(w){return"\\x"+E(w)})}function k(A){return A.replace(/\\/g,"\\\\").replace(/\]/g,"\\]").replace(/\^/g,"\\^").replace(/-/g,"\\-").replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(w){return"\\x0"+E(w)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(w){return"\\x"+E(w)})}function P(A){return e[A.type](A)}function I(A){var w=A.map(P),F,T;if(w.sort(),w.length>0){for(F=1,T=1;F<w.length;F++)w[F-1]!==w[F]&&(w[T]=w[F],T++);w.length=T}switch(w.length){case 1:return w[0];case 2:return w[0]+" or "+w[1];default:return w.slice(0,-1).join(", ")+", or "+w[w.length-1]}}function D(A){return A?'"'+y(A)+'"':"end of input"}return"Expected "+I(o)+" but "+D(m)+" found."};function me(o,m){m=m!==void 0?m:{};var e={},E=m.grammarSource,y={start:ge},k=ge,P="```",I=">",D="######",A="####",w="###",F="##",T="#",q="|",G=":",J="-",xe=".",K=/^[^|\n\r]/,ce=/^[0-9]/,Ce=/^[\-+*]/,Ee=/^[^" "\n\r]/,Fe=/^[""]/,Pe=/^[" " "\u3000"]/,_e=/^[\r\n]/,Q=R("```",!1),H=R(">",!1),oe=R("######",!1),Ie=R("####",!1),Re=R("###",!1),je=R("##",!1),ke=R("#",!1),N=R("|",!1),V=O(["|",`
`,"\r"],!0,!1),Y=R(":",!1),Z=R("-",!1),ue=O([["0","9"]],!1,!1),De=R(".",!1),Le=O(["-","+","*"],!1,!1),Be=S("text"),Me=S("rawtext"),Oe=S("char"),Se=O(['"'," ",'"',`
`,"\r"],!0,!1),Te=S("esc"),qe=O(['"','"'],!1,!1),He=S("ws"),Ne=O(['"'," ",'"'," ",'"',"\u3000",'"'],!1,!1),Ue=S("mws"),We=O(["\r",`
`],!1,!1),Xe=lr(),ze=function(s){return{body:s}},Ge=function(s){return s},Je=function(s){return s},Ke=function(s,t){let i=s.split(":"),l={language:i[0],filename:i[1]};return{type:"codeblock",option:l,content:t}},Qe=function(s){return s.split(`
`).slice(0,-1).map(t=>t.startsWith("\\")?t.slice(1):t).join(`
`)},Ve=function(s){return{type:"blockquote",content:xr(s)}},Ye=function(s,t){return{type:"heading",level:s.level,content:t}},Ze=function(s){return{level:s.length}},er=function(s,t,i){return{type:"table",header:s.map(l=>se(l)),aligner:t,body:i.map(l=>l[0].map(se))}},rr=function(s){return s.split("|").slice(0,-1).map(i=>i.trim())},sr=function(s){return s.split("|").slice(0,-1).map(i=>{let l=["none","left","right","center"],f=i.match(/(\:?)\s*\-+\s*(\:?)/),a=(f[1]?1:0)+(f[2]?2:0);return l[a]})},tr=function(s){return{type:"list",content:Cr(s)}},ir=function(s){let t=s.split(`  
`).map(i=>se(i)).flat();return{type:"paragraph",content:t}},nr=function(){return" "},r=0,x=0,ee=[{line:1,column:1}],j=0,te=[],h=0,re;if("startRule"in m){if(!(m.startRule in y))throw new Error(`Can't start parsing from rule "`+m.startRule+'".');k=y[m.startRule]}function Rr(){return o.substring(x,r)}function jr(){return x}function kr(){return{source:E,start:x,end:r}}function Dr(){return X(x,r)}function Lr(s,t){throw t=t!==void 0?t:X(x,r),he([S(s)],o.substring(x,r),t)}function Br(s,t){throw t=t!==void 0?t:X(x,r),ar(s,t)}function R(s,t){return{type:"literal",text:s,ignoreCase:t}}function O(s,t,i){return{type:"class",parts:s,inverted:t,ignoreCase:i}}function lr(){return{type:"any"}}function fr(){return{type:"end"}}function S(s){return{type:"other",description:s}}function pe(s){var t=ee[s],i;if(t)return t;for(i=s-1;!ee[i];)i--;for(t=ee[i],t={line:t.line,column:t.column};i<s;)o.charCodeAt(i)===10?(t.line++,t.column=1):t.column++,i++;return ee[s]=t,t}function X(s,t){var i=pe(s),l=pe(t);return{source:E,start:{offset:s,line:i.line,column:i.column},end:{offset:t,line:l.line,column:l.column}}}function d(s){r<j||(r>j&&(j=r,te=[]),te.push(s))}function ar(s,t){return new M(s,null,null,t)}function he(s,t,i){return new M(M.buildMessage(s,t),s,t,i)}function ge(){var s;return s=cr(),s}function cr(){var s,t;return s=r,t=or(),x=s,t=ze(t),s=t,s}function or(){var s,t,i,l;for(s=r,t=[],i=ve();i!==e;)t.push(i),i=ve();for(i=[],l=C();l!==e;)i.push(l),l=C();return x=s,s=Ge(t),s}function ve(){var s,t,i;for(s=r,t=[],i=C();i!==e;)t.push(i),i=C();return i=ie(),i===e&&(i=wr()),i!==e?(x=s,s=Je(i)):(r=s,s=e),s}function ie(){var s;return s=ur(),s===e&&(s=hr(),s===e&&(s=gr(),s===e&&(s=dr(),s===e&&(s=mr())))),s}function ur(){var s,t,i,l,f,a,n;return s=r,o.substr(r,3)===P?(t=P,r+=3):(t=e,h===0&&d(Q)),t!==e?(i=r,l=L(),l===e&&(l=null),i=o.substring(i,r),l=C(),l!==e?(f=pr(),o.substr(r,3)===P?(a=P,r+=3):(a=e,h===0&&d(Q)),a!==e?(n=C(),n===e&&(n=_()),n!==e?(x=s,s=Ke(i,f)):(r=s,s=e)):(r=s,s=e)):(r=s,s=e)):(r=s,s=e),s}function pr(){var s,t,i,l,f,a,n;for(s=r,t=r,i=[],l=r,f=r,h++,o.substr(r,3)===P?(a=P,r+=3):(a=e,h===0&&d(Q)),h--,a===e?f=void 0:(r=f,f=e),f!==e?(a=L(),a===e&&(a=null),n=C(),n!==e?(f=[f,a,n],l=f):(r=l,l=e)):(r=l,l=e);l!==e;)i.push(l),l=r,f=r,h++,o.substr(r,3)===P?(a=P,r+=3):(a=e,h===0&&d(Q)),h--,a===e?f=void 0:(r=f,f=e),f!==e?(a=L(),a===e&&(a=null),n=C(),n!==e?(f=[f,a,n],l=f):(r=l,l=e)):(r=l,l=e);return t=o.substring(t,r),x=s,t=Qe(t),s=t,s}function hr(){var s,t,i,l,f,a,n,p,c,u,g,v;if(s=r,t=r,i=r,l=[],o.charCodeAt(r)===62?(f=I,r++):(f=e,h===0&&d(H)),f!==e)for(;f!==e;)l.push(f),o.charCodeAt(r)===62?(f=I,r++):(f=e,h===0&&d(H));else l=e;if(l!==e)if(f=$(),f!==e)if(a=L(),a===e&&(a=null),n=C(),n===e&&(n=_()),n!==e){if(p=[],c=r,u=r,g=[],o.charCodeAt(r)===62?(v=I,r++):(v=e,h===0&&d(H)),v!==e)for(;v!==e;)g.push(v),o.charCodeAt(r)===62?(v=I,r++):(v=e,h===0&&d(H));else g=e;if(g!==e?(v=$(),v!==e?(g=[g,v],u=g):(r=u,u=e)):(r=u,u=e),u===e){for(u=r,g=[],v=$();v!==e;)g.push(v),v=$();v=B(),v!==e?(g=[g,v],u=g):(r=u,u=e)}for(u!==e?(g=L(),g===e&&(g=null),v=C(),v===e&&(v=_()),v!==e?(u=[u,g,v],c=u):(r=c,c=e)):(r=c,c=e);c!==e;){if(p.push(c),c=r,u=r,g=[],o.charCodeAt(r)===62?(v=I,r++):(v=e,h===0&&d(H)),v!==e)for(;v!==e;)g.push(v),o.charCodeAt(r)===62?(v=I,r++):(v=e,h===0&&d(H));else g=e;if(g!==e?(v=$(),v!==e?(g=[g,v],u=g):(r=u,u=e)):(r=u,u=e),u===e){for(u=r,g=[],v=$();v!==e;)g.push(v),v=$();v=B(),v!==e?(g=[g,v],u=g):(r=u,u=e)}u!==e?(g=L(),g===e&&(g=null),v=C(),v===e&&(v=_()),v!==e?(u=[u,g,v],c=u):(r=c,c=e)):(r=c,c=e)}l=[l,f,a,n,p],i=l}else r=i,i=e;else r=i,i=e;else r=i,i=e;return i!==e?t=o.substring(t,r):t=i,t!==e&&(x=s,t=Ve(t)),s=t,s}function gr(){var s,t,i,l,f,a;return s=r,t=vr(),t!==e?(i=W(),i!==e?(l=r,f=U(),f!==e?l=o.substring(l,r):l=f,l!==e?(f=r,h++,a=C(),a===e&&(a=_()),h--,a!==e?(r=f,f=void 0):f=e,f!==e?(x=s,s=Ye(t,l)):(r=s,s=e)):(r=s,s=e)):(r=s,s=e)):(r=s,s=e),s}function vr(){var s,t;return s=r,o.substr(r,6)===D?(t=D,r+=6):(t=e,h===0&&d(oe)),t===e&&(o.substr(r,6)===D?(t=D,r+=6):(t=e,h===0&&d(oe)),t===e&&(o.substr(r,4)===A?(t=A,r+=4):(t=e,h===0&&d(Ie)),t===e&&(o.substr(r,3)===w?(t=w,r+=3):(t=e,h===0&&d(Re)),t===e&&(o.substr(r,2)===F?(t=F,r+=2):(t=e,h===0&&d(je)),t===e&&(o.charCodeAt(r)===35?(t=T,r++):(t=e,h===0&&d(ke))))))),t!==e&&(x=s,t=Ze(t)),s=t,s}function dr(){var s,t,i,l,f,a,n,p,c;if(s=r,t=ne(),t!==e)if(i=C(),i!==e)if(l=$r(),l!==e)if(f=C(),f!==e){if(a=[],n=r,p=ne(),p!==e?(c=C(),c===e&&(c=_()),c!==e?(p=[p,c],n=p):(r=n,n=e)):(r=n,n=e),n!==e)for(;n!==e;)a.push(n),n=r,p=ne(),p!==e?(c=C(),c===e&&(c=_()),c!==e?(p=[p,c],n=p):(r=n,n=e)):(r=n,n=e);else a=e;a!==e?(x=s,s=er(t,l,a)):(r=s,s=e)}else r=s,s=e;else r=s,s=e;else r=s,s=e;else r=s,s=e;return s}function ne(){var s,t,i,l,f,a,n;if(s=r,o.charCodeAt(r)===124?(t=q,r++):(t=e,h===0&&d(N)),t!==e){if(i=r,l=[],f=r,a=[],K.test(o.charAt(r))?(n=o.charAt(r),r++):(n=e,h===0&&d(V)),n!==e)for(;n!==e;)a.push(n),K.test(o.charAt(r))?(n=o.charAt(r),r++):(n=e,h===0&&d(V));else a=e;if(a!==e?(o.charCodeAt(r)===124?(n=q,r++):(n=e,h===0&&d(N)),n!==e?(a=[a,n],f=a):(r=f,f=e)):(r=f,f=e),f!==e)for(;f!==e;){if(l.push(f),f=r,a=[],K.test(o.charAt(r))?(n=o.charAt(r),r++):(n=e,h===0&&d(V)),n!==e)for(;n!==e;)a.push(n),K.test(o.charAt(r))?(n=o.charAt(r),r++):(n=e,h===0&&d(V));else a=e;a!==e?(o.charCodeAt(r)===124?(n=q,r++):(n=e,h===0&&d(N)),n!==e?(a=[a,n],f=a):(r=f,f=e)):(r=f,f=e)}else l=e;if(l!==e?i=o.substring(i,r):i=l,i!==e){for(l=[],f=$();f!==e;)l.push(f),f=$();x=s,s=rr(i)}else r=s,s=e}else r=s,s=e;return s}function $r(){var s,t,i,l,f,a,n,p,c,u,g,v,b;if(s=r,o.charCodeAt(r)===124?(t=q,r++):(t=e,h===0&&d(N)),t!==e){for(i=r,l=[],f=r,a=[],n=$();n!==e;)a.push(n),n=$();for(o.charCodeAt(r)===58?(n=G,r++):(n=e,h===0&&d(Y)),n===e&&(n=null),p=[],c=$();c!==e;)p.push(c),c=$();if(c=[],o.charCodeAt(r)===45?(u=J,r++):(u=e,h===0&&d(Z)),u!==e)for(;u!==e;)c.push(u),o.charCodeAt(r)===45?(u=J,r++):(u=e,h===0&&d(Z));else c=e;if(c!==e){for(u=[],g=$();g!==e;)u.push(g),g=$();for(o.charCodeAt(r)===58?(g=G,r++):(g=e,h===0&&d(Y)),g===e&&(g=null),v=[],b=$();b!==e;)v.push(b),b=$();o.charCodeAt(r)===124?(b=q,r++):(b=e,h===0&&d(N)),b!==e?(a=[a,n,p,c,u,g,v,b],f=a):(r=f,f=e)}else r=f,f=e;if(f!==e)for(;f!==e;){for(l.push(f),f=r,a=[],n=$();n!==e;)a.push(n),n=$();for(o.charCodeAt(r)===58?(n=G,r++):(n=e,h===0&&d(Y)),n===e&&(n=null),p=[],c=$();c!==e;)p.push(c),c=$();if(c=[],o.charCodeAt(r)===45?(u=J,r++):(u=e,h===0&&d(Z)),u!==e)for(;u!==e;)c.push(u),o.charCodeAt(r)===45?(u=J,r++):(u=e,h===0&&d(Z));else c=e;if(c!==e){for(u=[],g=$();g!==e;)u.push(g),g=$();for(o.charCodeAt(r)===58?(g=G,r++):(g=e,h===0&&d(Y)),g===e&&(g=null),v=[],b=$();b!==e;)v.push(b),b=$();o.charCodeAt(r)===124?(b=q,r++):(b=e,h===0&&d(N)),b!==e?(a=[a,n,p,c,u,g,v,b],f=a):(r=f,f=e)}else r=f,f=e}else l=e;if(l!==e?i=o.substring(i,r):i=l,i!==e){for(l=[],f=$();f!==e;)l.push(f),f=$();x=s,s=sr(i)}else r=s,s=e}else r=s,s=e;return s}function mr(){var s,t,i,l,f,a,n,p,c,u,g,v;for(s=r,t=r,i=r,l=r,f=[],a=$();a!==e;)f.push(a),a=$();if(a=le(),a!==e?(n=r,p=W(),p!==e?(c=U(),c===e&&(c=null),p=[p,c],n=p):(r=n,n=e),n===e&&(n=null),p=C(),p===e&&(p=_()),p!==e?(f=[f,a,n,p],l=f):(r=l,l=e)):(r=l,l=e),l!==e){for(f=[],a=r,n=[],p=$();p!==e;)n.push(p),p=$();for(p=r,c=le(),c!==e?(u=r,g=W(),g!==e?(v=U(),v===e&&(v=null),g=[g,v],u=g):(r=u,u=e),u===e&&(u=null),c=[c,u],p=c):(r=p,p=e),p===e&&(p=r,c=B(),c!==e?(u=U(),u===e&&(u=null),c=[c,u],p=c):(r=p,p=e)),p!==e?(c=C(),c===e&&(c=_()),c!==e?(n=[n,p,c],a=n):(r=a,a=e)):(r=a,a=e);a!==e;){for(f.push(a),a=r,n=[],p=$();p!==e;)n.push(p),p=$();p=r,c=le(),c!==e?(u=r,g=W(),g!==e?(v=U(),v===e&&(v=null),g=[g,v],u=g):(r=u,u=e),u===e&&(u=null),c=[c,u],p=c):(r=p,p=e),p===e&&(p=r,c=B(),c!==e?(u=U(),u===e&&(u=null),c=[c,u],p=c):(r=p,p=e)),p!==e?(c=C(),c===e&&(c=_()),c!==e?(n=[n,p,c],a=n):(r=a,a=e)):(r=a,a=e)}l=[l,f],i=l}else r=i,i=e;return i!==e?t=o.substring(t,r):t=i,t!==e&&(x=s,t=tr(t)),s=t,s}function le(){var s,t,i;if(s=r,t=[],ce.test(o.charAt(r))?(i=o.charAt(r),r++):(i=e,h===0&&d(ue)),i!==e)for(;i!==e;)t.push(i),ce.test(o.charAt(r))?(i=o.charAt(r),r++):(i=e,h===0&&d(ue));else t=e;return t!==e?(o.charCodeAt(r)===46?(i=xe,r++):(i=e,h===0&&d(De)),i!==e?(t=[t,i],s=t):(r=s,s=e)):(r=s,s=e),s===e&&(Ce.test(o.charAt(r))?(s=o.charAt(r),r++):(s=e,h===0&&d(Le))),s}function wr(){var s,t,i,l,f,a,n;if(s=r,t=r,i=[],l=r,f=r,h++,a=ie(),h--,a===e?f=void 0:(r=f,f=e),f!==e?(a=L(),a!==e?(n=C(),n===e&&(n=_()),n!==e?(f=[f,a,n],l=f):(r=l,l=e)):(r=l,l=e)):(r=l,l=e),l!==e)for(;l!==e;)i.push(l),l=r,f=r,h++,a=ie(),h--,a===e?f=void 0:(r=f,f=e),f!==e?(a=L(),a!==e?(n=C(),n===e&&(n=_()),n!==e?(f=[f,a,n],l=f):(r=l,l=e)):(r=l,l=e)):(r=l,l=e);else i=e;return i!==e?t=o.substring(t,r):t=i,t!==e&&(x=s,t=ir(t)),s=t,s}function U(){var s,t,i;if(h++,s=r,t=[],i=B(),i===e&&(i=W()),i!==e)for(;i!==e;)t.push(i),i=B(),i===e&&(i=W());else t=e;return t!==e?s=o.substring(s,r):s=t,h--,s===e&&(t=e,h===0&&d(Be)),s}function L(){var s,t,i;if(h++,s=r,t=[],i=B(),i===e&&(i=$()),i!==e)for(;i!==e;)t.push(i),i=B(),i===e&&(i=$());else t=e;return t!==e?s=o.substring(s,r):s=t,h--,s===e&&(t=e,h===0&&d(Me)),s}function B(){var s,t;return h++,Ee.test(o.charAt(r))?(s=o.charAt(r),r++):(s=e,h===0&&d(Se)),h--,s===e&&(t=e,h===0&&d(Oe)),s}function de(){var s,t;return h++,Fe.test(o.charAt(r))?(s=o.charAt(r),r++):(s=e,h===0&&d(qe)),h--,s===e&&(t=e,h===0&&d(Te)),s}function Mr(){var s,t,i;return s=r,t=de(),t!==e?(i=de(),i!==e?(t=[t,i],s=t):(r=s,s=e)):(r=s,s=e),s}function $(){var s,t;return h++,Pe.test(o.charAt(r))?(s=o.charAt(r),r++):(s=e,h===0&&d(Ne)),h--,s===e&&(t=e,h===0&&d(He)),s}function W(){var s,t,i;if(h++,s=r,t=[],i=$(),i!==e)for(;i!==e;)t.push(i),i=$();else t=e;return t!==e&&(x=s,t=nr()),s=t,h--,s===e&&(t=e,h===0&&d(Ue)),s}function C(){var s;return _e.test(o.charAt(r))?(s=o.charAt(r),r++):(s=e,h===0&&d(We)),s}function _(){var s,t;return s=r,h++,o.length>r?(t=o.charAt(r),r++):(t=e,h===0&&d(Xe)),h--,t===e?s=void 0:(r=s,s=e),s}let fe=({regex:s,elementCreator:t})=>i=>{if(typeof i!="string")return i;let l=[...i.matchAll(s)].map(a=>({left:a.index,right:a.index+a[0].length,preload:a.groups}));if(!l.length)return[i];let f=[];l[0].left!==0&&f.push(i.slice(0,l[0].left)),f.push(t(l[0].preload));for(let a=0,n=l.length-1;a<n;a++)f.push(i.slice(l[a].right,l[a+1].left)),f.push(t(l[a+1].preload));return l[l.length-1].right!==i.length&&f.push(i.slice(l[l.length-1].right)),f},Ar=fe({regex:/(`+)(?<content>.+?)\1/g,elementCreator:({content:s})=>({type:"code",content:s})}),br=fe({regex:/[\*_]{2}(?<content>.+?)[\*_]{2}/g,elementCreator:({content:s})=>({type:"bold",content:s})}),yr=fe({regex:/[\*_](?<content>.+?)[\*_]/g,elementCreator:({content:s})=>({type:"italic",content:s})}),se=s=>[s].map(Ar).flat().map(br).flat().map(yr).flat(),xr=s=>{let t=s.split(`
`).map(i=>i.replace(/^\>\s?/,"")).join(`
`);return me(t)},Cr=s=>{let t=s.split(`
`).slice(0,-1).map(n=>{let p=n.match(/^(\s*)[\-+*]\s+(.*)$/);if(p)return{type:"unordered",indent:p[1].length,content:p[2]};let c=n.match(/^(\s*)[0-9]+\.\s(.*)$/);return c?{type:"ordered",indent:c[1].length,content:c[2]}:{type:"none",content:n.trim()}}).reduce((n,p,c)=>(p.type==="none"?n[n.length-1].content+=`
${p.content}`:n.push(p),n),[]).map(n=>({...n,content:se(n.content)})),i=[{...t[0],level:0}],l=[i[0].indent,1/0],f=[i];for(let n=1,p=t.length;n<p;n++){let c=Math.min(l.findIndex(g=>t[n].indent<=g),i[i.length-1].level+1),u=!1;if(c===l.length-1)l.splice(l.length-1,0,t[n].indent);else for(let g=i.length-1;0<=g&&!(i[g].level<c);g--)if(i[g].level===c&&i[g].type!==t[n].type){u=!0;break}u?(i=[{...t[n],level:0}],f.push(i),l=[t[n].indent,1/0]):i.push({...t[n],level:c})}return f.map(n=>{let p={type:n[0].type,items:[]},c=p;for(let u=1,g=n.length;u<g;u++){let v=n[u].level-n[u-1].level;if(v===0){c.items.push(n[u].content);continue}if(v===1){let z={type:n[u].type,items:[n[u].content]};c.items.push(z),c=z;continue}let b=p;for(let z=0,Er=n[u].level-1;z<Er;z++)b=b.item[b.item.length-1];b.items.push(n[u].content),c=b}return p})};if(re=k(),re!==e&&r===o.length)return re;throw re!==e&&r<o.length&&d(fr()),he(te,j<o.length?o.charAt(j):null,j<o.length?X(j,j+1):X(j,j))}we.exports={SyntaxError:M,parse:me}});var ye=$e((Tr,be)=>{var Pr=Ae(),_r=o=>Pr.parse(o);be.exports={md2ast:_r}});var{md2ast:Ir}=ye();module.exports={md2ast:Ir};
