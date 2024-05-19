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
  return (
    <div>
      <div>My Todo List</div>
      <InputBox>
        <label>Title</label>
        <input type="text" />
        <label>Content</label>
        <input type="text" />
        <button>Add</button>
      </InputBox>
      <ContentBox>
        <div>Working.. 🔥</div>
        <Card>
          <div>Learn React</div>
          <div>Let's learn React basics!</div>
          <div>
            <button>Delete</button>
            <button>Done</button>
          </div>
        </Card>
      </ContentBox>
      <ContentBox>
        <div>Done..! 🎉</div>
        <Card>
          <div>Learn React</div>
          <div>Let's learn React basics!</div>
          <div>
            <button>Delete</button>
            <button>Cancel</button>
          </div>
        </Card>
      </ContentBox>
    </div>
  );
}

export default App;
