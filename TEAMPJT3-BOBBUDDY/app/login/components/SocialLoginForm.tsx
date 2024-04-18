import Image from "next/image";

function SocialLoginForm() {
  return (
    <div className="mb-5">
      <Image
        src="/assets/kakao.png"
        alt="카카오 로그인"
        width={320}
        height={60}
        />
    </div>
  );
}

export default SocialLoginForm;