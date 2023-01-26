import React, {Fragment,useState, useEffect} from "react";
import {useDispatch,useSelector} from 'react-redux'
import * as actions from '../redux/actions'
import { Link } from "react-router-dom";
import Paginado from "./Paginado";
import style from '../css/Dogs.module.css'
import image from '../css/images/error.png' 


import DogsCard from './DogsCard'
import Nav from "./Nav";
import Loading from "./Loading";

//--------------

export default function Dogs(){

   const dispatch = useDispatch() 
   const dogs = useSelector((state)=>state.dogs) 

   const temperaments = useSelector((state)=>state.temperaments)
   const loading = useSelector((state)=>state.loading)
   
    useEffect(()=>{
        
         dispatch(actions.getDogs())
         .then(res=>res)
        
         if (temperaments.length === 0) {
            dispatch(actions.getTemperaments())
        }
        
    },[dispatch,temperaments])

    temperaments.sort((a,b)=>{
        if(a.name<b.name){
            return -1
          }
          if(a.name>b.name){
            return 1
          }
          return 0
    })
    //--------paginado------------
         const [page,setPage] = useState(1)
         const [dogsxPage] = useState(8)

         const lastDog = page * dogsxPage
         const firstDog = lastDog - dogsxPage

         let actualDogs = dogs.slice(firstDog,lastDog)

         const paginado = (numerPage)=>{
            setPage(numerPage)
         }
    //-----------Selects*---------

    const handleTemperaments = (e)=>{
        e.preventDefault()
        dispatch(actions.filterByTemp(e.target.value))
        setPage(1)
        
       }   
       
    const handleAlpha = (e)=>{
      
        e.preventDefault()
        dispatch(actions.orderByName(e.target.value))
        console.log(e.target.value)
    }
    
    const handleWeight = (e)=>{
        e.preventDefault()
        dispatch(actions.sortWeight(e.target.value))
         setPage(1)
    }

    const handleCreatedBy=(e)=>{
        e.preventDefault()
        dispatch(actions.createdBy(e.target.value))
        
        setPage(1)
    }

    const handleClick=(e)=>{
        e.preventDefault()
        dispatch(actions.getDogs())
    }
    //----------------------------


    return (
        <div className={style.dogsMain}>


            <Nav setPage={setPage} handleClick={handleClick}></Nav>


            <div className={style.decoration}></div>
                
              
           

           <div className={style.container}>

            <div className={style.filterDiv}>

                <button className={style.btnAll} onClick={e=>handleClick(e)}>Show all</button>
              
            <div>
               <h3>Source:</h3>
                 <select name="createdBy" onChange={(e)=> handleCreatedBy(e)} >
                  <option value='all'>Show all</option>
                  <option value='api'>API</option>
                  <option value='db'>DATA BASE</option>

              </select>
            </div>
               <div>
               
                <h3>Filter by temperaments:</h3>
                <select name="temperaments" onChange={(e)=> handleTemperaments(e)}>
                    <option value="all">Show all</option>
                    {
                        temperaments && temperaments.map(e=>{
                      return (
                            <option key={e.name} value={e.name}>{e.name}</option>
                            )
                        })
                    }
                </select>
             </div>

             <div>
                <h3>Order by name:</h3>
                <select name="alpha" onChange={(e)=>handleAlpha(e)}>
                 <option hidden value="">--select--</option>
                 <option value="az">A-Z</option>
                 <option value="za">Z-A</option>
                </select>
             </div>

             <div>

         
                <h3>Order by Weight:</h3>
                <select name="weight" onChange={e=> handleWeight(e)} >
                    <option hidden value="">--select--</option>
                    <option value="min-max">min-max</option>
                    <option value="max-min">max-min</option>
                </select>
          
            </div>


          
         
          </div>
      <div className={style.pags}>
            <div className={style.paginado}>
               <Paginado page={page} dogs={dogs.length} dogsxPage={dogsxPage} paginado={paginado}></Paginado>
            </div>
            <div className={style.dogBlock}>
            <div className={style.dogArea}>

        
          { loading? (
					<Loading />
				)
          :actualDogs<1 ?
          <div className={style.error}><img src={image} alt="" /><p >Sorry, we don't have that dog breed </p></div>     
          :actualDogs?.map(e=>{
                return(
                    <Fragment key={e.id}>
                        <Link className={style.linked}  to={"/home/"+e.id}>
                            <DogsCard key={e.id}
                            name={e.name}
                            image={e.image}
                            weightMin={e.weightMin}
                            weightMax={e.weightMax}
                            temperament={e.temperament}
                             />
                        </Link>
                    </Fragment>
                )
            })
          }
         </div>  
         </div>
      
         </div>
        
        </div>
    </div>
    )
}