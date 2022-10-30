import React,{useEffect} from "react";
import {useDispatch,useSelector} from 'react-redux'
import * as actions from '../redux/actions'
import { Link } from "react-router-dom";

import DetailCard from "./DetailCard";

export default function Details(props){

     const params = props.match.params.id
     const dispatch=useDispatch()

     const details= useSelector((state)=>state.dogDetail)


     useEffect(()=>{
      
        dispatch(actions.dogDetails(params))
        
        dispatch(actions.setDetails([]))
        
     },[dispatch])
    

    return (
        <div>
            <Link to='/home'>
            <button>BACK</button>
            </Link>
            {
                details && details.map(e=>{
                    return (
                        <DetailCard
                        name={e.name}
                        img={e.img}
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
    )
}