import React from 'react'

const cartContext = React.createContext(
    {setCartOpen: ()=>{},

    cartOpen: false} 
);

export default cartContext;