const { Temperaments } = require("../db")
const {YOUR_API_KEY} = process.env
const axios = require('axios')

const getTemperaments = async ()=>{

    const apiData= await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)

   
    const temperament = apiData.data.map(el=> el.temperament).join(", ").split(", ") 



   temperament.map(el=> {
    if(el.length){
       Temperaments.findOrCreate ({
           where:{name: el}
   })}});
    
    const dogTemperament = await Temperaments.findAll();
    return dogTemperament
}

module.exports={getTemperaments}