'use client'
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { useGeoLocation } from "./hooks/useGeoLocation";

declare global {
  interface Window {
    naver: any;
  }
}

// 객체는 사용자의 위치를 가져오는 데 사용되는 옵션 설정
const geolocationOptions = {
  enableHighAccuracy: true, // 위치를 가능한 높은 정확도로 가져올지 여부
  timeout: 1000 * 10, // 위치를 가져오기 위한 최대 시간(밀리초)을 설정
  maximumAge: 1000 * 3600 * 24, // 이전에 가져온 위치 정보가 유효한 시간(밀리초)을 설정
}

export default function Home() {
  const mapElement = useRef(null);
  const { location, error } = useGeoLocation(geolocationOptions)
  const [currentLocation, setCurrentLocation] = useState({latitude: 37.5665, longitude: 126.9780}) // 예시: 서울시청 위도, 경도
  const [naverMapsLoaded, setNaverMapsLoaded] = useState(false);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (window.naver && window.naver.maps) {
        setNaverMapsLoaded(true);
        clearInterval(intervalId);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  // naverMapsLoaded가 true이고,
  // 사용자 위치가 변경되었을 때 지도를 업데이트하는 useEffect
  useEffect(() => {
    if (location && naverMapsLoaded && mapElement.current) {
      const { naver } = window;
      const locationCoords = new naver.maps.LatLng(location.latitude, location.longitude); // 네이버 지도에서 사용하는 LatLng 객체 생성
      const mapOptions = {
        center: locationCoords,
        zoom: 16,
        zoomControl: false,
      };
      const map = new naver.maps.Map(mapElement.current, mapOptions);
      new naver.maps.Marker({
        position: locationCoords, // 마커 위치 설정
        map: map, // 마커를 추가할 지도
      });
      setCurrentLocation(location); // 현재 위치 상태를 업데이트
    }
  }, [location, naverMapsLoaded]); // location과 naverMapsLoaded 값이 변경될 때마다 이 효과가 다시 실행

  return (
    <>
      <Script
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
        strategy="beforeInteractive"
        onLoad={() => {
          if (window.naver && window.naver.maps) {
            setNaverMapsLoaded(true);
          }
        }}
      />
      <div id="mapContainer" ref={mapElement}></div>
      {error && <p>Error: {error}</p>}
    </>
  );
}
