import React from "react";
import { Link } from "react-router-dom";
import style from '../css/Landing.module.css'


export default function Landing(){

    return (
        <div className={style.container}>
            <div className={style.content}>
            <h3 className={style.subtitle}>Welcome to</h3>
            <h1 className={style.title}>Breeds</h1>
            
            <Link to='/home'>
                     <button className={style.btn}>Lets go!</button>
            </Link>
            </div>
        </div>
    )
}