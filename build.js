/**
 * @type {import("esbuild").Plugin}
 */
const peggyPlugin = {
  name: "peggy",

  setup(build) {
    const path = require("path");
    const fs = require("fs");
    const peggy = require("peggy");

    build.onResolve({ filter: /\.peggy$/ }, (args) => ({
      path: path.resolve(path.dirname(args.importer), args.path),
      namespace: "peggy"
    }));

    build.onLoad({ filter: /\.peggy$/, namespace: "peggy" }, async ({ path }) => {
      try {
        const source = await fs.promises.readFile(path, "utf-8");
        const compiled = peggy.generate(source, {
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
    peggyPlugin
  ]
}).catch(() => process.exit(1));