import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: '/whatsapp-saliente-wxcc/', // 👈 mismo nombre que el repo
  plugins: [react()],
  build: {
    sourcemap: true,
    lib: {
      entry: "src/main.tsx",
      name: "WxccWhatsapp",
      fileName: () => "wxcc-whatsapp.js",
      formats: ["iife"],
    },
    rollupOptions: {
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
      // No excluyas @wxcc-desktop/sdk para que se empaquete
      // external: ["react", "react-dom"], // Solo react y react-dom como externos
    },
  },
  define: {
    "process.env": {},
  },
});