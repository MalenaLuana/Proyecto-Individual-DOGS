import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actions from '../redux/actions'
import { useState } from "react";
import style from '../css/Nav.module.css'



export default function Nav({setPage,handleClick}){
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

        <div className={style.container}>
            <h2 className={style.logo}>Breeds</h2>
            <div className={style.links}>
             <Link to='/home' className={style.home}><span onClick={e=>handleClick(e)}>HOME</span></Link>
             <Link to='/create' className={style.home}><span>CREATE YOUR BREED</span></Link>
            </div>
           <div className={style.searchBar}>
          <form  onSubmit={e=>handleSubmit(e)}  >
          <input className={style.searchInput} onChange={(e)=>handleImputChange(e)} type='text' placeholder='Search...'></input>
         
          <button className={style.searchBtn}  type="submit" value='BUSCAR'>SEARCH</button>
         </form>
          </div>

        </div>
      )
}