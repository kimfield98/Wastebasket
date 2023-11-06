import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
                <form onSubmit={postSubmit}>
                    <div>
                        <div className="layoutstyles2">
                            <label className="labelStyle" htmlFor="subject">제목</label>
                            <input className='inputStyle'
                                   type='text'
                                   onChange={handleTitle}
                                   value={title}
                                   placeholder="여기에 제목을 입력하세요 (10글자 이상)" />
                        </div>
                        <div className="layoutstyles2">
                        <label className="labelStyle" htmlFor="content">내용</label>
                            <input className='textareaStyle'
                                   type='text'
                                   onChange={handleContent}
                                   value={content}
                                   placeholder='내 용' />
                        </div>
                    </div>
                    <br/>
                    <div className='btncover'>
                        <button className='btn' type='submit'>확인</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
 
export default Post;