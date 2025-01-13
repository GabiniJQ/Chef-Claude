export default function IngredientsList(props) {
  const displayIngredients = props.ingredients.map((ingredient) => {
    return <li key={ingredient}>{ingredient}</li>
  })
  return (
    <section className='ingredient-list-container'>
      <h2>Ingredients on hand:</h2>
      <ul className='ingredients-list' aria-live='polite'>
        {displayIngredients}
      </ul>
      {displayIngredients.length > 3 && (
        <div className='get-recipe-container'>
          <div>
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe according to your ingredients list</p>
          </div>
          <button onClick={props.getRecipe}>Get recipe</button>
        </div>
      )}
    </section>
  )
}
