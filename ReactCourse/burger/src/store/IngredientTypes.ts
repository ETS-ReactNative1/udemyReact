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

export const GetCostOfOrder = (order : IngredientTypes[] ) => {

    let cost = 0;
    BurgerOptions.forEach(option => {
            cost += GetCountOnOrder(order, option.Type) * option.Cost
    });

    return cost;
}

export const GetCountOnOrder = (order: IngredientTypes[], ingredient: IngredientTypes) =>{
    let ingFilter = order.filter(item => item === ingredient)

    if(ingFilter == null) {
        return 0
    }

    return ingFilter.length
} 