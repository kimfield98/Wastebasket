import { useState } from "react";
import styled from "styled-components";

const InputBox = styled.div`
  display: flex;
  border: 1px solid #000;
  padding: 10px;
  margin-bottom: 10px;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #000;
  padding: 10px;
  margin-bottom: 10px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  border: 1px solid #000;
  padding: 10px;
`;

function App() {
  const [id, setId] = useState(0)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [todoList, setTodoList] = useState([])
  const [doneList, setDoneList] = useState([])

  function handleTitleChange(e) {
    setTitle(e.target.value)
  }

  function handleContentChange(e) {
    setContent(e.target.value)
  }

  function handleAddButton() {
    const newTodo = {
      id,
      title,
      content,
      isDone: false
    }
    setTodoList([...todoList, newTodo])
    setId(id + 1)
    setTitle("")
    setContent("")
  }

  function handleDeleteButton(id, isDone) {
    if(isDone) {
      setDoneList(doneList.filter((todo) => todo.id !== id))
    } else {
      setTodoList(todoList.filter((todo) => todo.id !== id))
    }
  }

  function handleDoneButton(id) {
    const doneTodo = todoList.find((todo)=>todo.id === id)
    if(doneTodo) {
      setTodoList(todoList.filter((todo) => todo.id !== id))
      setDoneList([...doneList, {...doneTodo, isDone: true}])
    }
  }

  function handleCancelButton(id) {
    const cancelTodo = doneList.find((todo)=>todo.id === id)
    if(cancelTodo) {
      setDoneList(doneList.filter((todo) => todo.id !== id));
      setTodoList([...todoList, {...cancelTodo, isDone:false}])
    }
  }
  
  return (
    <div>
      <div>My Todo List</div>
      <InputBox>
        <label>Title</label>
        <input type="text" value={title} onChange={handleTitleChange} />
        <label>Content</label>
        <input type="text" value={content} onChange={handleContentChange} />
        <button onClick={handleAddButton}>Add</button>
      </InputBox>
      <ContentBox>
        <div>Working.. 🔥</div>
        {todoList.map((todo)=>
          <Card key={todo.id}>
            <div>{todo.title}</div>
            <div>{todo.content}</div>
            <div>
              <button onClick={() => handleDeleteButton(todo.id, false)}>Delete</button>
              <button onClick={() => handleDoneButton(todo.id)}>Done</button>
            </div>
          </Card>
        )}
      </ContentBox>
      <ContentBox>
        <div>Done..! 🎉</div>
        {doneList.map((todo)=>
          <Card key={todo.id}>
            <div>{todo.title}</div>
            <div>{todo.content}</div>
            <div>
              <button onClick={() => handleDeleteButton(todo.id, true)}>Delete</button>
              <button onClick={() => handleCancelButton(todo.id)}>Cancel</button>
            </div>
          </Card>
        )}
      </ContentBox>
    </div>
  );
}

export default App;
