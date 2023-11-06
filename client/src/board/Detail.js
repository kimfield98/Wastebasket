import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editPost, removePost } from '../redux/boardReducer';
import Header from './Header';
import '../css/App.css';
import '../css/Reset.css';


function Detail(){
    const dispatch = useDispatch();
    const nevigate = useNavigate();

    const {selectPostData} = useSelector(state => state.boardReducer);
    const [title, setTitle] = useState(selectPostData.title);
    const [content, setContent] =useState(selectPostData.content);

    const handleTitle = (e) =>{
        setTitle(e.target.value);
    }

    const handleContent = (e) =>{
        setContent(e.target.value);
    }

    const onChange=()=>{
        const postData = {
            id : selectPostData.id,
            title : title,
            content : content,
        }
        dispatch(editPost(postData));
        setTitle('');
        setContent('');
        nevigate('/');
    }
    
    const onRemove = () =>{
        dispatch(removePost(selectPostData.id));
        setTitle('');
        setContent('');
        nevigate('/');
    }
    return(
        <div style={{ width: "100vw", height: "100vh" }}>
            <Header />
            <div className='background'>
                <div>
                    <div>
                        <div className="layoutstyles2">
                            <label className="labelStyle">제목</label>
                            <input className='inputStyle' type='text' onChange={handleTitle} value={title} />
                        </div>
                    </div>
                    <div>
                        <div className="layoutstyles2">
                            <div className="labelStyle">내용</div>
                            <textarea className='textareaStyle' onChange={handleContent} value={content} />
                        </div>
                        <div>
                            <div className='btncover' >
                                <button className='btn' onClick={onChange}>수정</button>
                                <button className='btn' onClick={onRemove}>삭제</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
 
export default Detail;