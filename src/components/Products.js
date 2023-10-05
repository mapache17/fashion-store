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
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const products = state.products;
  let visibleProducts = showAll ? products : products.slice(0, 6);
  
  if (selectedCategory !== "Todos") {
    visibleProducts = visibleProducts.filter(
      (product) => product.category === selectedCategory
    );
  }

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
        <select onChange={(e) => handleCategoryChange(e.target.value)} value={selectedCategory}>
          <option value="Todos">All</option>
          <option value="men's clothing">Men's clothing</option>
          <option value="jewelery">Jewelery</option>
          <option value="electronics">Electronics</option>
          <option value="women's clothing">Women's clothing</option>
        </select>
        <div id="buuton">
          <p>Se están mostrando {visibleProducts.length} de {products.length} productos</p>
          <button onClick={toggleShowAll}>
              {showAll ? 'Ver Menos' : 'Ver Más'}
          </button>
        </div>
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
