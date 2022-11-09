import React from "react";
import style from '../css/Details.module.css'

export default function DetailCard({name,img,temperament,weightMin,weightMax,heightMin,heightMax,life_span}){


return (
    <div className={style.cards}>
        
        <div className={style.left}> 
        <div className={style.name}>
         <h3 >{name}</h3>
        </div>
        <div className={style.image}>
        <img src={img} alt={name} />
       </div>
        </div>
        <div className={style.right}>
        <div className={style.info}>
        <h2>WEIGHT:</h2>
        <h3>{weightMin+'-'+weightMax+' Kg'}</h3>
        </div>
        <div className={style.info}>
        <h2>HEIGHT:</h2>
        <h3 >{heightMin+'-'+heightMax+' Cm'}</h3>
        </div>
        <div className={style.info}>
        <h2>LIFE SPAN:</h2>
        <h3>{life_span}</h3>
        </div>
        <div className={style.info}>
        <h2>TEMPERAMENT:</h2>
        <h3>{temperament?.map(e=>{return  e.toUpperCase()+" "})}</h3>
        </div>
         </div> 
   </div>
)

}