export default function IngredientsList(props) {
  const displayIngredients = props.ingredients.map((ingredient) => {
    return <li key={ingredient}>{ingredient}</li>
  })
  return (
    <section className='ingredient-list-container'>
      <h2>Ingredientes a la mano:</h2>
      <ul className='ingredients-list' aria-live='polite'>
        {displayIngredients}
      </ul>
      {displayIngredients.length > 3 && (
        <div className='get-recipe-container'>
          <div>
            <h3>¿Listo para una receta?</h3>
            <p>Genera una receta de acuerdo a tu lista de ingredientes.</p>
          </div>
          <button onClick={props.getRecipe}>Buscar receta</button>
        </div>
      )}
    </section>
  )
}
