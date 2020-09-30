const initialState = {
    people :[]
}

const reducer = (state = initialState, params) => {

    switch (params.type){
        case 'ADD' : {
            let newPeople = state.people.concat([params.person])
            return {
                ...state,
                people : newPeople
            }
        }
        case 'DEL' : {
            let newPeople = state.people.filter((el) => el.id !== params.id)
            return {
                ...state,
                people : newPeople
            }        
        }

        default: return state;
    }
}

export default reducer