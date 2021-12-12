import * as dotenv from 'dotenv'
dotenv.config()

export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://mongo:27017/pipedrive-bling',
  port: process.env.PORT ?? 3000,

  pipedrive: {
    url: process.env.PIPEDRIVE_URL ?? '',
    token: process.env.PIPEDRIVE_TOKEN ?? ''
  },
  bling: {
    blingUrl: process.env.BLING_URL ?? '',
    apiKey: process.env.BLING_API_KEY ?? ''
  }
}
