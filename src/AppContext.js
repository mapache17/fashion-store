import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AppContext = createContext();


const appReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, cart: [...state.cart, action.payload] };
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'SET_CART':
      return { ...state, cart: action.payload };
    default:
    return state;
  }
};

export const AppProvider = ({ children }) => {
  const cartFromStorage = localStorage.getItem('cart');
  const initialCart = cartFromStorage ? JSON.parse(cartFromStorage) : [];
  const initialState = {
    cart: initialCart,
    products: [],
  };
  
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);
  

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext debe ser utilizado dentro de un AppProvider');
  }
  return context;
};
