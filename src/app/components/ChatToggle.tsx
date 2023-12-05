"use client"

import React, { useState, useEffect } from 'react';
import ChatModule from './ChatModule';
import FilterBar from './Filter';
import { useRecoilState } from 'recoil';
import { chatState, filterButtonState } from '../recoil/dataRecoil';


const ChatToggleComponent = () => {
    const [isChatOpen, setIsChatOpen] = useRecoilState(chatState);
    const [filterButton, setFilterButton] = useRecoilState(filterButtonState);
    const [isButtonOnly, setIsButtonOnly] = useState(true);

    /* 채팅 토글을 열면 스크롤 이동 */
    useEffect(() => {
        if (isChatOpen) {
            const messageList = document.querySelector('.message-list');
            if (messageList) {
                const lastMessage = messageList.querySelector('.rce-container-mbox:last-child');
                if (lastMessage) {
                    lastMessage.scrollIntoView({ behavior: 'smooth' });
                }
            }
            // 채팅 창이 열리면 필터 버튼을 위로 이동
            if (filterButton.top !== '700px') {
                setFilterButton({ ...filterButton, top: '700px' });
            }
        } else {
            // 채팅 창이 닫히면 필터 버튼을 원래 위치로 복귀
            if (filterButton.top !== 'initial-top-value') {
            setFilterButton({ ...filterButton, top: 'initial-top-value' });
            }
        }
    }, [isChatOpen, setFilterButton]);

    /* 채팅창 토글용 함수 */
    const toggleChat = () => {
        setIsChatOpen(!isChatOpen); // 채팅 창을 여는 부분
        setIsButtonOnly(!isButtonOnly); // 채팅 창을 열면서 버튼을 없애는 부분
    };

    /* 상단 메뉴바 클릭용 함수 */
    const handleTopBarClick = (e: any) => {
        // Prevents the click from reaching the top bar if it's the button that's clicked
        e.stopPropagation();
        toggleChat();
    };

    const chatToggleButtonStyle: React.CSSProperties = {
        display: isButtonOnly ? 'flex' : 'none',
        position: 'fixed',
        right: '20px',
        bottom: '20px',
        width: '60px',
        height: '60px',
        border: 'none',
        borderRadius: '30px', // Adjusted for a circular appearance
        backgroundColor: '#2f648ded', // Subdued color for dark theme
        color: '#fff',
        cursor: 'pointer',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '24px',
        boxShadow: '0 2px 5px rgba(255, 255, 255, 0.2)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        zIndex: 500,
    };

    const chatModuleContainerStyle: React.CSSProperties = {
        display: isChatOpen ? 'flex' : 'none',
        flexDirection: 'column',
        position: 'fixed',
        justifyContent: 'flex-start',
        bottom: '0',
        right: '10px',
        maxWidth: '400px',
        width: '90%',
        maxHeight: '600px',
        height: '80vh',
        borderRadius: '10px',
        padding: '0',
        zIndex: 200,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
    };

    const topChatBarStyle: React.CSSProperties = {
        width: '100%',
        padding: '10px 15px',
        backgroundColor: '#2f648ded',
        color: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
    };

    const closeButtonStyle: React.CSSProperties = {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '20px',
    };

    return (
        <>
            <button
                className="chat-toggle-button"
                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                onClick={toggleChat}
                style={chatToggleButtonStyle}
            >
                💬
            </button>
            <div style={chatModuleContainerStyle}>
                <div style={topChatBarStyle} onClick={handleTopBarClick}>
                    WorlDisaster Global Chat
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // Prevents click from bubbling up to the top bar
                            toggleChat();
                        }}
                        style={closeButtonStyle}
                    >
                        ✖
                    </button>
                </div>
                <ChatModule />
            </div>
        </>
    );
};

export default ChatToggleComponent;

//     /* 페이지 첫 로딩시 뜨는 챗 오픈 버튼 */
//     const chatToggleButtonInit: React.CSSProperties = {
//         display: isButtonOnly ? 'flex' : 'none',
//         position: 'fixed',
//         right: '20px',
//         bottom: '20px',
//         width: '50px',
//         height: '50px',
//         border: 'none',
//         borderRadius: '50%',
//         backgroundColor: '#4A7748',
//         color: 'white',
//         cursor: 'pointer',
//         transition: 'background-color 0.3s',
//         zIndex: 100, // 맨 뒤에 있어야 함
//         alignItems: 'center',
//         justifyContent: 'center',
//         fontSize: '20px',
//     };

//     /* 토글이 열린 뒤 컨테이너 안에 보이는 닫기 버튼 */
//     const chatToggleButtonClose: React.CSSProperties = {
//         position: 'absolute',
//         top: '20px',
//         right: '20px',
//         padding: '0',
//         width: '30px',
//         height: '30px',
//         backgroundColor: '#e57373',
//         color: 'white',
//         fontSize: '12px',
//         lineHeight: '30px',
//         textAlign: 'center',
//         border: 'none',
//         borderRadius: '15px',
//         cursor: 'pointer',
//         transition: 'background-color 0.3s',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         zIndex: 300,
//     };

//     /* 토글되는 채팅 컨테이너용 CSS */
//     const chatContainerStyle: React.CSSProperties = {
//         display: isChatOpen ? 'flex' : 'none',
//         flexDirection: 'column',
//         justifyContent: 'space-between',
//         position: 'fixed', // 우측 하단에 고정
//         bottom: '0',
//         right: '10px',
//         maxWidth: '400px',
//         width: '100%',
//         maxHeight: '500px',
//         height: '100%',
//         padding: '10px',
//         zIndex: 200,
//     };

//     return (
//         <div>
//             <button className="chat-toggle-button-init" onClick={toggleChat} style={chatToggleButtonInit}>
//                 💬
//             </button>
//             <div className={`chat-container ${isChatOpen ? 'open' : ''}`} style={chatContainerStyle}>
//                 <button className={`chat-toggle-button-close ${isButtonOnly ? 'open' : ''}`} onClick={toggleChat} style={chatToggleButtonClose}>
//                     ❌
//                 </button>
//                 <ChatModule />
//             </div>

//         </div>
//     );
// };

// export default ChatToggleComponent;

