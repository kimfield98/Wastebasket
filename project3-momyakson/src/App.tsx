import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./components/layout"
import Home from "./routes/home"
import Profile from "./routes/profile"
import Login from "./routes/login"
import CreateAccount from "./routes/create-account"
import { createGlobalStyle } from "styled-components"
import reset from "styled-reset"
import { useEffect, useState } from "react"
import LoadingScreen from "./components/loading-screen"
import { auth } from "./firebase"
import { styled } from "styled-components"
import ProtectedRoute from "./components/potected-route"

const router = createBrowserRouter([
  {
    path:"/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      }
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
  }
])

const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  body {
    background-color: #1d1d1f;
    color: #24292F;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: 30px 0 0;
  width: 390px;
  height: 844px;
  background-color: #f5f7f9;
  overflow-y: hidden;
`;

function App() {
  const [isLoading, setLoging] = useState(true)
  const init = async() => {
    // wait for firebase
    await auth.authStateReady()
    // setTimeout(() => setLoging(false),2000) // Test code
    setLoging(false)
  }
  useEffect(() => {
    init()
  }, [])
  return (
    <Wrapper>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </Wrapper>
  )
}

export default App
