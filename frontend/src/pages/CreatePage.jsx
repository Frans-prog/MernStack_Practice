import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";

import React, { useState } from "react";
import { useCarStore } from "../store/car";

const CreatePage = () => {
  const [newCar, setNewCar] = useState({
    name: "",
    price: "",
    image: "",
  });

  const toast = useToast()


  const { createCar } = useCarStore()
  const handleAddCar = async() => {
     const {success, message} = await createCar(newCar)
     if(!success) {
      toast({
        title : 'Error',
        description: message,
        status: 'error',
        duration: 5000,
        isClosable: true
      })
     }else{
      toast({
        title: 'Success',
        description: message,
        status: 'success',
        isClosable: true,
        duration: 5000,

      })
     }
     setNewCar({ name: "", price: "", image: ""})
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create new Car
        </Heading>

        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Car name"
              name="name"
              value={newCar.name}
              onChange={(e) => setNewCar({ ...newCar, name: e.target.value })}
            />
            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={newCar.price}
              onChange={(e) => setNewCar({ ...newCar, price: e.target.value })}
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={newCar.image}
              onChange={(e) => setNewCar({ ...newCar, image: e.target.value })}
            />
            <Button colorScheme="blue" onClick={handleAddCar} w="full">
              Add Car
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
