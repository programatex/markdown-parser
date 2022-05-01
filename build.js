/**
 * @type {import("esbuild").Plugin}
 */
const pegjsPlugin = {
  name: "pegjs",

  setup(build) {
    const path = require("path");
    const fs = require("fs");
    const pegjs = require("pegjs");

    build.onResolve({ filter: /\.pegjs$/ }, (args) => ({
      path: path.resolve(path.dirname(args.importer), args.path),
      namespace: "pegjs"
    }));

    build.onLoad({ filter: /\.pegjs$/, namespace: "pegjs" }, async ({ path }) => {
      try {
        const source = await fs.promises.readFile(path, "utf-8");
        const compiled = pegjs.generate(source, {
          output: "source",
          format: "commonjs"
        });

        return {
          contents: compiled,
          loader: "js",
        };
      } catch (e) {
        return {
          errors: [{ text: e.message }]
        }
      }
    })
  }
};

const esbuild = require("esbuild");

esbuild.build({
  entryPoints: ["src/index.js"],
  outdir: "dist",
  platform: "node",
  
  bundle: true,
  minify: true,
  plugins: [
    pegjsPlugin
  ]
}).catch(() => process.exit(1));