import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FirebaseError } from "firebase/app"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"
import { Wrapper, Title, Form, Input, Switcher, Error } from "../components/auth-components"

export default function Login() {
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target: {name,value} } = e
    if(name === "email") {
      setEmail(value)
    } else if(name === "password") {
      setPassword(value)
    }
  }
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    if(isLoading || email === "" || password === "") return
    try {
      setLoading(true)
      await signInWithEmailAndPassword(auth, email, password)
      // redirect to the home page
      navigate("/")
    } catch (e) {
      // setError
      if(e instanceof FirebaseError) {
        setError(e.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Wrapper>
      <Title>엄마손은약손<span></span></Title>
      <Form onSubmit={onSubmit}>
        <Input onChange={onChange} name="email" value={email} placeholder="이메일을 입력하세요" type="email" required />
        <Input onChange={onChange} name="password" value={password} placeholder="비밀번호를 입력하세요" type="password" required />
        <Input type="submit" value={isLoading ? "Loading..." : "로그인"}/>
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        아직 계정이 없으신가요?{" "}
        <Link to="/create-account">회원 가입</Link>
      </Switcher>
    </Wrapper>
  )
}