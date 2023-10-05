import React from 'react';
import './Cart.css';
import Nav from './Nav';
import SCart from '../resources/SCart.png';
import {useAppContext} from '../AppContext';

function Cart() {
    const { state } = useAppContext();
    const total = state.cart.reduce((accumulator, product) => accumulator + product.price, 0);

    return (
      <div className='container'>
        <Nav />
        <img src={SCart} alt="header" className="cart-header" />
        <div className='cart-content'>
          <div className='cart-container'>
            {state.cart.map((product) => (
              <li key={product.id} className='card-cart'>
                <div className="image-cart">
                  <div className="prod-image">
                    <img src={product.image} alt={product.title} />
                  </div>
                </div>
                <div className="details-cart">
                  <h2>{product.title}</h2>
                  <p>Price: ${product.price}</p>
                </div>
              </li>
            ))}
          </div>
          <div className='total-container'>
            <p id="total-compra">Total de la compra: ${total.toFixed(2)}</p>
            <button>Proceder al pago</button>
          </div>
        </div>
      </div>
    );
  }
  
  export default Cart;