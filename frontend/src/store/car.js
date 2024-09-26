import { create } from 'zustand'

export const useCarStore = create ((set) => ({
    cars:[],
    setCars: (cars) => set({ cars }),
    createCar: async (newCar) => {
        if (!newCar.name || !newCar.image || !newCar.price) {
            return { success: false ,message: "Please fill in all fields."}

        }

        const res = await fetch("/api/cars",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCar)

        })

        const data = await res.json()
        set((state) => ({cars: [ ...state.cars, data.data]}))
        return {success: true ,message: "Car created successfully."}
    },
    fetchCars: async () => {
        const res = await fetch('/api/cars')
        const data = await res.json()
        set({ cars: data.data})
    },
    deleteCar: async (pid) => {
        const res = await fetch(`/api/cars/${pid}`, {
            method: 'DELETE',
        
        })
         
        const data = await res.json()
        if(!data.success) return { success: false , message: data.message}

        set(state => ({ cars: state.cars.filter(car => car._id !== pid)}))
        return { success: true, message: data.message }
    },
    updateCar: async (pid, updatedCar) => {
        const res = await fetch(`/api/cars/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(updatedCar),

        })
        const data = await res.json()
        if (!data.success) return { success: false, message: data.message}


        set((state) => ({
            cars: state.cars.map((car) => (car._id === pid ? data.data : car)),

        }))
        return  { success: true , message: data.message}
    },
}))