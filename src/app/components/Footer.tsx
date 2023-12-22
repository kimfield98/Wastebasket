export default function Footer () {
  return (
    <div className="footer">
      <div className="footer_item">
        <p className="text-lg font-bold">Phone</p>
        <p>+82-10-2449-2091</p>
      </div>
      <div className="footer_item">
        <p className="text-lg font-bold">Email</p>
        <a href="mailto:kimfield98@gmail.com">kimfield98@gmail.com</a>
      </div>
      <div className="footer_item">
        <p className="text-lg font-bold">Link</p>
        <a href="https://github.com/kimfield98/Portfolio_kimfield" target="_blank" rel="noopener noreferrer">github</a>
      </div>
      <div className="footer_item">
        <p className="text-sm">© 2023 Kimfield. All Rights Reserved.</p>
      </div>
    </div>
  );
}