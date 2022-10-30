import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actions from '../redux/actions'
import { useState } from "react";

export default function Nav({setPage}){
    const dispatch= useDispatch()
    const [name,setName]=useState('')


    const handleImputChange =(e)=>{
        e.preventDefault()
        setName(e.target.value)
       console.log(name)
       }
       const handleSubmit= (e)=>{
        e.preventDefault()
        dispatch(actions.getByName(name))
       setPage(1)
        
      }

      return (

        <div>
             <Link to='/home' >HOME</Link>
             <Link to='/create' >Create yout breed</Link>
             <div>
          <input onChange={(e)=>handleImputChange(e)} type='text' placeholder='Search...'></input>
         
          <button  onClick={e=>handleSubmit(e)} type="submit" value='BUSCAR'>SEARCH</button>
   
          </div>

        </div>
      )
}