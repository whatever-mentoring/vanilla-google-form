import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  esbuild: {
    jsx: "transform",
    jsxFactory: "createVDOM",
    // jsxFragment: "Fragment",
    jsxImportSource: "@/libs/jsx",
    jsxInject: `import { createVDOM } from '@/lib/jsx/jsx-runtime'`,
  },
});
