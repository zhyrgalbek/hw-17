import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0,
}

function ValidIdArr(arr, id){
    for(let i=0; i<arr.length; i++){ // это функция для проверки еды, если такая еда есть в контексте то 
        if(arr[i].id === id){        // возвращает false и еда не добавляется в контекст
            return false;
        }
    }
    return true;
}

function amountCount(arr, item){
    arr.forEach((elem)=>{
        if(elem.id === item.id){
            elem.amount = item.amount;  // это функция используется если еда не добавился в контекст то  
        }                               // умножает кол-во этой еды
    })
    let allPrice = amountPrice(arr, item); // здесь умножает кол-во на цену и создает новое свойство allprice
    arr.forEach((elem)=>{                  // и добавлет в это свойство общую цену 
        if(elem.id === item.id){
            elem.allPrice = allPrice.toFixed(3);
        }
    })
    return arr;
}

function amountPrice(arr, item){
    for(let i=0;i<arr.length;i++){
        if(arr[i].id === item.id){
            return arr[i].amount * item.price;
        }
    }
}

function allPrice(arr){
    if(arr.length === 1){
        return arr[0].allPrice ? +arr[0].allPrice: +arr[0].price;
    }
    let sum = 0;
    for(let i=0;i < arr.length;i++){
        sum += arr[i].allPrice ? +arr[i].allPrice : +arr[i].price;
    }
    return sum;
}

const cartReducer = (prevState, action)=>{
    if(action.type === "ADD"){
        let updatedItems = [];
        if(ValidIdArr(prevState.items, action.item.id)){
            updatedItems = prevState.items.concat(action.item);
        } else {
            updatedItems = amountCount(prevState.items, action.item);
        }
        const updatedTotalAmount = allPrice(updatedItems);
        // const updatedTotalAmount = prevState.totalAmount + action.item.price * action.item.amount;
        return {
            items: updatedItems,
            totalAmount: Math.round(updatedTotalAmount)
        }
    }

    return defaultCartState;
}

const CartProvider = (props)=>{
    const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState)

    const addItemToCartHandler = (item)=>{
        dispatchCart({type: "ADD", item: item})
    };

    const removeItemFromCartHandler = (id)=>{};

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
    };

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}


export default CartProvider;
