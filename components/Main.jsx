import React from 'react'
import ClaudeRecipe from './ClaudeRecipe'
import IngredientsList from './IngredientsList'

export default function Main() {
  const [ingredients, setIngredients] = React.useState([
    'pasta',
    'tomato',
    'chicken',
    'oregano',
  ])

  function addIngredient(formData) {
    const newIngredient = formData.get('ingredient')
    setIngredients((prevIngredient) => [
      ...prevIngredient,
      newIngredient,
    ])
  }

  const [recipeShown, setRecipeShown] = React.useState(false)

  function toggleRecipeShown() {
    setRecipeShown((prevRecipeShown) => !prevRecipeShown)
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
        <IngredientsList
          ingredients={ingredients}
          toggleRecipeShown={toggleRecipeShown}
        />
      )}
      {recipeShown && <ClaudeRecipe />}
    </main>
  )
}
