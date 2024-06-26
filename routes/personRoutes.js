import express from 'express'
const router = express.Router()
import Person from '../models/Person.js'




router.post('/', async (req, res)=>{

    //req.body
    const {name, salary, approved} = req.body

    if(!name){
         res.status(422).json({error: 'o nome é obrigatório'})
         return
    }
    const person = {
        name,
        salary,
        approved
    }

    try{
        await Person.create(person)
        res.status(201).json({message: 'pessoa inserida no sistema com sucesso'})
    }catch(error){
        res.status(500).json({error: error})
    }
})

router.get('/', async (req, res)=>{

    try {
        
        const people = await Person.find()

        res.status(200).json(people)

    } catch (error) {
        res.status(500).json({error: error})
    }

})

router.get('/:id', async (req, res)=>{
    const id = req.params.id
    try {
        const people = await Person.findOne({_id: id})
        
        if(!people){
            res.status(224).json({message: 'usuário não encontrado'})
            return
        }

        res.status(200).json(people)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.patch('/:id', async (req, res)=>{
    const id = req.params.id

    const {name, salary, approved} = req.body

    const person = {
          name,
          salary,
          approved  
    }

    try {
        const updatePerson = await Person.updateOne({_id: id}, person)

        console.log(updatePerson)

        if(updatePerson.matchedCount === 0){
            res.status(442).json({message: 'usuário não encontrado'})
            return
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.delete('/:id', async (req, res)=>{
    const id = req.params.id

    const person = await Person.findOne({_id: id})

    if(!person){
        res.status(442).json({message: 'usuário não encontrado'})
        return
    }

   try {
    await Person.deleteOne({_id: id})

    res.status(200).json({message: 'usuario removido com sucesso'})
   } catch (error) {
    
   }
})


export default router;