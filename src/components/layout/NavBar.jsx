import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logout from '../auth/Logout';

const NavBar = () => {
    const [showAccount, setShowAccount] = useState(false);

    const handleAccountClick = () => {
        setShowAccount(!showAccount);
    }

    const isLoggedIn = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");

    return (
        <nav className='navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 sticky-top py-2'>
            <div className='container-fluid'>
                <Link to={"/"} className='navbar-brand'>
                    <span className='hotel-color'>Armani Hotel</span>
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
                        {isLoggedIn && userRole === "ROLE_ADMIN" && (
                            <li className='nav-item'>
                                <NavLink className="nav-link" aria-current="page" to={"/admin"}>
                                    Quản trị viên
                                </NavLink>
                            </li>
                        )}
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
                                {isLoggedIn ? (
                                    <Logout />
                                ) : (
                                    <li>
                                        <Link className='dropdown-item' to={"/login"}>Đăng nhập</Link>
                                    </li>
                                )}
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;
