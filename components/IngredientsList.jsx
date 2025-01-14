export default function IngredientsList(props) {
  const displayIngredients = props.ingredients.map((ingredient) => {
    return (
      <li key={ingredient}>
        {ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}
      </li>
    )
  })
  return (
    <section className='ingredient-list-container'>
      <h2>Ingredients on hand:</h2>
      <ul className='ingredients-list' aria-live='polite'>
        {displayIngredients}
      </ul>
      {displayIngredients.length > 3 && (
        <>
          <div className='get-recipe-container' ref={props.ref}>
            <div>
              <h3>Ready for a recipe?</h3>
              <p>Generate a recipe according to your ingredients list</p>
            </div>
            <button onClick={props.getRecipe} disabled={props.isLoading}>
              {props.isLoading ? (
                <svg className='loading-svg'>
                  <circle cx={10} cy={10} r={8}></circle>
                </svg>
              ) : (
                'Get Recipe'
              )}
            </button>
          </div>
          {props.errorRecipe && (
            <p className='text-error'>{props.errorRecipe}</p>
          )}
        </>
      )}
    </section>
  )
}
