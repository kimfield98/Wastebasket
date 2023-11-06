import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import List from './board/List';
import Post from './board/Post';
import Detail from './board/Detail';
import Signin from './account/Signin';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<List/>} exact />
          <Route path='/Post' element={<Post/>} exact />
          <Route path='/Detail' element={<Detail/>} exact />
          <Route path='/Signin' element={<Signin/>} exact />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
