import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as actions from '../redux/actions'

import Nav from "./Nav";

export default function Create() {

    const dispatch = useDispatch()
    const temperaments = useSelector((state) => state.temperaments)

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


    const handleChange = (e) => {
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
        console.log(input)
        dispatch(actions.postDogs(input))
        alert('We have a new dog breed!')
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
    }

    return (
        <div>
            <Link to='/home'>
                <button>GO BACK</button>
            </Link>
            <form onSubmit={e => handleSubmit(e)}>
                <label>NAME:</label>
                <input type="text" name="name" value={input.name} onChange={(e) => handleChange(e)} />

                <label>IMAGE:</label>
                <input type="text" name="image" value={input.image} onChange={(e) => handleChange(e)} />

                <label>WEIGHT:</label>
                <input type="text" name="weightMin" value={input.weightMin} onChange={(e) => handleChange(e)} />
                <input type="text" name="weightMax" value={input.weightMax} onChange={(e) => handleChange(e)} />

                <label>HEIGHT:</label>
                <input type="text" name="heightMin" value={input.heightMin} onChange={(e) => handleChange(e)} />
                <input type="text" name="heightMax" value={input.heightMax} onChange={(e) => handleChange(e)} />

                <label>LIFE SPAN:</label>
                <input type="text" name="life_span" value={input.life_span} onChange={(e) => handleChange(e)} />

                <div>
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

                <div>   {input.temperament.map(tempMapeo => {
                    return (
                        <>
                            <span>{tempMapeo}</span><button type="button" value={tempMapeo} onClick={(e) => handleClean(e)}>x</button> <br />
                        </>
                    )
                })}

                </div>

                <button type="submit">CREATE</button>




            </form>
        </div>
    )



}