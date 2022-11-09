import React, { Fragment } from "react";
import style from '../css/Paginado.module.css'

export default function Paginado ({dogs,dogsxPage,paginado,page}){

    const amountPages = []
    for (let i=1; i<=Math.ceil(dogs/dogsxPage);i++){
        amountPages.push(i)
    }

    return (
        <div>
            <ul>
                {
                    amountPages.map(el=>{
                        return (
                            
                                <li className={style.cont}>
                                    <button className={el === page? style.actual : style.list} onClick={()=>paginado(el)}>{el}</button>

                                </li>
                               
                            
                        )
                    })
                }
            </ul>
        </div>
    )
}