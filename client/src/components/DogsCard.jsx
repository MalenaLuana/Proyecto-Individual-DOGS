import React from "react";
import style from '../css/DogCard.module.css'


export default function DogsCard ({name,image,weightMin,weightMax,temperament}){

    return (
      <div className={style.container}>
          <h1>perros</h1>
           <h1>{name}</h1>
           <img src={image} alt='Dogs' />
           <h3>{'Weight:' + weightMin+'-'+weightMax}</h3>
        
          
       
      </div>  
    )
}