import React, { useEffect } from 'react'
import ClaudeRecipe from './ClaudeRecipe'
import IngredientsList from './IngredientsList'

export default function Main() {
  // Set state values
  const [ingredients, setIngredients] = React.useState([])
  const [recipe, setRecipe] = React.useState('')
  const [errorMessage, setErrorMessage] = React.useState('')
  const [errorRecipe, setErrorRecipe] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [loadedServer, setLoadedServer] = React.useState(false)
  const recipeSection = React.useRef(null)
  console.log(loadedServer)

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
      /* const recipeMarkdown = await getRecipeFromMistral(ingredients) */
      const response = await fetch(`${import.meta.env.VITE_API_URL}/recipe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ingredients
        }),
      })
      const data = await response.json()
      setRecipe(data.recipe)
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

  useEffect(() => {
    const pingServer = async () => {
      await fetch(`${import.meta.env.VITE_API_URL}/ping`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      setLoadedServer(true)
    }
    pingServer()
  }, [])
  return (
    <main>
      <div className='hero'>
        <h1>Lets get you an exquisit cooking recipe!</h1>

        <ul className='instructions'>
          <li>
            Add ingredients <strong>one by one</strong> to the list.
          </li>
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
            loadedServer={loadedServer}
          />
        )}
      </div>

      {recipe && <ClaudeRecipe recipe={recipe} ref={recipeSection} />}
    </main>
  )
}
