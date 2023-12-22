"use client"

import { RecoilRoot, atom } from "recoil";

export const activeTabState = atom({
  key: 'activeTabState',
  default: 'none',
});

export const activeMenuState = atom({
  key: 'activeMenuState',
  default: false,
});

export default function RecoidContextProvider({
    children
  }: {
    children: React.ReactNode
  }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}