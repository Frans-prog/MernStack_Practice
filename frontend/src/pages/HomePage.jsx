import { VStack, Container, Text, SimpleGrid, } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useCarStore } from '../store/car'
import CarCard from '../components/CarCard.jsx'

const HomePage = () => {

  const { fetchCars , cars} = useCarStore()
  useEffect(() => {
    fetchCars()
  }, [fetchCars])
  console.log('cars' , cars)

  return (
    <Container maxW='container.xl' py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={'30'}
          fontWeight={'bold'}
          bgGradient={'linear(to-r, cyan.400, blue.500)'}
          bgClip={'text'}
          textAlign={'center'}>Current Cars 🚘
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            md : 2,
            lg: 3,
          }}
          spacing={10}
          width={'full'}
          >
            {cars.map((car) => (
              <CarCard key= {car._id} car = { car }/>
            ))}
        </SimpleGrid>

        {cars.length === 0 && (
          <Text fontSize='xl' textAlign={'center'} fontWeight={'bold'} color={'gray.500'}>
          No Cars found 😔{" "}
          <Link to= {'/create'}>
            <Text as='span' color={'blue.500'} _hover={{ textDecoration: 'underline'}}> Create a Car
            </Text>
          </Link>
        </Text>
        )}
      </VStack>
    </Container>
  )
}

export default HomePage
