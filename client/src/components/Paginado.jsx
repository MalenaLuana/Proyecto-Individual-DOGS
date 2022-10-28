import React, { Fragment } from "react";

export default function Paginado ({dogs,dogsxPage,paginado}){

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
                            <Fragment>
                                <li>
                                    <a onClick={()=>paginado(el)}>{el}</a>

                                </li>
                            </Fragment>
                        )
                    })
                }
            </ul>
        </div>
    )
}