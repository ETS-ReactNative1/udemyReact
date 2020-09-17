export enum IngredientTypes {
    TopBun,
    BottomBun,
    Meat, 
    Cheese,
    Lettuce,
    Bacon
}

export const BurgerOptions = [{Type:IngredientTypes.Meat, Name:"Burger", Cost:1.3},
                                {Type:IngredientTypes.Cheese, Name:"Cheese",Cost:.40},
                                {Type:IngredientTypes.Bacon, Name:"Bacon", Cost:.7},
                                {Type:IngredientTypes.Lettuce, Name:"Lettuce", Cost:.5}]