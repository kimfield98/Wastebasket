import { useRef, useState } from "react"
import { Route, Routes } from "react-router-dom";
import List from "./board/List";
import Modify from "./board/Modify";
import View from "./board/View";
import Write from "./board/Write";
import Layout from "./Layout";
import './reset.css';
import Signin from "./board/Signin";
import Signup from "./board/Signup";

const App = () => {

    const [list, setList] = useState([
        { id: 1, name: "김초원", subject: "첫 번째 게시물", content: "첫 번째 게시물입니다.", date: "2023.11.04" },
        { id: 2, name: "관리자", subject: "두 번째 게시물", content: "두 번째 게시물입니다.", date: "2023.11.05" },
    ]);

    const idRef = useRef(3);
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="list" element={<List list={list} />} />
                <Route path="signin" element={<Signin list={list} />} />
                <Route path="signup" element={<Signup list={list} />} />
                <Route path="view/:id" element={<View list={list} setList={setList} />} />
                <Route path="modify/:id" element={<Modify list={list} setList={setList} />} />
                <Route path="write" element={<Write list={list} setList={setList} idRef={idRef} />} />
            </Route>
        </Routes>
    )
}

export default App