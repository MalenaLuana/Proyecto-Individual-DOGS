import React from "react";
import { Link } from "react-router-dom";
import style from '../css/Landing.module.css'

//---------images---------
import misc1 from '../css/images/misc1.png'
import misc2 from '../css/images/misc2.png'
import misc3 from '../css/images/misc3.png'
import misc4 from '../css/images/misc4.png'
import doogfood from '../css/images/dogfood.png'
//------------------------

export default function Landing(){

    return (
        <div className={style.container}>

            <div className={style.content}> 
            <img src={doogfood} alt="" />
            <div className={style.maintitle}>
            <h3 className={style.subtitle}>Welcome to</h3>
            <h1 className={style.title}>Breeds</h1>
            </div>
            <Link to='/home'>
                     <button className={style.btn}>Lets go!</button>
            </Link>
            </div>
            <div className={style.back}>
                 <img src={misc1} alt="" />
                 <img src={misc2} alt="" />
                 <img src={misc3} alt="" />
                 <img src={misc4} alt="" />
            </div>
        </div>
    )
}