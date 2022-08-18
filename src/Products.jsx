import React, { useState, useEffect } from 'react';

import Product from './Product.jsx';
import getProducts from './utils.js';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [countProducts, setCountProducts] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  const handleIncrement = ({ id, price }) => {
    const count = countProducts[id] ?? 0;
    setTotalPrice(totalPrice + price);

    const newCountProducts = { ...countProducts, [id]: count + 1 };
    setCountProducts(newCountProducts);
  };

  const handleDecrement = ({ id, price }) => {
    const count = countProducts[id] ?? 0;
    if (count === 0) {
      return;
    }
    setTotalPrice(totalPrice - price);

    const newCountProducts = { ...countProducts, [id]: count - 1 };
    setCountProducts(newCountProducts);
  };

  useEffect(() => {
    const fetchData = async () => setProducts(await getProducts());
    fetchData();
  }, []);

  return (
    <>
      <ul data-testid="products">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            countProduct={countProducts[product.id]}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
          />
        ))}
      </ul>
      <div>
        {`Итого цена: ${totalPrice}`}
      </div>
    </>
  );
}
