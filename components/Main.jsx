import React, { useEffect } from 'react'
import ClaudeRecipe from './ClaudeRecipe'
import IngredientsList from './IngredientsList'
import { getRecipeFromMistral } from '../ai'

export default function Main() {
  // Set state values
  const [ingredients, setIngredients] = React.useState([])
  const [recipe, setRecipe] = React.useState('')
  const [errorMessage, setErrorMessage] = React.useState('')
  const [errorRecipe, setErrorRecipe] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [isLoaded, setIsLoaded] = React.useState(false)
  const recipeSection = React.useRef(null)

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
    try {
      setIsLoading(true)
      setErrorRecipe('')

      // Call API for recipe
      const recipeMarkdown = await getRecipeFromMistral(ingredients)
      setRecipe(recipeMarkdown)
    } catch (error) {
      setErrorRecipe('Error generating recipe: Service Unavailable')
    } finally {
      // Asegurarse de que el estado de carga se desactive
      setIsLoading(false)
      setIsLoaded(true)
    }
  }

  useEffect(() => {
    if (recipe) {
      recipeSection.current.scrollIntoView({ behavior: 'smooth' })
      setIsLoading(false)
      setIsLoaded(true)
    }
  }, [recipe])

  return (
    <main>
      <div className='hero'>
        <h1>Lets get you an exquisit cooking recipe!</h1>

        <ul className='instructions'>
          <li>Add ingredients <strong>one by one</strong> to the list.</li>
          <li>
            Chef Claude needs <strong>at least 4 </strong>
            ingredients to procede with a recipe.
          </li>
        </ul>
        <form action={addIngredient} className='add-ingredient-form'>
          <div className='container-input-btn'>
            <input
              type='text'
              placeholder='ex: oregano'
              aria-label='Add ingredient'
              name='ingredient'
              autoComplete='off'
            />
            {/* <button type='submit'>Add ingredient</button> */}
            <button type='submit'>Add ingredient</button>
          </div>
          <p className='text-error'>{errorMessage}</p>
        </form>
        {ingredients.length > 0 && (
          <IngredientsList
            ingredients={ingredients}
            getRecipe={getRecipe}
            isLoading={isLoading}
            isLoaded={isLoaded}
            errorRecipe={errorRecipe}
          />
        )}
      </div>

      {recipe && <ClaudeRecipe recipe={recipe} ref={recipeSection} />}
    </main>
  )
}
