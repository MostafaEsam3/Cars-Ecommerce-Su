import { ADD_TO_FAVOURITE, REMOVE_FROM_FAVOURITE } from "../Types/types"

const FavouriteReducer= (state ={wishListArray:[] , count:0} ,action)=>{


    if (action.type === ADD_TO_FAVOURITE){

    
        let newWishArray = [...state.wishListArray]
    
        if (newWishArray.some((pro)=>pro.id == action.payload.id)){
            const findIndex= newWishArray.findIndex((e)=>e.id == action.payload.id)
            newWishArray[findIndex].quantity++
        }else{
            action.payload.quantity=1
            newWishArray.push(action.payload)
        }
    
        const newCount= newWishArray.length
        return{
                ...state,
                wishListArray: newWishArray,
                count:newCount
        }
    }



    if(action.type === REMOVE_FROM_FAVOURITE){
        const indexToRemove = state.wishListArray.findIndex(item => item.id === action.payload);
// console.log(state.cartArray[indexToRemove].quantity);
        if (    indexToRemove !== -1   ) {
      const newFAVOURITE=  state.wishListArray.splice(indexToRemove, 1);
     const fav= state.wishListArray.filter((e)=> e.id !=newFAVOURITE.id)
    

     return{
        ...state,
        wishListArray:fav,
        count:state.wishListArray.length
     }
    
    }} 
  

    return state;



}

export default FavouriteReducer;