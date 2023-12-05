import { parse } from "$std/flags/mod.ts";
import { Builder, BuilderOptions } from "https://raw.githubusercontent.com/maemon4095/tauri-deno-builder/main/src/mod.ts";
import { postCssPlugin } from "https://raw.githubusercontent.com/maemon4095/tauri-deno-builder/main/plugins/postCssPlugin.ts";
import cssModulesPlugin from "https://raw.githubusercontent.com/maemon4095/tauri-deno-builder/main/plugins/cssModules/plugin.ts";

const args = parse(Deno.args, {
  boolean: ["dev"],
});
const is_dev = args.dev;
const mode = args._[0];

const configPath = "./deno.json";

const commonOptions: BuilderOptions = {
  denoConfigPath: configPath,
  esbuildPlugins: [
    cssModulesPlugin({ importMap: configPath }),
    postCssPlugin({ importMap: configPath }),
  ]
};

const options: BuilderOptions = is_dev ? {
  ...commonOptions,
  sourceMap: "external",
} : {
  ...commonOptions,
  minifySyntax: true,
  dropLabels: ["DEV"]
};

const builder = new Builder(options);

switch (mode) {
  case "serve": {
    await builder.serve({ watch: ["src", "index.html"] });
    break;
  }
  case "build": {
    await builder.build();
    break;
  }
}