"use client"

import { RecoilRoot, atom } from "recoil";

//////// interface ////////
export interface DataType{
  dID: string;
  dSource: string;
  dStatus: string;
  dAlertLevel: string|null;
  dCountry: string;
  dDistrict: string|null;
  dType: string;
  dDate: string;
  dLatitude: number;
  dLongitude: number;
  dTitle: string|null;
  dDescription: string;
  dUrl: string;
}

export interface FilterType{
    selectedCountry: string,
    selectedDisaster: string[],
    selectedYear: number,
    selectedLive: boolean;
}

export interface UserType {
  isLoggedIn: boolean,
  userInfo: {
    name: string,
    email: string,
    provider: string,
    nation1: string,
    nation2: string,
    nation3: string,
    redAlert: boolean,
    orangeAlert: boolean,
    greenAlert: boolean,
  } | null,
}

export interface PostAlerInfo {
  objectId: string;
  alertEmail: string;
  alertDistrictName: string;
  alertCountryName: string;
  alertLatitude: number;
  alertLongitude: number;
  alertRadius: number;
  alertlevelRed: boolean;
  alertlevelOrange: boolean;
  alertlevelGreen: boolean;
  createAt: string;
  memo: string;
  open: boolean;
}


//////// atom ////////
// 국가 데이터 상태 정의
export const dataState = atom<DataType[]>({
  key: 'dataState',
  default: [] as DataType[],
});

// 국가 년도 상태 정의
export const yearState = atom<number>({
  key: 'yearState',
  default: 2023 ,
});

// 필터 상태 정의
export const filterState = atom<FilterType>({
  key: 'filterState',
  default: {
    selectedCountry: "world",
    selectedDisaster: [],
    selectedYear: 2023,
    selectedLive: true,
  }
})

// 로그인 했는지 여부
export const userLoginState = atom<UserType>({
  key: 'userLoginState',
  default: {
    isLoggedIn: false,
    userInfo: null,
  },
});

// 채팅창 상태
export const chatState = atom<boolean>({
  key: 'chatState',
  default: false,
});

// 필터 버튼 상태 정의
export const filterButtonState = atom<{
  top: string; // 또는 필요한 다른 속성들
}>({
  key: 'filterButtonState',
  default: {
    top: 'initial-top-value', // 초기값 설정
  },
});

// 알람 정보 상태 정의<
export const mailAlarmState = atom<PostAlerInfo>({
  key: 'mailAlarmState',
  default: {
    objectId: '',
    alertEmail: '',
    alertDistrictName: '' ,
    alertCountryName: '',
    alertLatitude: 0,
    alertLongitude: 0,
    alertRadius: 100,
    alertlevelRed: false,
    alertlevelOrange: false,
    alertlevelGreen: false,
    createAt: "",
    memo: "",
    open: false,
  },
});

export default function RecoidContextProvider({ children }: { children: React.ReactNode }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}