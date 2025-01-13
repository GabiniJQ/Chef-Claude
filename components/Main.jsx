import React from 'react'
import ClaudeRecipe from './ClaudeRecipe'
import IngredientsList from './IngredientsList'
import { getRecipeFromMistral } from '../ai'

export default function Main() {
  // Set state values
  const [ingredients, setIngredients] = React.useState([])
  const [recipe, setRecipe] = React.useState('')
  const [errorMessage, setErrorMessage] = React.useState('')

  // Validate and Add form input into ingredients array
  function addIngredient(formData) {
    const newIngredient = formData.get('ingredient').trim().toLowerCase()
    const letterRegex = /^[\p{L}\s]+$/u

    if (newIngredient === '') {
      setErrorMessage('The chef cannot recieve blank ingredients!')
      return
    } else {
      if (!letterRegex.test(newIngredient)) {
        setErrorMessage('Please submit valid ingredients')
        return
      } else {
        if (!ingredients.includes(newIngredient)) {
          setIngredients((prevIngredients) => [
            ...prevIngredients,
            newIngredient,
          ])
          setErrorMessage('')
        } else {
          setErrorMessage('Ingredient is already on the list')
          return
        }
      }
    }
  }

  // Call API for recipe markdown
  async function getRecipe() {
    const recipeMarkdown = await getRecipeFromMistral(ingredients)
    setRecipe(recipeMarkdown)
  }

  return (
    <main>
      <form action={addIngredient} className='add-ingredient-form'>
        <div className='container-input-btn'>
          <input
            type='text'
            placeholder='ex: oregano'
            aria-label='Add ingredient'
            name='ingredient'
            autoComplete='off'
          />
          <button type='submit'>Add ingredients</button>
        </div>
        <p>{errorMessage}</p>
      </form>
      {ingredients.length > 0 && (
        <IngredientsList ingredients={ingredients} getRecipe={getRecipe} />
      )}
      {recipe && <ClaudeRecipe recipe={recipe} />}
    </main>
  )
  //awo
}
