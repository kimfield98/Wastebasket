import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { savePost } from '../redux/boardReducer';
import Header from './Header';
import '../css/App.css';
import '../css/Reset.css';

function Post(){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [content , setContent] = useState('');

    const postSubmit = (e) =>{
        e.preventDefault();
        const postData = {
            id : '',
            title : title,
            content : content,
        }
        if (title.length < 10) {
            alert('제목은 10자 이상 입력하세요');
    return
        }
        dispatch(savePost(postData));
        setTitle('');
        setContent('');
        navigate('/');
    }
    
    const handleTitle =(e) =>{
        setTitle(e.target.value);
    }


    const handleContent =(e) =>{
        setContent(e.target.value);
    }

    return(
        <div style={{ width: "100vw", height: "100vh" }}>
            <Header />
            <div className='background'>
                <h2 className='titlebar'>메시지를 작성해보세요 💝</h2>
                <br />
                <form onSubmit={postSubmit}>
                    <div>
                        <div className="layoutStyles2">
                            <label className="labelStyle" htmlFor="subject">제목</label>
                            <input className='inputStyle'
                                   type='text'
                                   onChange={handleTitle}
                                   value={title}
                                   placeholder="여기에 제목을 입력하세요 (10글자 이상)" />
                        </div>
                        <div className="layoutStyles2">
                            <label className="labelStyle" htmlFor="content">내용</label>
                            <textarea className='textareaStyle'
                                   type='text'
                                   onChange={handleContent}
                                   value={content}
                                   placeholder='상대에게 전하고 싶은 메시지' />
                        </div>
                    </div>
                    <br/>
                    <div className='btncover'>
                        <button className='btn' type='submit'><Link to='/'>되돌아가기</Link></button>
                        <button className='btn' type='submit'>확인</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
 
export default Post;