import Markdown from 'react-markdown'

export default function ClaudeRecipe(props) {
  return (
    <section className='suggested-recipe-container' ref={props.ref}>
      <h2>Chef Claude recommends:</h2>
      <Markdown>{props.recipe}</Markdown>
    </section>
  )
}
