//--------actions

import * as actions from '../actions'

//----------

const initialState = {
    dogs: [],
    dogDetail: [],
    temperaments: [],
    default: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_BY_NAME: return { ...state, dogs: action.payload }
        case actions.DOG_DETAIL: return { ...state, dogDetail: action.payload }
        case actions.SET_DETAILS: return { ...state, dogDetail: [] }
        /* todos los pokes */
        case actions.GET_DOGS:

            return {
                ...state,
                dogs: action.payload,
                default: action.payload
            }
        /* todos los temperamentos*/
        case actions.GET_TEMPS:
            return {
                ...state,
                temperaments: action.payload
            }

        /*filtrar por temp */
        case actions.FILTER_BY_TEMP:
            let data = [...state.default]
            let filterDogs = []

            if (action.payload === 'all') return { ...state, dogs: data }

            for (var i = 0; i < data.length; i++) {
                let temperaments = data[i].temperament

                if (temperaments.includes(action.payload)) {
                    filterDogs.push(data[i])
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
            
            let dogs=[...state.dogs]
            let order = []
   
           if (action.payload==='all') return {...state, dogs:dogs}
           if(action.payload === "asc"){
          
               order=dogs.sort((a,b)=>{
                   if(a.name<b.name){
                       return -1
                     }
                     if(a.name>b.name){
                       return 1
                     }
                     return 0
               })
            return {...state,dogs:order}

           } else {
               order=dogs.sort((a,b)=>{
                   if(a.name<b.name){
                     return -1
                   }
                   if(a.name>b.name){
                     return 1
                   }
                   return 0
                 }).reverse()
           
   
           return {...state,dogs:order}}

                

        case actions.CREATED_BY:
            let alldogs = [...state.default]
            let newDogs = []
            if (action.payload === 'all') return { ...state, dogs: alldogs }

            if (action.payload === 'api') {
                newDogs = alldogs.filter(e => e.createdInDB === false)
            } else {
                newDogs = alldogs.filter(e => e.createdInDB === true)

            }
            return {
                ...state,
                dogs: newDogs
            }

        case actions.SORT_WEIGHT:

            let breeds = [...state.dogs]
            let sort = []

            
            if(action.payload === "min-max"){
           
                sort= breeds.sort((a,b)=>{
                    if(a.weightMax<b.weightMax){
                        return -1
                      }
                      if(a.weightMax>b.weightMax){
                        return 1
                      }
                      return 0
                })
             return {...state,dogs:sort}
 
            } else {
                sort= breeds.sort((a,b)=>{
                    if(a.weightMax<b.weightMax){
                      return -1
                    }
                    if(a.weightMax>b.weightMax){
                      return 1
                    }
                    return 0
                  }).reverse()
            
    
            return {...state,dogs:sort}}
            

        default:
            return state



    }
}
export default reducer