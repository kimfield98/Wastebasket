import { Link, Outlet } from "react-router-dom"

const Layout = () => {
    
    return (
        <>
            <div className="headerstyles">
                <Link to="/list"><span className="headercomponent">게시판</span></Link>
                <div>
                    <Link to="/Signin"><span className="headercomponent">로그인</span></Link>
                    <Link to="/signup"><span className="headercomponent">회원가입</span></Link>  
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default Layout
