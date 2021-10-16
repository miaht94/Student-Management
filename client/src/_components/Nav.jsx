import { NavLink } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { authAtom } from '_state';
import { useUserActions } from '_actions';

export { Nav };

function Nav() {
    const auth = useRecoilValue(authAtom);
    const userActions = useUserActions();

    // only show nav when logged in
    if (!auth) return null;
    
    return (
        <nav className="navbar">
            <div>
                <NavLink exact to="/" className="nav-item">Trang chủ</NavLink>
                <NavLink exact to="/dashboard" className="nav-item">Dashboard</NavLink>
                <NavLink exact to="/feed" className="nav-item">Bảng tin</NavLink>
                <NavLink exact to="/chat" className="nav-item">Nhắn tin</NavLink>
                <NavLink exact to="/studentinfo" className="nav-item">Thông tin SV</NavLink>
                <NavLink exact to="/studentscore" className="nav-item">Bảng điểm SV</NavLink>
                <NavLink exact to="/profile" className="nav-item">Hồ sơ cá nhân</NavLink>
                <NavLink to="/users" className="nav-item">QL Tài khoản</NavLink>

                <a onClick={userActions.logout} className="nav-item">Đăng xuất</a>
            </div>
        </nav>
    );
}
