import React from 'react'
import ClaudeRecipe from './ClaudeRecipe'
import IngredientsList from './IngredientsList'
import { getRecipeFromMistral } from '../ai'

export default function Main() {
  const [ingredients, setIngredients] = React.useState([])

  function addIngredient(formData) {
    const newIngredient = formData.get('ingredient')
    setIngredients((prevIngredient) => [...prevIngredient, newIngredient])
  }

  const [recipe, setRecipe] = React.useState('')

  async function getRecipe() {
    const recipeMarkdown = await getRecipeFromMistral(ingredients)
    setRecipe(recipeMarkdown)
  }

  return (
    <main>
      <form action={addIngredient} className='add-ingredient-form'>
        <input
          type='text'
          placeholder='e.g oregano'
          aria-label='Add ingredient'
          name='ingredient'
          autoComplete='off'
        />
        <button>Añadir ingrediente</button>
      </form>
      {ingredients.length > 0 && (
        <IngredientsList ingredients={ingredients} getRecipe={getRecipe} />
      )}
      {recipe && <ClaudeRecipe recipe={recipe} />}
    </main>
  )
}
