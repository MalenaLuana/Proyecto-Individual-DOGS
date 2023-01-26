import React,{useEffect} from "react";
import {useDispatch,useSelector} from 'react-redux'
import * as actions from '../redux/actions'
import { Link } from "react-router-dom";
import style from '../css/Details.module.css'
import DetailCard from "./DetailCard";
import Loading from "./Loading"

export default function Details(props){

     const params = props.match.params.id
     const dispatch=useDispatch()

     const details= useSelector((state)=>state.dogDetail)
     const loading = useSelector((state)=>state.loading)

     useEffect(()=>{
      
        dispatch(actions.dogDetails(params))
        
        dispatch(actions.setDetails([]))
        
     },[dispatch,params])
    

    return (
        <div className={style.container}>
            <div className={style.head}>
            <Link to='/home'>
            <button className={style.backBtn}>GO BACK</button>
            </Link>
            </div>
            <div className={style.decoration}></div>

            <div className={style.cardCont}>
            { loading? (
					<Loading />
				):
                details && details.map(e=>{
                    return (
                        <DetailCard
                        name={e.name}
                        img={e.image}
                        temperament={e.temperament}
                        weightMin={e.weightMin}
                        weightMax={e.weightMax}
                        heightMin={e.heightMin}
                        heightMax={e.heightMax}
                        life_span={e.life_span}
                        />
                    )
                })
            }
            </div>
        </div>
    )
}