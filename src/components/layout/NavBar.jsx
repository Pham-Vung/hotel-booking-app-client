import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {
    const [showAccount, setShowAccount] = useState(false);

    const handleAccountClick = () => {
        setShowAccount(!showAccount);
    }

    return (
        <nav className='navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 sticky-top'>
            <div className='container-fluid'>
                <Link to={"/"} className='navbar-brand'>
                    <span style={{ color: "rgb(169, 77, 123)" }}>Armani Hotel</span>
                </Link>
                <button
                    className='navbar-toggler'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarScroll'
                    aria-controls='navbarScroll'
                    aria-expanded="false"
                    aria-label='Toggle navigation'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarScroll'>
                    <ul className='navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll'>
                        <li className='nav-item'>
                            <NavLink className="nav-link" aria-current="page" to={"/browse-all-rooms"}>
                                Xem qua tất cả các phòng
                            </NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className="nav-link" aria-current="page" to={"/admin"}>
                                Quản trị viên
                            </NavLink>
                        </li>
                    </ul>
                    <ul className='d-flex navbar-nav'>
                        <li className='nav-item'>
                            <NavLink className="nav-link" to={"/find-booking"}>
                                Tìm đặt phòng
                            </NavLink>
                        </li>
                        <li className='nav-item dropdown'>
                            <a
                                href="#"
                                className={`nav-link dropdown-toggle ${showAccount ? "show" : ""}`}
                                role='button'
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                onClick={handleAccountClick}
                            >
                                {""}
                                Tài khoản
                            </a>
                            <ul className={`dropdown-menu ${showAccount ? "show" : ""}`} aria-labelledby="navbarDropdown">
                                <li>
                                    <Link to={"/login"} className='dropdown-item'>Đăng nhập</Link>
                                </li>
                                <li>
                                    <Link to={"/profile"} className='dropdown-item'>Hồ sơ</Link>
                                </li>
                                <li>
                                    <Link to={"/logout"} className='dropdown-item'>Đăng xuất</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>

        </nav>
    )
}

export default NavBar;
