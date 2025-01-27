import { ADD_TO_CART, CHANGE, DECREMENT, INCREMENT, REMOVE_FROM_CART } from "../Types/types";

const initialState = () => {
    const savedState = localStorage.getItem('cartState');
    return savedState ? JSON.parse(savedState) : { cartArray: [], count: 0 };
};

const counterReducer = (state = initialState(), action) => {
    let updatedState = state; 

    // حذف عنصر من السلة
    if (action.type === REMOVE_FROM_CART) {
        const updatedCartArray = state.cartArray.filter((_, idx) => idx !== action.payload);

        updatedState = {
            ...state,
            cartArray: updatedCartArray,
            count: updatedCartArray.length,
        };
    }

    // إضافة عنصر جديد إلى السلة
    if (action.type === ADD_TO_CART) {
      let newCartArray = [...state.cartArray];
      const newItem = { ...action.payload, quantity: action.payload.quantity || 1 };
      newCartArray.push(newItem);
  
      updatedState = {
          ...state,
          cartArray: newCartArray,
          count: newCartArray.length,
      };
  
      console.log("Updated State with New Item Always:", updatedState);
  }
  

    // تحديث السلة بالكامل
    if (action.type === "UPDATE_CART_ITEMS") {
        updatedState = {
            ...state,
            cartArray: action.payload, 
        };
    }

    // ✅ تحديث localStorage بعد كل تعديل في الحالة
    localStorage.setItem('cartState', JSON.stringify(updatedState));

    return updatedState; 
};

export default counterReducer;
