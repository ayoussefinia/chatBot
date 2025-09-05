import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.nextjs.alex.todo",
  appName: "TodoApp",
  webDir: "out", // fallback, but won’t be used for SSR
  server: {
    url: "https://todo-29ni.onrender.com",
    cleartext: true,
  },
};

export default config;
