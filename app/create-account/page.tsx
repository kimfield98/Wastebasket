import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function CreateAccount() {
  return (
    <div className='flex flex-col gap-3 items-center justify-center h-screen bg-[#e6ecf4] text-[#758A94]'>
      <div className='mb-5 text-xl font-bold'>회원가입</div>
      <TextField
        id='name'
        label='이름'
        placeholder='이름을 입력해주세요'
        sx={{
          width: '80%',
          maxWidth: '400px',
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
          '& .MuiButton-contained': {
            color: 'white', // 버튼 텍스트 색상 변경
            backgroundColor: '#758A94', // 버튼 배경 색상 변경
          },
          '& .MuiButton-contained:hover': {
            backgroundColor: '#758A94', // 버튼 호버 시 배경 색상 유지
          },
        }}
      />
      <TextField
        id='email'
        label='이메일'
        placeholder='이메일을 입력해주세요'
        sx={{
          width: '80%',
          maxWidth: '400px',
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
          '& .MuiButton-contained': {
            color: 'white', // 버튼 텍스트 색상 변경
            backgroundColor: '#758A94', // 버튼 배경 색상 변경
          },
          '& .MuiButton-contained:hover': {
            backgroundColor: '#758A94', // 버튼 호버 시 배경 색상 유지
          },
        }}
      />
      <TextField
        id='password'
        label='비밀번호'
        placeholder='비밀번호를 입력해주세요'
        sx={{
          width: '80%',
          maxWidth: '400px',
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
          '& .MuiButton-contained': {
            color: 'white', // 버튼 텍스트 색상 변경
            backgroundColor: '#758A94', // 버튼 배경 색상 변경
          },
          '& .MuiButton-contained:hover': {
            backgroundColor: '#758A94', // 버튼 호버 시 배경 색상 유지
          },
        }}
      />
      <TextField
        id='confirmPassword'
        label='비밀번호 확인'
        placeholder='비밀번호를 다시 입력해주세요'
        sx={{
          width: '80%',
          maxWidth: '400px',
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
          '& .MuiButton-contained': {
            color: 'white', // 버튼 텍스트 색상 변경
            backgroundColor: '#758A94', // 버튼 배경 색상 변경
          },
          '& .MuiButton-contained:hover': {
            backgroundColor: '#758A94', // 버튼 호버 시 배경 색상 유지
          },
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
  );
}
