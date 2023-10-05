import React, { useState, useEffect } from 'react';
import './Products.css';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import Header from '../resources/Header.png';
import { useAppContext } from '../AppContext';


function Products() {
  //const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const {state, dispatch} = useAppContext();

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const products = state.products;
  const visibleProducts = showAll ? products : products.slice(0, 6);


  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ha ocurrido un error');
        }
        return response.json();
      })
      .then((data) => {
        dispatch({ type: 'SET_PRODUCTS', payload: data });
      })
      .catch((error) => {
        console.error('Ha ocurrido un error', error);
      });
  }, [dispatch]);


  return (
    <div className="showProd">
    <Nav/>
      <img src={Header} alt="header" className="header"/>
      
      <div id='buttonShow1'>
        <p>Se están mostrando {visibleProducts.length} de {products.length} productos</p>
        <button onClick={toggleShowAll}>
            {showAll ? 'Ver Menos' : 'Ver Más'}
        </button>
        
      </div>
      <div id="products1">
        {visibleProducts.map((product) => (
          <div key={product.id} className="card-products">
            <div className="image-prod">
              <div className="product-image">
                <img src={product.image} alt={product.title} />
              </div>
            </div>
            <div className="info">
              <h2>{product.title}</h2>
              <p id="precio">${product.price}</p>
              <p>Category: {product.category}</p>
              <Link to={`/products/${product.id}`} className='buttonDetails-product'>See details</Link>
            </div>
          </div>
        ))}
      </div>
      <p className='name'>
        Autor del ejercicio: María José Casanova - 0000223374
      </p>
    </div>
  );
}

export default Products;
