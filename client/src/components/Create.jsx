import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as actions from '../redux/actions'
import style from '../css/Create.module.css'


export default function Create() {



    const dispatch = useDispatch()
    const temperaments = useSelector((state) => state.temperaments)
    const dogs = useSelector((state)=>state.dogs)

    temperaments.sort((a, b) => {
        if (a.name < b.name) {
            return -1
        }
        if (a.name > b.name) {
            return 1
        }
        return 0
    })

    //-************************************

    const [input, setInput] = useState({
        name: "",
        image: "",
        weightMin: "",
        weightMax: "",
        heightMin: "",
        heightMax: "",
        life_span: "",
        temperament: []
    })


    useEffect(() => {
        if (temperaments.length === 0) {
            dispatch(actions.getTemperaments())
        }
    }, [])

/*----VALIDACIONES----*/

    const [error,serError] = useState(true)

    const HandleError = (input)=>{
    let keep = {}

            //-----name-------
    let regexName = new RegExp('^[a-zA-Z ]{2,30}$')

    if(input.name.length > 0 && !regexName.test(input.name)) keep.name= 'The name contains invalid characters.'
   
 
           //-----height-------
    if(input.heightMin.length > 0)  {
     if  (!(input.heightMin*1 > 0 && input.heightMin*1 < 201 && Number.isInteger(input.heightMin*1)))  keep.heightMin= 'The height value cannot be negative or zero';
     } 
     if (input.heightMin.length > 0 && input.heightMax.length > 0 ){
        if(!(input.heightMin*1 < input.heightMax*1 )) keep.heightCompare = 'The minimum value cannot be greater or equal than the maximum'
     }
    if (input.heightMax.length >0){
        if(!(input.heightMax*1>0 && input.heightMax*1 < 201 && Number.isInteger(input.heightMax*1)))  keep.heightMax= 'The height value cannot be negative or zero'
    }
    
         //---weight-----------
    if(input.weightMin.length > 0)  {
       if  (!(input.weightMin*1 > 0 && input.weightMin*1 < 101 && Number.isInteger(input.weightMin*1)))  keep.weightMin= 'Try a range betwen 1kg and 100 kg';
       } 
       if (input.weightMin.length > 0 && input.weightMax.length > 0 ){
          if(!(input.weightMin*1 < input.weightMax*1 )) keep.weightCompare = 'The minimum value cannot be greater or equal than the maximum'
       }
      if (input.weightMax.length >0){
          if(!(input.weightMax*1>0 && input.weightMax*1 < 101 && Number.isInteger(input.weightMax*1)))  keep.weightMax= 'Try a range betwenn 1 kg and 100 kg'
      }
        //----life span--------

        if(input.life_span.length > 0)  {
            if  (!(input.life_span*1 > 0 && input.life_span*1 < 201 && Number.isInteger(input.life_span*1)))  keep.life_span= 'The life span value cannot be negative or zero';
            } 

     return keep
    }




/*----Manejo de cambios-----*/
    const handleChange = (e) => {

        serError(HandleError({...input,[e.target.name]:e.target.value}))

        setInput({
            ...input,
            [e.target.name]: e.target.value
        })

    }

    const handleSelect = (e) => {
        let selectedTemp = e.target.value
        if (!input.temperament.includes(selectedTemp) && input.temperament.length < 5) {
            setInput({
                ...input,
                temperament: [...input.temperament, e.target.value]
            })
        }

    }

    function handleClean(e) {
        e.preventDefault()
        setInput({
            ...input,
            temperament: input.temperament.filter(el => el !== e.target.value)
        })
        console.log(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const names= dogs.map(e=>e.name)
        console.log(names)
        if(input.name === '' || input.life_span === '' || input.heightMin==='' || input.heightMax ==='' || input.weightMax===''||input.weightMin===''|| input.temperament.length === 0 || input.image ===''){
            alert('All the fields must be completed!')
        }else if(error.name || error.life_span|| error.heightMin|| error.heightMax ||error.heightCompare ||error.weightCompare || error.weightMin  || error.weightMax || error.image || error.life_span){
            alert('Please review the form!')
        }else if(names.includes(input.name)){
            alert('That breed already exists')
        } else {     dispatch(actions.postDogs(input))
            setInput({
                name: "",
                image: "",
                weightMin: "",
                weightMax: "",
                heightMin: "",
                heightMax: "",
                life_span: "",
                temperament: []
    
            })
            alert('We have a new dog breed!')}

   
    }





    return (
        <div className={style.container}>
            <div className={style.head}>
            <Link to='/home' >
                <button className={style.btn}>GO BACK</button>
            </Link>
            </div>
          
            <div className={style.formMain}>
            <form className={style.form} onSubmit={e => handleSubmit(e)}>
                <div className={style.nameImg}>
                    <div>
                <label>NAME:</label>
                <input type="text" name="name" value={input.name} onChange={(e) => handleChange(e)} />
              </div>
              <div className={style.image}>
                <label>IMAGE:</label>
                <input type="text" name="image" value={input.image} placeholder='url...' onChange={(e) => handleChange(e)} />
                
              
                </div>
                </div>
                <span className={style.nameErr}> {error.name && (<label>{error.name}</label>)} <br /></span>
               
                <div className={style.weight}>
                <label>WEIGHT:</label>
                <input placeholder="MIN" className={style.uno} type="text" name="weightMin" value={input.weightMin} onChange={(e) => handleChange(e)} />
               <p>-</p>
                <input placeholder="MAX" className={style.dos} type="text" name="weightMax" value={input.weightMax} onChange={(e) => handleChange(e)} />
                <h4>Kg</h4>
                <div className={style.weightErr}>
               
                </div> 
                </div> 
                <div className={style.weightErr}>
                <span> {error.weightMin && (<label>{error.weightMin}</label>)} <br /></span> 
                <span> {error.weightMax && (<label>{error.weightMax}</label>)}<br /> </span> 
                <span> {error.weightCompare  && (<label>{error.weightCompare}</label>)}<br /></span> 
               </div>
                 <div className={style.height}>
                <label>HEIGHT:</label>
                <input placeholder="MIN" className={style.uno} type="text" name="heightMin" value={input.heightMin} onChange={(e) => handleChange(e)} />
                 <p>-</p>
                <input placeholder="MAX" className={style.dos} type="text" name="heightMax" value={input.heightMax} onChange={(e) => handleChange(e)} />
                <h4>Cm</h4>
                <div className={style.heightErr}>
                
                </div> </div>

                <div className={style.heightErr}>
                <span> {error.heightMin && (<label>{error.heightMin}</label>)} <br /></span> 
                <span > {error.heightMax && (<label>{error.heightMax}</label>)} </span> 
                <span > {error.heightCompare  && (<label>{error.heightCompare }</label>)} </span> 
                </div>
                <div className={style.life}>
                <label>LIFE SPAN:</label>
                <input type="text" name="life_span" value={input.life_span} onChange={(e) => handleChange(e)} /><p>years</p>
                
                </div>
                <span className={style.nameErr}> {error.life_span && (<label>{error.life_span}</label>)}<br /> </span>
                <div className={style.tempDiv}>
                <div className={style.temp}>
                    <select name="temperaments" value={input.temperament} onChange={e => handleSelect(e)} >
                        <option value="select">Select...</option>
                        {
                            temperaments && temperaments.map(e => {
                                return (
                                    <option key={e.name} value={e.name}>{e.name.toUpperCase()}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <div className={style.tempBox}>   {input.temperament.map(tempMapeo => {
                    return (
                        <div>
                            <span>{tempMapeo}</span><button type="button" value={tempMapeo} onClick={(e) => handleClean(e)}>x</button> <br />
                        </div>
                    )
                })}
                </div>
                </div>

                <button className={style.createBtn} type="submit">CREATE</button>




            </form>
            </div>
        </div>
    )



}