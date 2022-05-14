import { useState } from 'react';
import './App.css';
import Cart from './Components/Cart/Cart';
import Header from './Components/Layout/Header';
import Meals from './Components/Meals/Meals';
import CartProvider from './store/CartProvider';

function App() {
  const [cartIsShow, setCartIsShow] = useState(false);

  const showCartHandler = () => {
    setCartIsShow(true);
  }

  const hideCartShow = () => {
    setCartIsShow(false);
  }

  return (
    <CartProvider >
      {cartIsShow && <Cart onCloseCart={hideCartShow} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;