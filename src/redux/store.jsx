// import {  createStore } from 'redux';

// import combineReducers from './combined/combineReducer'
// // const mystore=createStore(counterReducer)
// const mystore=createStore(combineReducers)
// export default mystore;






import { createStore, applyMiddleware, compose } from 'redux';
import combineReducers from './combined/combineReducer';

// وظيفة لاسترجاع البيانات من localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    return serializedState ? JSON.parse(serializedState) : {}; // قيمة افتراضية إذا لم تكن الحالة موجودة
  } catch (error) {
    console.error('Error loading state from localStorage:', error);
    return {}; // حالة افتراضية في حالة حدوث خطأ
  }
};

// Middleware لحفظ البيانات في localStorage
const saveToLocalStorage = (store) => (next) => (action) => {
  const result = next(action); // تمرير الإجراء للـ Reducer
  try {
    const state = store.getState(); // الحصول على الحالة المحدثة
    localStorage.setItem('reduxState', JSON.stringify(state)); // تخزينها في localStorage
  } catch (error) {
    console.error('Error saving state to localStorage:', error);
  }
  return result; // إعادة النتيجة
};

// استرجاع الحالة المبدئية من localStorage
const preloadedState = loadState();

// دعم Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// إنشاء المتجر
const mystore = createStore(
  combineReducers, 
  preloadedState, // الحالة المبدئية
  composeEnhancers(applyMiddleware(saveToLocalStorage)) // تطبيق Middleware وRedux DevTools
);

export default mystore;

