import styled from "styled-components";
import { useEffect, useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputBox = styled.div`
  display: flex;
`;

const Input = styled.input`
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
`;

const Card = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
  width: 300px;
`;

const Label = styled.label`
  margin: 5px;
`;
const Button = styled.button`
  border: none;
  border-radius: 5px;
  background-color: skyblue;
  color: white;
  padding: 5px;
  margin: 5px;
`;

function App() {
  const [id, setId] = useState(1);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [doneList, setDoneList] = useState([]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }

  const handleContentChange = (e) => {
    setContent(e.target.value);
  }

  const handleAddButtonClick = (e) => {
    setId(id + 1);
    const newTodo = {
      id,
      title,
      content,
    }
    console.log(newTodo);
    setTodoList([...todoList, newTodo])
    setTitle("");
    setContent("");
  }

  const handleDoneButtonClick = (id) => {
    console.log("이거봐바",id);
    const doneTodo = todoList.find(todo => todo.id === id);
    setDoneList([...doneList, doneTodo]);
    setTodoList(todoList.filter(todo => todo.id !== id));
  }

  return (
    <Container>
      <h1>TodoList 만들기</h1>
      <InputBox>
        <div>
          <Label>제목</Label>
          <Input type="text" value={title} onChange={handleTitleChange}/>
        </div>
        <div>
          <Label>내용</Label>
          <Input type="text" value={content} onChange={handleContentChange} />
        </div>
        <Button onClick={handleAddButtonClick}>추가</Button>
      </InputBox>
      <div>
        <h1>todo</h1>
        {todoList.map(todo => (
          <Card key={todo.id}>
            <div>{todo.title}</div>
            <div>{todo.content}</div>
            <Button onClick={() => handleDoneButtonClick(todo.id)}
              >완료</Button>
            <Button>취소</Button>
          </Card>
        ))}
      </div>
      <div>
        <h1>done</h1>
        {doneList.map(todo => (
          <Card key={todo.id}>
            <div>{todo.title}</div>
            <div>{todo.content}</div>
            <Button>삭제</Button>
            <Button>취소</Button>
          </Card>
        ))}
      </div>
    </Container>
  );
}

export default App;