declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AUTH_SECRET: string
      AUTH_GOOGLE_ID: string
      AUTH_GOOGLE_SECRET: string
      OPENAI_API_KEY: string
      NODE_ENV: "development" | "production"
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
