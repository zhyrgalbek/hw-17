import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import { useContext } from 'react';

const Cart = (props)=>{
    const cartCtx = useContext(CartContext);
    const cartItem = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item)=>{
                return <li key={item.id}>
                    <span>{item.name}</span> 
                    <span>кол-во: {item.amount}</span>
                    <span>общая цена: {`$${item.allPrice ? item.allPrice : item.price}`}</span>
                </li> 
            })}
        </ul>
    )
    return <Modal onCloseCart={props.onCloseCart}>
        {cartItem}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>Итог: ${cartCtx.totalAmount}</span>
        </div>
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onCloseCart} >Close</button>
            <button className={classes.button}>Open</button>
        </div>
    </Modal>
}

export default Cart;