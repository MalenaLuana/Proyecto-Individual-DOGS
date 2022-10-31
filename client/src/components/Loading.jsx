import React from "react";
import style from '../css/Loading.module.css'

export default function Loading(){
    return(
        <div className={style.loading}>
           <img className={style.loadGif} src="https://www.makai.com.gt/img/loading.gif" alt="" />
        </div>
    )
}