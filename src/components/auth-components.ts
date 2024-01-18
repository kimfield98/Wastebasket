import { styled } from "styled-components"

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 30px;
  width: 100%;
  height: 100%;
`

export const Form = styled.form`
  margin-top: 50px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`

export const Title = styled.h1`
  font-size: 42px;
`

export const Input = styled.input`
  padding: 10px 20px;
  width: 100%;
  border-radius: 50px;
  border: none;
  font-size: 16px;
  &[type="submit"] {
    cursor: pointer;
    background-color: #8acaef;
    &:hover {
      transform: scale(1.1);
    }
  }
`

export const Error = styled.span`
  font-weight: 600;
  color: #f14f62;
`

export const Switcher = styled.span`
  margin-top: 20px;
  a {
    color: #3fb5eb;
  }
`