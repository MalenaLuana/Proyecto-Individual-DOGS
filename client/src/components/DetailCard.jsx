import React from "react";
import style from '../css/Details.module.css'

export default function DetailCard({name,img,temperament,weightMin,weightMax,heightMin,heightMax,life_span}){


return (
    <div className={style.cards}>
        
      
        <h3 className={style.name}>{'- '+name+' -'}</h3>
        <img className={style.image} src={img} alt={name} />
      
        <h3 className={style.info}>{'WEIGHT: '+weightMin+'-'+weightMax+' Kg'}</h3>
        <h3 className={style.info}>{'HEIGHT: '+heightMin+'-'+heightMax+' Cm'}</h3>
        <h3 className={style.info}>{'LIFE SPAN:'+life_span}</h3>
        <h4 className={style.info}>{temperament.map(e=>{return '-'+ e.toUpperCase()+" "})}</h4>
    </div>
)

}