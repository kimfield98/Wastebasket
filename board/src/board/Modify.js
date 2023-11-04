import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Modify = ({ list, setList }) => {
    const { id } = useParams();
    const itm = list.find(it => String(it.id) === id);

    const [inputs, setInputs] = useState({
        name: itm.name,
        subject: itm.subject,
        content: itm.content
    })

    const navigate = useNavigate();

    const onModify = () => {
        if (inputs.subject.length < 5) {
            alert('제목은 10글자 이상 입력하세요');
            return
        }
        const r = list.map(it => String(it.id) === id ? {
            ...itm,
            name: inputs.name,
            subject: inputs.subject,
            content: inputs.content
        } : it);
        setList(r);
        navigate(`/view/${id}`);
    }

    const onChange = e => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    return (
        <>
            <div className="background">
                <div className="layoutstyles2">
                    <div className="labelStyle">제목</div>
                    <input className="inputStyle" name="subject" value={inputs.subject} onChange={onChange} />
                </div>
                <div className="layoutstyles2">
                    <div className="labelStyle">이름</div>
                    <input className="inputStyle"  name="name" value={inputs.name} onChange={onChange} />
                </div>
                <div className="layoutstyles2">
                    <div className="labelStyle">내용</div>
                    <textarea className="textareaStyle"  name="content" value={inputs.content} onChange={onChange} />
                </div>
                <div className="btncover">
                    <button className="btn" onClick={onModify}>MODIFY</button>
                </div>
            </div>
        </>
    )
}

export default Modify;