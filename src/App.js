import React from 'react';
import './App.css';
import Products from './components/Products';
import Detail from './components/Detail';

import {BrowserRouter, Route, Routes} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
          path="/"
          element={<Products />} />
          <Route
          path="/products/:id"
          element={<Detail />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
