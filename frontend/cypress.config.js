import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    chromeWebSecurity: false,
    video: false,
    headed: false,
    watchForFileChanges: false,
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
