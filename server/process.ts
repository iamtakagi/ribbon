import assert from 'assert'

declare global {
  namespace NodeJS {
    interface Env {
      PORT: string
    }
  }
}

assert(process.env.PORT, 'PORT must be defined')