"use client"

import React, { useState, useEffect } from 'react';
import FilterBar from './Filter';
import { useRecoilState } from 'recoil';
import { chatState, filterButtonState } from '../recoil/dataRecoil';

const FilterBtnComponent = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isButtonOnly, setIsButtonOnly] = useState(true);
    const [isChatOpen, setIsChatOpen] = useRecoilState(chatState);
    const [filterButton, setFilterButton] = useRecoilState(filterButtonState);

    /* 필터 토글을 열면 스크롤 이동 */
    useEffect(() => {
        if (isFilterOpen) {
            const messageList = document.querySelector('.message-list');
            if (messageList) {
                const lastMessage = messageList.querySelector('.rce-container-mbox:last-child');
                if (lastMessage) {
                    lastMessage.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    }, [isFilterOpen]);

    /* 필터창 토글용 함수 */
    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen); // 필터 창을 여는 부분
        setIsButtonOnly(!isButtonOnly); // 필터 창을 열면서 버튼을 없애는 부분
    };

    const FilterToggleButtonStyle: React.CSSProperties = {
        display: isButtonOnly ? 'flex' : 'none',
        position: 'fixed',
        right: '20px',
        bottom: isChatOpen ? '630px' : '100px',
        width: '60px',
        height: '60px',
        border: 'none',
        borderRadius: '30px',
        backgroundColor: '#2f648ded',
        color: '#fff',
        cursor: 'pointer',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '24px',
        boxShadow: '0 2px 5px rgba(255, 255, 255, 0.2)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        zIndex: 500,
    };

    const FilterContainerStyle: React.CSSProperties = {
        display: isFilterOpen ? 'flex' : 'none',
        flexDirection: 'column',
        position: 'fixed',
        justifyContent: 'flex-start',
        top: '70px',
        right: '10px',
        maxWidth: '600px',
        width: '90%',
        borderRadius: '10px',
        padding: '10px',
        zIndex: 300,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
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
                className="Filter-toggle-button"
                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                onClick={toggleFilter}
                style={FilterToggleButtonStyle}
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-funnel-fill" viewBox="0 0 16 16">
                <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5z"/>
            </svg>
            </button>
            <div style={FilterContainerStyle}>
                <div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleFilter();
                        }}
                        style={closeButtonStyle}
                    >
                        ✖
                    </button>
                </div>
                <FilterBar />
            </div>
        </>
    );
};

export default FilterBtnComponent;
