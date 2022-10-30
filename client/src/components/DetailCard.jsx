import React from "react";


export default function DetailCard({name,img,temperament,weightMin,weightMax,heightMin,heightMax,life_span}){


return (
    <div>
        <h3>{name.toUpperCase()}</h3>
        <img src={img} alt={name} />
        <h4>TEMPERAMENT: {temperament.map(e=>{return e.toUpperCase()+" "})}</h4>
        <h3>{'WEIGHT:'+weightMin+'-'+weightMax+' Kg'}</h3>
        <h3>{'HEIGHT:'+heightMin+'-'+heightMax+' Cm'}</h3>
        <h3>{'LIFE SPAN:'+life_span}</h3>
    </div>
)

}