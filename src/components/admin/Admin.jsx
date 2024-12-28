import React from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <section className='container mt-5'>
      <h2>Chào mừng đến với bảng quản trị</h2>
      <hr />
      <Link to={"/add-room"}>Quản lý phòng</Link>
    </section>
  )
}

export default Admin;
