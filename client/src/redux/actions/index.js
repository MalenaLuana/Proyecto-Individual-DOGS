import axios from "axios";

export const GET_DOGS="GET_DOGS"
export const GET_TEMPS="GET_TEMPS"
export const DOG_DETAIL="DOG_DETAIL"
export const SET_DETAILS = "SET_DETAILS"
export const ORDER_BY_NAME="ORDER_BY_NAME"
export const FILTER_BY_TEMP="FILTER_BY_TEMP"
export const CREATED_BY = "CREATED_BY"
export const GET_BY_NAME = "GET_BY_NAME"
export const SORT_WEIGHT = "SORT_WEIGHT"
export const POST_DOGS ="POST_DOGS"



export const getDogs=() => dispatch =>{

    return axios.get('https://proyecto-individual-dogs-production.up.railway.app/dogs')
    .then(res=>{
      
        dispatch({
            type:"GET_DOGS",
            payload:res.data
        })
    })

}

export const getByName = (name) => dispatch => {
    try{
    return axios.get(`https://proyecto-individual-dogs-production.up.railway.app/dogs?name=${name}`)
        .then(res => {
            dispatch({
                type: "GET_BY_NAME",
                payload: res.data
            })
        })
    }catch(error){
        console.log(error)
    }
}

export const getTemperaments=()=>dispatch =>{
return axios.get('https://proyecto-individual-dogs-production.up.railway.app/temperaments')
.then(res=>{
    dispatch(
        {type:"GET_TEMPS",
        payload:res.data
    })
})
}

export const dogDetails=(id)=>dispatch=>{
   
    return axios.get(`https://proyecto-individual-dogs-production.up.railway.app/dogs/${id}`)
    .then(res=>{
        dispatch({
            type:'DOG_DETAIL',
            payload:res.data
        })
    })
}


export const filterByTemp=payload=>{
 return {
    type:"FILTER_BY_TEMP",
    payload
 }
}

export const orderByName=payload=>{
 
return {
      type:"ORDER_BY_NAME",
    payload:payload
}
}

export const createdBy = payload => {
    return {
        type: "CREATED_BY",
        payload

    }
}

export const setDetails= ()=>{
 
    return{
       type:"SET_DETAILS",
  
    }
}


export const sortWeight = payload => {
    return {
        type: "SORT_WEIGHT",
        payload
    }
}



//create

export const postDogs = payload => dispatch =>{
    return axios.post('https://proyecto-individual-dogs-production.up.railway.app/dogs',payload)
    .then(res=>res)
}

