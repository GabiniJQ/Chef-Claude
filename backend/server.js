import express from 'express'
import 'dotenv/config'
import cors from 'cors'

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page, and also make sure your response is in the same language as the ingredients. State your answer directly as a recipe and don't include introductions or extra following comments. If ingredients input doesn't make sense, respond by apologizing and stating that the ingredients are not valid.
`

const app = express()
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://chef-claude.pages.dev/'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
)
app.use(express.json())

// Wake up server
app.post('/api/ping', async (req, res) => {
  res.status(200).json({
    message: 'Server loaded'
  })
})

app.post('/api/recipe', async (req, res) => {
  const { ingredients } = req.body

  if (!ingredients) {
    return res.status(404).json({
      message: 'Ingredientes no encontrados o no válidos.',
    })
  }

  // Call OpenRoute  nvidia/nemotron-nano-9b-v2:free model
  try {
    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.OP_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'nvidia/nemotron-nano-9b-v2:free',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            {
              role: 'user',
              content: `I have ${ingredients}. Please give me a recipe you'd recommend I make!`,
            },
          ],
        }),
      },
    )

    const data = await response.json()

    res.status(200).json({
      recipe: data.choices[0].message.content,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'LLM request failed' })
  }
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
