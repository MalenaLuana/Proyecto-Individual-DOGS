import React from "react";
import style from '../css/DogCard.module.css'


export default function DogsCard ({name,image,weightMin,weightMax,temperament}){

    return (
      <div className={style.container}>
          <div  className={style.imagen}>
           <img src={image} alt='Dogs' /> 
          
          </div>

           <div className={style.info}>
           <h1 className={style.name}>{name.toUpperCase()}</h1>
            
           <h3 className={style.weight}>{'Weight: ' + weightMin+'-'+weightMax+' kg'}</h3>
         
           <h3 className={style.temperament}>Temperament: 
            {
              temperament && temperament.map(e=>{
                return '-'+e+' '
              })
            }
           </h3>
          
           </div>
      </div>  
    )
}