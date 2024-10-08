import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "");

  return {
    // Plugins
    plugins: [react()],
    // Define global variables
    define: {
      __API_URL__: JSON.stringify(env.VITE_API_URL),
      __API_KEY__: JSON.stringify(env.VITE_API_KEY),
    },
    // To mocking a prod env
    preview: {
      host: true,
      port: 3001,
    },
  };
});
