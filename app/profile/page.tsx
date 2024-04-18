'use client';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../mui';
import Avatar from '@mui/material/Avatar';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import { Button, List, ListItem } from '@mui/material';

export default function Profile() {
  const [toggleStatus, setToggleStatues] = useState('basic');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setToggleStatues(newAlignment);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className='flex flex-col gap-5 items-center justify-center h-screen bg-[#e6ecf4] text-[#758A94]'>
        <div className='mb-5 text-xl font-bold'>프로필</div>
        <div className='flex flex-col items-center gap-10 mb-10'>
          <Avatar src='/broken-image.jpg' sx={{ width: 56, height: 56 }} />
          <ToggleButtonGroup
            color='primary'
            value={toggleStatus}
            exclusive
            onChange={handleChange}
            aria-label='Platform'
          >
            <ToggleButton value='basic'>기본 정보</ToggleButton>
            <ToggleButton value='preference'>추가 정보</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <Box
          sx={{
            width: '80%',
            maxWidth: '400px',
            bgcolor: 'background.paper',
            borderRadius: 3,
          }}
        >
          <div>
            {toggleStatus === 'basic' ? (
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary='이름' />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component='a' href='#simple-list'>
                    <ListItemText primary='이메일' />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component='a' href='#simple-list'>
                    <ListItemText primary='전화번호' />
                  </ListItemButton>
                </ListItem>
              </List>
            ) : (
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary='MBTI' />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component='a' href='#simple-list'>
                    <ListItemText primary='지역' />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component='a' href='#simple-list'>
                    <ListItemText primary='음식' />
                  </ListItemButton>
                </ListItem>
              </List>
            )}
          </div>
        </Box>
        <Button
          sx={{
            marginTop: '30px',
            width: '80%',
            maxWidth: '400px',
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
          비밀번호 변경
        </Button>
      </div>
    </ThemeProvider>
  );
}
