export default function Footer () {
  return (
    <div className="footer">
      <div>
        <p className="text-lg font-bold">Phone</p>
        <p>+82-10-2449-2091</p>
      </div>
      <div>
        <p className="text-lg font-bold">Email</p>
        <a href="mailto:kimfield98@gmail.com" className="footer_icon">kimfield98@gmail.com</a>
      </div>
      <div>
        <p className="text-lg font-bold">Link</p>
        <a href="https://github.com/kimfield98/Portfolio_kimfield" target="_blank" rel="noopener noreferrer" className="footer_icon">github</a>
      </div>
      <div>
        <p className="text-sm">© 2023 Kimfield. All Rights Reserved.</p>
      </div>
    </div>
  );
}