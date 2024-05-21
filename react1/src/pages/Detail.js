import styled from "styled-components"
import { useNavigate, useParams } from "react-router-dom"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 800px;
  padding: 10px;
  margin: 0 auto;
  border: 1px solid #000;
`

const Header = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px;
`

function Detail() {
  const param = useParams()
  const navigate = useNavigate()
  function handleBackButton() {
    navigate(-1)
  }
  return (
    <Container>
      <Header>
        <div>id: {param.id}</div>
        <button onClick={handleBackButton}>이전으로</button>
      </Header>
      <div>제목</div>
      <div>내용</div>
    </Container>
    

  )
}

export default Detail