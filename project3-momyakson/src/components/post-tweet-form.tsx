import { addDoc, collection } from "firebase/firestore"
import { useState } from "react"
import { styled } from "styled-components"
import { auth, db } from "../firebase"

const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 10px;
  font-size: 24px;
  font-weight: 600;
  color: #3fb5eb;
  span {
    display: inline-block;
    margin-left: 5px;
    width: 30px;
    height: 30px;
    background-image: url("/logo.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const TextArea = styled.textarea`
  border: 2px solid #8acaef;
  padding: 20px;
  border-radius: 12px;
  font-size: 16px;
  color: #24292F;
  background-color: #ffffff;
  width: 100%;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border-color: #3fb5eb;
  }
`

const SubmitBtn = styled.input`
  background-color: #8acaef;
  color: #ffffff;
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #3fb5eb;
  }
`

export default function PostTweetForm() {
  const [isLoading, setLoading] = useState(false)
  const [tweet, setTweet] = useState("")
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value)
  }
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const user = auth.currentUser
    if (!user || isLoading || tweet === "" || tweet.length > 180) return
    try {
      setLoading(true)
      await addDoc(collection(db, "tweets"), {
        tweet,
        createdAt: Date.now(),
        username: user.displayName || "Anonymous",
        userId: user.uid,
      })
      setTweet("")
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Form onSubmit={onSubmit}>
      <Title>엄마손은약손<span></span></Title>
      <TextArea
        required
        rows={5}
        maxLength={180}
        onChange={onChange}
        value={tweet}
        placeholder="우리 동네 병원/약국 정보 공유하기"
      />
      <SubmitBtn
        type="submit"
        value={isLoading ? "글 보내는 중..." : "글 보내기"}
      />
    </Form>
  )
}