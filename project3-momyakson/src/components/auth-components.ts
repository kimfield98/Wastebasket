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
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 10px;
  font-size: 42px;
  font-weight: 600;
  color: #3fb5eb;
  span {
    display: inline-block;
    margin-left: 5px;
    width: 40px;
    height: 40px;
    background-image: url("/logo.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
`

export const Input = styled.input`
  padding: 15px 20px;
  width: 100%;
  border-radius: 50px;
  border: none;
  font-size: 16px;
  font-weight: 600;
  &[type="submit"] {
    cursor: pointer;
    background-color: #8acaef;
    color: #ffffff;
    &:hover {
      background-color: #3fb5eb;
    }
  }
  &:focus {
    outline: none;
    border: 2px solid #3fb5eb;
  }
`

export const Error = styled.span`
  font-weight: 600;
  color: #f14f62;
`

export const Switcher = styled.span`
  margin-top: 20px;
  a {
    border-bottom: 1px solid #3fb5eb;
    color: #3fb5eb;
    font-weight: 600;
    text-decoration: none;
  }
`