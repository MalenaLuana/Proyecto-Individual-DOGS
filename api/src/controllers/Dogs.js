const {YOUR_API_KEY} = process.env
const {Dog,Temperaments} = require('../db')

const axios = require('axios')

//Dogs de la api

const getApiDogs= async ()=>{

    const api = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`) 
    let data= await api.data.map(el=>{

        let [weightMin, weightMax] = el.weight.metric.split("-")
        let [heightMin, heightMax] = el.height.metric.split("-")
        let temperament = el.hasOwnProperty("temperament")
				? el.temperament.split(/\s*(?:,|$)\s*/)
				: ""

        return {
            id:el.id,
            name:el.name,
            image:el.image.url,
            temperament:temperament,
            weightMin: Number(weightMin),
			weightMax: Number(weightMax),
            heightMin: Number(heightMin),
			heightMax: Number(heightMax),
            height:el.height.metric,
            life_span:el.life_span,
            createdInDB:false
        }
    })
    

    try {
        return await data 
    } catch (error) {
       return error.message
    }
}

//Dogs de la BD 

const getDBDogs = async()=>{

    const dbDogs = await Dog.findAll({
        include:{
            model:Temperaments,
            atributes:['name'],
            through:{
                atributes:[]
            }
        }
    })
    
    const dogsData = await dbDogs.map(d=>d.dataValues)
    const allDbDogs = await dogsData.map(el=>{
        console.log(el.temperaments)
        return {
            id:el.id,
            name:el.name,
            image:el.image,
            weightMin:el.weightMin,
            weightMax:el.weightMax,
            heightMin:el.heightMin,
            heightMax:el.heightMax,
            life_span:el.life_span,
            temperament:el.temperaments?.map(m => m.name),
            createdInDB:el.createdInDB
        }
    })
       
       
    
    console.log(allDbDogs)
    return await allDbDogs
}

//Todos 

const getAllDogs = async (name)=>{


const apiDogs = await getApiDogs()
const dbDogs = await getDBDogs()
const allDogs = dbDogs.concat(apiDogs)

if(name){
    const dogsByName = await allDogs.filter(el => el.name.toLowerCase() == name.toLowerCase())
    return dogsByName
}
return await allDogs

}


const createDog = async ({name,image, heightMin,heightMax,weightMin,weightMax,life_span,temperament})=>{

    name = name.charAt(0).toUpperCase() + name.slice(1)
  
    const newDog = await Dog.create({
        name,
        image,
        weightMin,
        weightMax,
        heightMin,
        heightMax,
        life_span
    })

    let temperamentTable = await Temperaments.findAll({ where: { name: temperament } });
    console.log(temperamentTable)
    newDog.addTemperaments(temperamentTable)
    
}

module.exports= {
    getAllDogs,
    createDog
}