const Anecdote = ({ anecdote }) => {
  const padding = {
    paddingBottom: 10
  }
  return(
    <div>
      <h3>{anecdote.content}</h3>
      <div style={padding}>has {anecdote.votes} votes</div>
      <div style={padding}>For more info see <a href={anecdote.info}>{anecdote.info}</a></div>
    </div>
  )
}

export default Anecdote