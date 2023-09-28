import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import { HomeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import Logo from '../resources/Logo.png';
import Usuario from '../resources/Usuario.png';

function Nav() {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={Logo} alt="logo" />
      </div>
      <ul className="nav-links">
      <Link to="/">
        <HomeOutlined /> Home
      </Link>
      <Link to="/shopping-cart">
        <ShoppingCartOutlined /> Carrito de compras
      </Link>
      </ul>
      <div className="usuario">
        <img src={Usuario} alt="usuario" />
      </div>
    </nav>
  );
}

export default Nav;