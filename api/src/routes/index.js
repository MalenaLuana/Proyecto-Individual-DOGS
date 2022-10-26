const { Router } = require('express');
const {getAllDogs,createDog} = require('../controllers/Dogs');
const { Temperaments,Dog } = require("../db")
const { getTemperaments } = require('../controllers/Temperament');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs', async (req,res)=>{
    let name = req.query.name
    let data = await getAllDogs(name)
   /* let filterData= await data.map(el=>{
        return {
            id:el.id,
            img:el.img,
            name:el.name,
            temperament:el.temperament,
            weightMin:el.weightMin,
            weightMax:el.weightMax
        }
    }) */

    try {
        res.send(data)
    } catch (error) {
        res.send(error.message)
    }
})

//---------BY ID
router.get('/dogs/:id', async(req,res)=>{
    const {id}=req.params
    const allDogs= await getAllDogs()
    const dogsByID = await allDogs.filter(el=>el.id==id)

    try {
        res.status(200).send(await dogsByID)
    } catch (error) {
        res.status(400).send(error.message)
    }
})
//--------- TEMPERAMENTOS 
router.get('/temperaments', async(req,res)=>{
 const temperament = await getTemperaments()
 
 res.send(temperament)
})

//-------- CREAR DOGS

router.post('/dogs', async (req,res)=>{
  const {name,image, weightMin, weightMax,heightMin,heightMax,temperament,life_span}=req.body  
  if (!name || !image || !weightMin || !weightMax|| !heightMin|| !heightMax || !temperament || !life_span) return res.status(404).send('Error: All fields must be completed!');

try{

 const post = await createDog(req.body)
res.status(200).send('We have a new dog!')
} catch (error){
    res.send(error.message)
}   
 
})
module.exports = router;
