import { useState } from "react"
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom"
import { FirebaseError } from "firebase/app"

export default function Home() {
  const navigate = useNavigate()
  const [error, setError] = useState("")
  
  const logOut = () => {
    try {
      auth.signOut()
      navigate("/login")
    } catch (e) {
      if(e instanceof FirebaseError) {
        setError(e.message)
        console.log(error)
      }
    }
  }

  return (
    <h1>
      <button onClick={logOut}>Log Out</button>
      </h1>
  )
}