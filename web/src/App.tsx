import { useEffect, useState } from 'react'
import { useCompletion } from 'ai/react'
import { api } from './services/api'

export const App = () => {
  const [prompt, setPrompt] = useState('Qual é a capital do Brasil?')
  const [chat, setChat] = useState<string[]>([])
  const { completion, handleSubmit, input, handleInputChange } = useCompletion({
    api: 'http://localhost:3333/chat',
    body: {
      prompt,
    },
    headers: {
      'Content-type': 'application/json',
    },
  })

  useEffect(() => {
    setPrompt(input)
  }, [input])

  return (
    <>
      <h1>App</h1>

      <textarea value={completion}></textarea>

      {/* <article>
        {chat.map((message, index) => {
          return (
            <div key={index} style={{ border: '1px solid', margin: '2rem 0' }}>
              {message}
            </div>
          )
        })}
      </article> */}

      <form onSubmit={handleSubmit}>
        <textarea
          cols={48}
          rows={16}
          value={input}
          onChange={handleInputChange}
          placeholder="Prompt"
        ></textarea>

        <button type="submit">Enviar</button>
      </form>
    </>
  )
}
