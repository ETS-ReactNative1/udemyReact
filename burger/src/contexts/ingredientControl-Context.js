import React from 'react'

const ingredientControlContext = React.createContext(
    {increase: () =>{}, 
        decrease:()=>{}, 
        count:()=>{}});

export default ingredientControlContext;