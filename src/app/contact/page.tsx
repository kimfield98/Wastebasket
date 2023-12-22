"use client"

// 폼 데이터에 대한 인터페이스 정의
interface IFormData {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    // 각 입력 요소에 대한 타입 단언
    const name = (form.querySelector('[name="name"]') as HTMLInputElement).value;
    const email = (form.querySelector('[name="email"]') as HTMLInputElement).value;
    const message = (form.querySelector('[name="message"]') as HTMLTextAreaElement).value;

    const formData: IFormData = {
      name: name,
      email: email,
      message: message,
    };

    // JSON 데이터를 서버에 전송
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    console.log(data.message);
  };

  return (
    <div className="contactContainer">
      <div className="contentContainer">
        <div className="contentBox">
          <p className="text-3xl font-bold">Contact</p>
          <p>Looking forward to hearing from you</p>
        </div>
        <div className="contentBox">
          <p className="text-lg font-bold">Phone</p>
          <p>+82-10-2449-2091</p>
        </div>
        <div className="contentBox">
          <p className="text-lg font-bold">Email</p>
          <p>kimfield98@naver.com</p>
        </div>        
      </div>
      <form onSubmit={handleSubmit}>
        <div className="contentBox">
          <p>Name</p>
          <input type="text" name="name" />
        </div>
        <div className="contentBox">
          <p>Email</p>
          <input type="text" name="email" />
        </div>
        <div className="contentBox">
          <p>Message</p>
          <textarea name="message" cols={23} rows={5}></textarea>
        </div>
        <div className="contentBox my-10">
          <button type="submit" className="green circle cursor-pointer w-28 h-28 text-lg font-bold">Submit</button>
        </div>
      </form>
    </div>
  );
}