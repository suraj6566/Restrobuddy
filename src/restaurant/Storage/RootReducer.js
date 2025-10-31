const initialState = {
  cart: {},
  user: {},
  useraddress: {},
};

export default function RootReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_CART":
      state.cart[action.payload[0]] = action.payload[1];

      return { cart: state.cart, user: state.user ,useraddress:state.useraddress};
    case "DELETE_CART":
      delete state.cart[action.payload[0]];

      return { cart: state.cart, user: state.user,useraddress:state.useraddress };
    case "ADD_USER":
      state.user = action.payload[0];
      console.log("UUUUU",state.user)
      return { cart: state.cart, user: state.user,useraddress:state.useraddress };
    case "DELETE_USER":
      state.user = {};

      return { cart: state.cart, user: state.user,useraddress:state.useraddress };
    case "USER_ADDRESS":
      state.useraddress = action.payload[0];
      console.log("User Address",state.useraddress)
      return { cart: state.cart, user: state.user,useraddress:state.useraddress };
   case  "CLEAR_ALL":
    state.cart={}
    state.user={}   
    state.useraddress={}
      return { cart: state.cart, user: state.user,useraddress:state.useraddress };

    default:
      return { cart: state.cart, user: state.user,useraddress:state.useraddress };
  }
}
