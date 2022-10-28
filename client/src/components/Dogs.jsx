import React, {Fragment,useState, useEffect} from "react";
import {useDispatch,useSelector} from 'react-redux'
import * as actions from '../redux/actions'
import { Link } from "react-router-dom";
import Paginado from "./Paginado";


import DogsCard from './DogsCard'
import Nav from "./Nav";

//--------------

export default function Dogs(){

   const dispatch = useDispatch() 
   const dogs = useSelector((state)=>state.dogs) 

   const temperaments = useSelector((state)=>state.temperaments)
    useEffect(()=>{
      
         dispatch(actions.getDogs())
         .then(res=>res)

         dispatch(actions.getTemperaments())
        
    },[dispatch])

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
         const [dogsxPage,setDogsxPage] = useState(8)

         const lastDog = page * dogsxPage
         const firstDog = lastDog - dogsxPage

         const actualDogs = dogs.slice(firstDog,lastDog)

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
        
    }

    const handleCreatedBy=(e)=>{
        e.preventDefault()
        dispatch(actions.createdBy(e.target.value))
        setPage(1)
    }
    //----------------------------


    return (
        <div>
            <Nav setPage={setPage}></Nav>
            <div>
                <h3>Filter by temperaments</h3>
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
            
                 <option value="asc">A-Z</option>
                 <option value="des">Z-A</option>
                </select>
             </div>

          <div>
          <h3>Created by:</h3>
              <select name="createdBy" onChange={(e)=> handleCreatedBy(e)} >
                  <option value='all'>Show all</option>
                  <option value='api'>API</option>
                  <option value='db'>DATA BASE</option>

              </select>
          </div>



          
          <Paginado dogs={dogs.length} dogsxPage={dogsxPage} paginado={paginado}></Paginado>
          
          
          {
            actualDogs?.map(e=>{
                return(
                    <Fragment>
                        <Link to={"/home/"+e.id}>
                            <DogsCard key={e.id}
                            name={e.name}
                            image={e.img}
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
    )
}