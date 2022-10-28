import axios from "axios";

export const GET_DOGS="GET_DOGS"
export const GET_TEMPS="GET_TEMPS"
export const  ORDER_BY_NAME="ORDER_BY_NAME"
export const FILTER_BY_TEMP="FILTER_BY_TEMP"
export const CREATED_BY = "CREATED_BY"
export const GET_BY_NAME = "GET_BY_NAME"

export const getDogs=() => dispatch =>{

    return axios.get('http://localhost:3001/dogs')
    .then(res=>{
      
        dispatch({
            type:"GET_DOGS",
            payload:res.data
        })
    })

}

export const getByName = (name) => dispatch => {
    try{
    return axios.get(`http://localhost:3001/dogs?name=${name}`)
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
return axios.get('http://localhost:3001/temperaments')
.then(res=>{
    dispatch(
        {type:"GET_TEMPS",
        payload:res.data
    })
})
}

export const dogDetails=(id)=>dispatch=>{
    return axios.get(`http://localhost:3001/dogs/${id}`)
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
    payload:payload
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