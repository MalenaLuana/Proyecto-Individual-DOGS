//--------actions

import * as actions from '../actions'

//----------

const initialState = {
    dogs: [],
    dogDetail: [],
    temperaments: [],
    default: [],
    loading: true,
   
    filterSource:[]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actions.GET_BY_NAME: return { ...state, dogs: action.payload }
        case actions.DOG_DETAIL: return { ...state, dogDetail: action.payload, loading: false }
        case actions.SET_DETAILS: return { ...state, dogDetail: [] }
        case actions.POST_DOGS: return { ...state }
        

        /*
         *dogs data */

        case actions.GET_DOGS:

            return {
                ...state,
                dogs: action.payload,
                default: action.payload,
                filterSource:action.payload,
                loading: false,

                
               
            }
        /* 
        *temperaments*/

        case actions.GET_TEMPS:
            return {
                ...state,
                temperaments: action.payload
            }

        /*
        *temperament filter*/

        case actions.FILTER_BY_TEMP:
          
            
            let alldog = [...state.filterSource]
            let filterDogs = []

            if (action.payload === 'all') return { ...state, dogs:alldog, filterSource:alldogs}
            console.log(state.filterSource)

            for (var i = 0; i < alldog.length; i++) {
                let temperaments = alldog[i].temperament

                if (temperaments.includes(action.payload)) {
                    filterDogs.push(alldog[i])
                }
            }


            if (filterDogs.length === 0) {
                console.log('dogs not found :( ')
            }
            console.log('reducer')

            return {
                ...state,
                dogs: filterDogs

            }

        case actions.ORDER_BY_NAME:

            let dogs = [...state.dogs]
            const sortByName=action.payload ==='za'?

            dogs.sort(function(a,b){
                if(a.name > b.name){
                    return -1;
                }
                if(b.name > a.name){
                    return 1;
                }
                return 0
            }): dogs.sort(function(a,b){
                if(a.name > b.name){
                    return 1;
                }
                if(b.name> a.name){
                    return -1;
                }
                return 0;
            })
            return{
                ...state,
                dogs: sortByName
            }



        case actions.CREATED_BY:
            let alldogs = [...state.default]
            let newDogs = []
            if (action.payload === 'all') return { ...state, dogs: alldogs, filterSource:alldogs}

            if (action.payload === 'api') {
                newDogs = alldogs.filter(e => e.createdInDB === false)

            } else {
                newDogs = alldogs.filter(e => e.createdInDB === true)

            }
            return {
                ...state,
                dogs: newDogs,
                filterSource:newDogs
            }

        case actions.SORT_WEIGHT:

            let breeds = [...state.dogs]
            let sort = []


            if (action.payload === "min-max") {

                sort = breeds.sort((a, b) => {
                    if (a.weightMax < b.weightMax) {
                        return -1
                    }
                    if (a.weightMax > b.weightMax) {
                        return 1
                    }
                    return 0
                })
                return { ...state, dogs: sort }

            } else {
                sort = breeds.sort((a, b) => {
                    if (a.weightMax < b.weightMax) {
                        return -1
                    }
                    if (a.weightMax > b.weightMax) {
                        return 1
                    }
                    return 0
                }).reverse()


                return { ...state, dogs: sort }
            }


        default:
            return state



    }
}
export default reducer