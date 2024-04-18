'use client';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../mui';

export default function Login() {
  return (
    <ThemeProvider theme={theme}>
      <div className='flex flex-col gap-3 items-center justify-center h-screen bg-[#e6ecf4] text-[#758A94]'>
        <div className='mb-5 text-xl font-bold'>로그인</div>
        <TextField
          id='email'
          label='이메일'
          placeholder='이메일을 입력해주세요'
          sx={{
            width: '80%',
            maxWidth: '400px',
          }}
        />
        <TextField
          id='password'
          label='비밀번호'
          placeholder='비밀번호를 입력해주세요'
          sx={{
            width: '80%',
            maxWidth: '400px',
          }}
        />
        <Button
          sx={{
            marginTop: '30px',
            width: '80%',
            color: 'white',
            bgcolor: '#758A94',
            ':focus': {
              backgroundColor: '#758A94',
            },
            ':hover': {
              backgroundColor: '#758A94',
            },
          }}
          variant='contained'
          size='large'
        >
          시작하기
        </Button>
      </div>
    </ThemeProvider>
  );
}
