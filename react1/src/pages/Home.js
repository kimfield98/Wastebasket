import { useState } from "react";
import styled from "styled-components";
import Card from "../components/Card"

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

function Home() {
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
          <Card
            key={todo.id}
            handleDeleteButton={handleDeleteButton}
            handleDoneButton={handleDoneButton}
            handleCancelButton={handleCancelButton}
            todo={todo}
            isDone={false}
          />
        )}
      </ContentBox>
      <ContentBox>
        <div>Done..! 🎉</div>
        {doneList.map((todo)=>
          <Card
            key={todo.id}
            handleDeleteButton={handleDeleteButton}
            handleDoneButton={handleDoneButton}
            handleCancelButton={handleCancelButton}
            todo={todo}
            isDone={true}
          />
        )}
      </ContentBox>
    </div>
  );
}

export default Home;
