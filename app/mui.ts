import styled from '@emotion/styled';
import { TextField } from '@mui/material';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#758A94',
    },
  },
});

export const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#758A94', // 포커스됐을 때 border 색 변경
    },
  },
  '& .MuiFormLabel-root': {
    color: '#758A94', // 라벨 색상 변경
  },
  '& .Mui-focused .MuiFormLabel-root': {
    color: '#758A94', // 포커스됐을 때 라벨 색상 변경
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#758A94', // 아웃라인 border 색상 변경
  },
  '& .MuiInputBase-input': {
    color: '#758A94', // 입력 텍스트 색상 변경
  },
  '& .MuiOutlinedInput-input': {
    color: '#758A94', // 아웃라인 입력 텍스트 색상 변경
  },
  '& .MuiInputLabel-outlined': {
    color: '#758A94', // 아웃라인 라벨 색상 변경
  },
  '& .MuiInputLabel-outlined.Mui-focused': {
    color: '#758A94', // 포커스됐을 때 아웃라인 라벨 색상 변경
  },
});
