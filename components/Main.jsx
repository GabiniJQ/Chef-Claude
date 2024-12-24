import React from 'react'

export default function Main() {
  const [ingredients, setIngredients] = React.useState([])

  function addIngredient(formData) {
    const newIngredient = formData.get('ingredient')
    setIngredients((prevIngredient) => [
      ...prevIngredient,
      newIngredient,
    ])
  }

  const displayIngredients = ingredients.map((ingredient) => {
    return <li key={ingredient}>{ingredient}</li>
  })

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
        <button>Add ingredient</button>
      </form>
      <ul>{displayIngredients}</ul>
    </main>
  )
}
