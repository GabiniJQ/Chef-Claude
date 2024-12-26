import { HfInference } from '@huggingface/inference'

const SYSTEM_PROMPT = `
Eres un asistente que recibe una lista de ingredientes que un usuario tiene y le sugieres una receta que el usuario puede hacer con algunos o todos aquellos ingredientes. No es necesario que se usen todos los ingredientes que el usuario mencione en tu receta. La receta puede incluir ingredientes adicionales que no halla mencionado el usuario, pero intenta no incluir muchos ingredientes adicionales. Entrega la respuesta en el idioma más común dentro de los ingredientes y además en formato Markdown para hacerlo más fácil de renderizar en una página web.
`
const hf = new HfInference(import.meta.env.VITE_HF_ACCESS_TOKEN)

export async function getRecipeFromMistral(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(', ')
  try {
    const response = await hf.chatCompletion({
      model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: `Tengo ${ingredientsString}. Por favor dame una receta que me recomendarías hacer con dichos ingredientes.`,
        },
      ],
      max_tokens: 1024,
    })
    return response.choices[0].message.content
  } catch (err) {
    console.error(err.message)
  }
}
