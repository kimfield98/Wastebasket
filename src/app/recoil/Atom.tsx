"use client"

import { RecoilRoot, atom } from "recoil";

const ResumeState = atom<boolean>({
  key: 'textState',
  default: false,
});

const ProjectState = atom<boolean>({
  key: 'projectState',
  default: false,
});

const ContactState = atom<boolean>({
  key: 'contactState',
  default: false,
});

export default function RecoidContextProvider({
    children
  }: {
    children: React.ReactNode
  }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}