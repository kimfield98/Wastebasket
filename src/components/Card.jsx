import styled from "styled-components";

const StCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  border: 1px solid #000;
  padding: 10px;
`;

function Card({handleDeleteButton,handleDoneButton,handleCancelButton,todo,isDone}) {
  return (
    <StCard key={todo.id}>
      <div>{todo.title}</div>
      <div>{todo.content}</div>
      {isDone ? (
        <div>
          <button onClick={() => handleDeleteButton(todo.id, todo.isDone)}>Delete</button>
          <button onClick={() => handleCancelButton(todo.id)}>Cancel</button>
        </div>
      ) : (
        <div>
          <button onClick={() => handleDeleteButton(todo.id, todo.isDone)}>Delete</button>
          <button onClick={() => handleDoneButton(todo.id)}>Done</button>
        </div>
      )}
    </StCard>

  )
}

export default Card;