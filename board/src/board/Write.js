import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';

const Write = ({ list, setList, idRef }) => {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({});
    const input = useRef([]);

    console.log(inputs);
    const time = new Date();

    const inputHandler = e => {
        const { name, value } = e.target;
        setInputs(
            {
                id: idRef.current,
                ...inputs,
                [name]: value,
                date: time.toLocaleDateString()
            }
        );
    }

    console.log(input.current.length, input.current[0])
    const onSubmit = e => {
        e.preventDefault();
        for (let i = 0; i < input.current.length; i++) {
            if (inputs.subject.length < 10) {
                alert('제목은 10글자 이상 입력하세요');
                return
            }
        }

        setList([
            ...list,
            inputs
        ]);

        idRef.current = idRef.current + 1;

        navigate('/list')
    }

    return (
        <>
        <div className="background">
            <form onSubmit={onSubmit}>
                <div>
                    <div className="layoutstyles2">
                        <label className="labelStyle" htmlFor="subject">제목</label>
                        <input
                            className="inputStyle"
                            placeholder="여기에 제목을 입력하세요 (10글자 이상)"
                            type="text"
                            id="subject"
                            name="subject"
                            onChange={inputHandler}
                            required
                            ref={el => input.current[0] = el}
                        />
                    </div>
                    <div className="layoutstyles2">
                        <label className="labelStyle"  htmlFor="name">이름</label>
                        <input
                            className="inputStyle"
                            placeholder="작성자 이름을 입력하세요"
                            type="text"
                            id="name"
                            name="name"
                            onChange={inputHandler}
                            required
                            ref={el => input.current[1] = el}
                        />
                    </div>
                    <div className="layoutstyles2">
                        <label className="labelStyle"  htmlFor="content">내용</label>
                        <textarea
                            className="textareaStyle"
                            type="text"
                            id="content"
                            name="content"
                            onChange={inputHandler}
                            required
                            ref={el => input.current[2] = el}
                        />
                    </div>
                </div>
                <div className="btncover">
                   <button className="btn">WRITE</button> 
                </div>
                
            </form>
        </div>
        </>
    )
}

export default Write