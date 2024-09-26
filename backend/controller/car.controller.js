import Car from "../models/product.cars.js"
import mongoose from "mongoose"

export const getCars = async (req, res) => {
    try {
        const cars = await Car.find({})
        res.status(200).json ({ success: true, data: cars})
    } catch (error) {
        console.log ('error in fetching cars', error.message)
        res.status(500).json({ success: false, mesasage: 'Server Error'})        
    }
}

export const createCar = async (req,res) =>{
    const car = req.body;


    if (!car.name || !car.price || !car.image){
        return res.status(400).json({success: false, message: 'please fill in all fields.'})
    }

    const newCar = new Car(car)
    try {
        await newCar.save()
        res.status(201).json({success: true ,data: newCar})
    } catch (error) {
        console.error('Error in CREATE product', error.message)
        res.status(500).json({success: false, message: 'Server Error'})
    }
}

export const updateCar = async (req, res) => {

    const { id } = req.params
    const cars = req.body

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: 'Invalid Car Id'})

    }

    try {
        const updatedCar = await Car.findByIdAndUpdate(id, cars,{new: true})
        res.status(200).json({ success: true , data: updatedCar })

    } catch (error) {
        res.status(500).json({ success: false , mesasage: 'Server Error.'})

    }
}

export const deleteCar = async (req, res) => {
    const {id} = req.params
    console.log('id:' ,id)

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: 'Invalid Car Id'})

    }
    try {
        await Car.findByIdAndDelete(id)
        res.status(200).json ({success: true, message: 'Car deleted.'})

    } catch (error) {
        console.log('error in deleting cars:', error.message)
        res.status(500).json ({ success: false, message: 'Server Error.'})
        
    }
}