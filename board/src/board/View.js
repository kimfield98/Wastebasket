import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../App.css';

const View = ({ list, setList }) => {
  const { id } = useParams();
  const itm = list.find((it) => String(it.id) === id);
  const navigate = useNavigate();

  const onModify = () => {
    navigate(`/modify/${id}`);
  };

  const onDelete = () => {
    const updatedList = list.filter((it) => String(it.id) !== id);
    setList(updatedList);
    navigate('/list');
  };

  return (
    <div className="background">
      <form>
        <div>
          <div className="layoutstyles2">
            <span className="labelStyle">제목</span>
            <input
              className="inputStyle"
              type="text"
              id="subject"
              name="subject"
              value={itm.subject}
              readOnly
            />
          </div>
          <div className="layoutstyles2">
            <span className="labelStyle">이름</span>
            <input
              className="inputStyle"
              type="text"
              id="name"
              name="name"
              value={itm.name}
              readOnly
            />
          </div>
          <div className="layoutstyles2">
            <span className="labelStyle">날짜</span>
            <input
              className="inputStyle"
              type="text"
              id="date"
              name="date"
              value={itm.date}
              readOnly
            />
          </div>
          <div className="layoutstyles2">
            <span className="labelStyle">내용</span>
            <textarea
              className="textareaStyle"
              id="content"
              name="content"
              value={itm.content}
              readOnly
            />
          </div>
        </div>
        <div className="btncover">
          <button className="btn" onClick={onDelete}>DELETE</button>
          <button className="btn" onClick={onModify}>MODIFY</button>
        </div>
      </form>
    </div>
  );
};

export default View;
