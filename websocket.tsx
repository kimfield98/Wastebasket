import { io } from 'socket.io-client';

useEffect(() => { // 알림용 웹소켓 (테스트)

    const socket = io('https://worldisaster.com/alerts', {
      withCredentials: true, // CORS 문제를 해결하기 위한 옵션
      path: '/socket.io', // Sockets.io 라이브러리의 표준값
      transports: ['websocket'], // 트랜스포트 방식을 "websocket"으로 지정
    });

    socket.on('connect', () => {
      console.log('Alerts 웹소켓 연결 성공');
    });

    socket.on('disaster-alert', (message) => {
      console.log(message);
      // 메시지를 상태에 저장하거나 다른 처리를 할 수 있습니다.
      // 예: setReciveData(prevData => [...prevData, message]);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    // 컴포넌트 언마운트 시 소켓 연결 해제
    return () => {
      if (socket.connected) {
        socket.disconnect();
      }
    };

  }, []); // 빈 의존성 배열로 마운트 시 한 번만 실행

  useEffect(() => { // 채팅용 웹소켓 (테스트)

    // 소켓 연결 설정
    const socket = io('https://worldisaster.com/chats', {
      withCredentials: true, // CORS 문제를 해결하기 위한 옵션
      path: '/socket.io',
      transports: ['websocket'], // 트랜스포트 방식을 "websocket"으로 지정
    }); // 서버 주소 변경 필요

    socket.on('connect', () => {
      console.log('Chats 웹소켓 연결 성공');
    });

    socket.emit('joinRoom', '101'); // 101번 방 조인

    socket.on('newMessage', (data) => { // 새로운 메시지 발생시 처리
      console.log('Message from server:', data);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from the server.');
    });

    // 컴포넌트 언마운트 시 소켓 연결 해제
    return () => {
      if (socket.connected) {
        socket.disconnect();
      }
    };

  }, []); // 빈 의존성 배열로 마운트 시 한 번만 실행