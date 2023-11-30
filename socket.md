const handleSupport = async () => {
  const token = Cookies.get('access-token');
  try {
    await axios.get('https://worldisaster.com/api/support', {
      headers: {
        'Authorization': `Bearer ${token}`, // 헤더에 토큰 추가
        withCredentials: true, // 쿠키와 인증 정보를 포함
      }
    });
  } catch (error) {
    console.error('데이터 로드 실패', error);
  }
};