// 클라이언트 측에서만 렌더링 되기를 바랄 때 붙이는 'use client'
'use client'
import Script from "next/script";
import { useEffect, useRef, useState } from "react";

// window 객체에 naver 속성을 추가하기 위한 타입 정의
declare global {
  interface Window {
    naver: any;
  }
}

export default function Home() {
  // 지도 DOM 요소를 참조하기 위한 ref
  const mapElement = useRef(null);

  // 네이버 맵의 초기 위치
  const latitude = 37.5665;  // 예시: 서울시청 위도
  const longitude = 126.9780; // 예시: 서울시청 경도

  // 네이버 맵스 스크립트가 로드되었는지 여부를 추적하기 위한 상태
  const [naverMapsLoaded, setNaverMapsLoaded] = useState(false);
  
  // 네이버 맵스 스크립트 로드 여부를 체크하는 useEffect
  useEffect(() => {
    const intervalId = setInterval(() => {
      // window 객체에 naver와 naver.maps가 존재하는지 확인
      if (window.naver && window.naver.maps) {
        // 스크립트가 로드되었다면 상태를 업데이트하고 인터벌 정리
        setNaverMapsLoaded(true);
        clearInterval(intervalId); // 인터벌을 정리하여 체크 중지
      }
    }, 100); // 100ms마다 체크

    // 컴포넌트가 unmount되었을 때 인터벌 정리
    return () => clearInterval(intervalId);
  }, []); // 의존성 배열이 빈 배열이므로 컴포넌트가 처음 렌더링될 때만 실행

  // naverMapsLoaded가 true가 되면 지도를 그리기 위한 useEffect
  useEffect(() => {
    if (mapElement.current && naverMapsLoaded) {
      const { naver } = window; // window 객체에서 naver를 가져옴
      const location = new naver.maps.LatLng(latitude, longitude); // 네이버 지도에서 사용하는 LatLng 객체 생성
      const mapOptions = {
        center: location, // 지도의 중심을 설정
        zoom: 16, // 줌 레벨 설정
        zoomControl: false, // 줌 컨트롤 비활성화
      };
      const map = new naver.maps.Map(mapElement.current, mapOptions); // 지도 생성
      new naver.maps.Marker({
        position: location, // 마커 위치 설정
        map: map, // 마커를 추가할 지도
      });
    }
  }, [naverMapsLoaded]); // naverMapsLoaded 값이 변경될 때마다 이 효과가 다시 실행

  return (
    <>
      <Script
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
        strategy="beforeInteractive" // 스크립트를 페이지가 인터랙티브 되기 전에 로드
        onLoad={() => {
          if (window.naver && window.naver.maps) {
            setNaverMapsLoaded(true); // 스크립트가 로드된 후 상태 업데이트
          }
        }}
      />
      <div id="mapContainer" ref={mapElement}></div>
    </>
  );
}
