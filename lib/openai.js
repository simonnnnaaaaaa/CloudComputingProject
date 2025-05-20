import { Configuration, OpenAIApi } from "openai"

if(!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is required')
}

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

export const openai = new OpenAIApi(configuration)