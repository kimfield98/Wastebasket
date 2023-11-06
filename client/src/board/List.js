import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { detailPost } from '../redux/boardReducer';
import Header from './Header';
import '../css/App.css';
import '../css/Reset.css';
 
function List(){
    const navigate = useNavigate();
    const { postData }= useSelector(state => state.boardReducer);
    const { lastId } = useSelector(state =>state.boardReducer);

    const dispatch = useDispatch();
    const selectPost = (id) => {
        dispatch(detailPost(id));
    }

    return(
        <div style={{ width: "100vw", height: "100vh" }}>
            <Header />
            <div className='background'>
                <h2 className='titlebar'>메시지를 작성해보세요 💝</h2>
                <br />
                <div>
                {lastId !== 0 ?
                    // 게시글 있는 경우
                    postData.map(item => (
                        item.id !== '' &&
                        <div key={item.id}> 
                            <div className='content' onClick={()=> selectPost(item.id)}><Link to='/Detail'>{item.title}</Link></div>
                        </div>
                    )) :
                    // 게시글 없는 경우
                    <div>
                        <div colSpan={2}>작성된 글이 없습니다.</div>
                    </div>
                }
                </div>
                <div className='btncover'>
                    <button className='btn' onClick={()=>navigate('/Post')}>글 작성</button>
                </div>
            </div>
        </div>
    )
}
export default List;