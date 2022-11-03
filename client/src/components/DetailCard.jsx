import React from "react";
import style from '../css/Details.module.css'

export default function DetailCard({name,img,temperament,weightMin,weightMax,heightMin,heightMax,life_span}){


return (
    <div className={style.cards}>
        
        <div className={style.left}> 
         <div className={style.image} >
         <h3 className={style.name}>{'- '+name+' -'}</h3>
      
        <img src={img} alt={name} />
       </div>
        </div>
        <div className={style.right}>
        <div className={style.info}>
        <h3>{'WEIGHT: '+weightMin+'-'+weightMax+' Kg'}</h3>
        </div>
        <div className={style.info}>
        <h3 >{'HEIGHT: '+heightMin+'-'+heightMax+' Cm'}</h3>
        </div>
        <div className={style.info}>
        <h3>{'LIFE SPAN:'+life_span}</h3>
        </div>
        <div className={style.info}>
        <h4>{temperament?.map(e=>{return '-'+ e.toUpperCase()+" "})}</h4>
        </div>
         </div> 
   </div>
)

}