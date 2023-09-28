import React, { useState, useEffect } from 'react';
import './Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://fakestoreapi.com/products');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const visibleProducts = showAll ? products : products.slice(0, 6);

  return (
    <div className="showProd">
      <div className='buttonShow'>
        <button onClick={toggleShowAll}>
            {showAll ? 'Ver Menos' : 'Ver Más'}
        </button>
        <p>Se están mostrando {visibleProducts.length} de {products.length} productos</p>
      </div>
      <div className="products">
        {visibleProducts.map((product) => (
          <div key={product.id} className="card">
            <div className="image">
              <div className="product-image">
                <img src={product.image} alt={product.title} />
              </div>
            </div>
            <div className="info">
              <h2>{product.title}</h2>
              <p>${product.price}</p>
              <p>Categoría: {product.category}</p>
            </div>
          </div>
        ))}
      </div>
      <p>
        Autor del ejercicio: María José Casanova - 0000223374
      </p>
    </div>
  );
}

export default Products;
