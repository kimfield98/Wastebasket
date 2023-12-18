export default function Navbar () {
  return (
    <div className="navbar">
      <div className="navbar_left nav_icon">
        <p className="circle w-6 h-6"></p>
        <p className="text-xl font-bold">kimfield</p>
        <p>Frontend</p>
      </div>
      <div className="navbar_right">
        <p className="nav_icon hidden md:flex">Resume</p>
        <p className="line hidden md:flex"></p>
        <p className="nav_icon hidden md:flex">Projects</p>
        <p className="line hidden md:flex"></p>
        <p className="nav_icon hidden md:flex">Contact</p>
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-list md:hidden" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
        </svg>
      </div>
      
    </div>
  );
}