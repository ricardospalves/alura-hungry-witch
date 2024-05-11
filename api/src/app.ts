import fastify from 'fastify'
import { fastifyCors } from '@fastify/cors'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { z as zod } from 'zod'
// import { google,  } from '@ai-sdk/google'
import { streamToResponse, GoogleGenerativeAIStream } from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'

const genAI = new GoogleGenerativeAI('AIzaSyDqm9GfGGp1n9jlC-F2wq18GkjjK11hf9c')
const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

const schema = zod.object({
  prompt: zod.string().min(1),
})

const app = fastify()

app.register(fastifyCors, {
  origin: true,
  credentials: true,
})

app.post('/chat', async (request, reply) => {
  const { prompt } = schema.parse(request.body)
  const result = await model.generateContentStream(prompt)
  const response = result.stream

  const stream = GoogleGenerativeAIStream({
    stream: response,
  })

  streamToResponse(stream, reply.raw, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Acces-Control-Allow-Mthods': 'GET, POST, PUT, DELETE, OPTIONS',
    },
  })
})

export { app }
