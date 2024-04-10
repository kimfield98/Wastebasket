const AdminLoginPage = () => {
  
  return (
    <form className="flex flex-col items-center">
      <input 
        type="text"
        placeholder="이름을 입력해주세요"
        className="w-80 bg-[#F5F5F5] text-[#758A94] px-5 py-2 mb-3 rounded-md focus:outline-none transition duration-300 ease-in-out"
      />
      <input
        type="email"
        placeholder="이메일을 입력해주세요"
        className="w-80 bg-[#F5F5F5] text-[#758A94] px-5 py-2 mb-3 rounded-md focus:outline-none transition duration-300 ease-in-out"
      />
      <input
        type="password"
        placeholder="비밀번호를 입력해주세요"
        className="w-80 bg-[#F5F5F5] text-[#758A94] px-5 py-2 mb-3 rounded-md focus:outline-none transition duration-300 ease-in-out"
      />
      <button
        type="submit"
        className="w-80 bg-[#5F7A85] text-white py-2 my-3 rounded-md focus:outline-none transition duration-300 ease-in-out hover:bg-[#758A94]"
      >
        로그인
      </button>
    </form>
  );
};
export default AdminLoginPage;
