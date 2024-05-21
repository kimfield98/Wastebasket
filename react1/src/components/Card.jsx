import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const StCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  border: 1px solid #000;
  padding: 10px;
`;

function Card({handleDeleteButton,handleDoneButton,handleCancelButton,todo,isDone}) {
  const navigate = useNavigate()
  return (
    <StCard key={todo.id}>
      <button onClick={() => {
        navigate(`/detail/${todo.id}`)
      }}>more...</button>
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