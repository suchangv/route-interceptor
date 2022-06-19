import typescript from "@rollup/plugin-typescript";

/** @type {import('rollup').RollupOptions} */
export default {
  input: "src/index.ts",
  output: [
    {
      format: "esm",
      file: "dist/index.esm.js",
      sourcemap: true,
    },
    {
      format: "cjs",
      file: "dist/index.js",
      sourcemap: true,
    },
  ],
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
    }),
  ],
};
