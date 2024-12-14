import { faAppleWhole } from "@fortawesome/free-solid-svg-icons";
import { ADD_TO_CART, CHANGE, DECREMENT, INCREMENT, REMOVE_FROM_CART } from "../Types/types";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const initialState = () => {
    const savedState = localStorage.getItem('cartState');
    return savedState ? JSON.parse(savedState) : { cartArray: [], count: 0 };
};
const counterReducer =(state =initialState() , action )=>{
if (action.type === ADD_TO_CART) {
    let newCartArray = [...state.cartArray];

    if (newCartArray.some((pro) => pro.id === action.payload.id)) {
        const findIndex = newCartArray.findIndex((e) => e.id === action.payload.id);
        newCartArray[findIndex].quantity++;
    } else {
        action.payload.quantity = 1;
        newCartArray.push(action.payload);
    }
    const newCount = newCartArray.length;
    
    const newState = {
        ...state,
        cartArray: newCartArray,
        count: newCount,
    };

    localStorage.setItem('cartState', JSON.stringify(newState));

    return newState;

}
if(action.type === REMOVE_FROM_CART){

const indexToRemove = state.cartArray.findIndex(item => item.id === action.payload);

if (indexToRemove !== -1) {
    const cart = state.cartArray.filter(item => item.id !== action.payload);
    const updatedState = {
        ...state,
        cartArray: cart,
        count: cart.length, 
    };
    localStorage.setItem('cartState', JSON.stringify(updatedState));

    return updatedState;
}
}

if (action.type === INCREMENT) {
    const newCart = [...state.cartArray];

    const index = state.cartArray.findIndex(item => item.id === action.payload);

    if (index !== -1) {
        newCart[index] = { ...newCart[index], quantity: newCart[index].quantity + 1 };
    }

    const updatedState = {
        ...state,
        cartArray: newCart,
    };
    localStorage.setItem('cartState', JSON.stringify(updatedState));

    return updatedState;
}

if (action.type === DECREMENT) {
    let newCart = [...state.cartArray];
    const index = state.cartArray.findIndex(item => item.id === action.payload);

    if (index !== -1 && newCart[index].quantity > 0) {
        newCart[index] = { ...newCart[index], quantity: newCart[index].quantity - 1 };
        if (newCart[index].quantity === 0) {
            newCart = newCart.filter(item => item.id !== action.payload);
        }
    }
    const updatedState = {
        ...state,
        cartArray: newCart,
        count: newCart.length,
    };
    localStorage.setItem('cartState', JSON.stringify(updatedState));

    return updatedState;
}

return state;
}
export default counterReducer;

