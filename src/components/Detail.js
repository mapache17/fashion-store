import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Detail.css';
import Nav from './Nav';
import Details from '../resources/Details.png';
import { useAppContext } from '../AppContext';


function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { dispatch } = useAppContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error('Ha ocurrido un error');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Ha ocurrido un error', error);
      }
    };

    fetchData();
  }, [id]);


  if (!product) {
    return <div>Cargando...</div>;
  }

  const addToCart = () => {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }
    const storedCart = localStorage.getItem('cart');
    const currentCart = storedCart ? JSON.parse(storedCart) : [];
    currentCart.push(product);
    localStorage.setItem('cart', JSON.stringify(currentCart));
    const action = { type: 'ADD_TO_CART', payload: product };
    dispatch(action);
  };
  

  return (
    <div>
      <Nav />
      <img src={Details} alt="header" className="details-header"/>
      <div className='all-container-details'>
        <div className='detail-container-details'>
          <div key={product.id} className="card-details">
            <div className="image-detail">
              <div className="product-detail">
                <img src={product.image} alt={product.title} />
              </div>
            </div>
            <div>
            <div className="detail">
              <h2>{product.title}</h2>
              <p>Price: ${product.price}</p>
              <p>Category: {product.category}</p>
              <p>Description: {product.description}</p>
            </div>
            
            <button onClick={addToCart} className='cart-button'>
          <Link to="/shopping-cart">Add to cart</Link>
        </button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default ProductDetail;