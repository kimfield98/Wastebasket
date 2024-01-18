import { styled } from "styled-components"
import { ITweet } from "./timeline"
import { auth, db } from "../firebase"
import { deleteDoc, doc } from "firebase/firestore"

const Wrapper = styled.div`
  margin-right: 10px;
  padding: 20px;
  border-radius: 15px;
  background-color: #eaeef2;
`

const Column = styled.div`
  &:last-child {
    place-self: end;
  }
`

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 16px;
`

const DeleteButton = styled.button`
  background-color: #f14f62;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`

const FlexBetweenBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const DateText = styled.span`
  display: block;
  color: #555;
  font-size: 12px;
  margin-top: 8px;
`

export default function Tweet({ username, tweet, userId, id, createdAt }: ITweet) {
  const user = auth.currentUser
  const onDelete = async () => {
    const ok = confirm("이 게시글을 삭제하시겠습니까?")
    if (!ok || user?.uid !== userId) return
    try {
      await deleteDoc(doc(db, "tweets", id))
    } catch (e) {
      console.log(e)
    }
  }

  // JavaScript의 내장 국제화 API인 Intl을 사용하여 날짜와 시간 포맷
  const dateTimeFormat = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Seoul'
  })

  const formattedDate = dateTimeFormat.format(new Date(createdAt))
  return (
    <Wrapper>
      <Column>
        <FlexBetweenBox>
          <Username>{username}</Username>
          {user?.uid === userId
            ? (<DeleteButton onClick={onDelete}>Delete</DeleteButton>)
            : null
          }
        </FlexBetweenBox>
      <Payload>{tweet}</Payload>
      <DateText>{formattedDate}</DateText>
      </Column>
    </Wrapper>
  )
}