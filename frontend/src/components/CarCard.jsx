import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useCarStore } from "../store/car.js";
import { useState } from "react";


const CarCard = ({ car }) => {
  const [updatedCar, setUpdatedCar] = useState(car);

  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const { deleteCar , updateCar } = useCarStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure(); // corrected here

  const handleDeleteCar = async (pid) => {
    const { success, message } = await deleteCar(pid);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleUpdateCar = async (pid, updatedCar) => {
    const { success, message } = await updateCar(pid, updatedCar)
    onClose()

    if (!success) {
        toast ({
            title: 'Error',
            description: message,
            status: 'error',
            duration: 5000,
            isClosable: true,

        })
    } else {
        toast({
            title: 'Success',
            description: message,
            status: 'success',
            duration: 5000,
            isClosable: true,
        })
    }
  }

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={car.image}
        alt={car.name}
        h={48}
        w={"full"}
        objectFit={"cover"}
      />
      <Box p={4}>
        <Heading as="h3" size={"md"} mb={2}>
          {car.name}
        </Heading>
        <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
          Php {car.price}
        </Text>

        <HStack spacing={2}>
          <IconButton
            icon={<EditIcon />}
            onClick={onOpen}
            colorScheme="blue"
          />
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDeleteCar(car._id)}
            colorScheme="red"
          />
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Car</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                name="name"
                value={updatedCar.name}
                onChange={(e) => setUpdatedCar ({ ...updatedCar, name: e.target.value})}
              />
              <Input
                placeholder="Price"
                name="price"
                type="number"
                value={updatedCar.price}
                onChange={(e) => setUpdatedCar ({ ...updatedCar, price: e.target.value})}
              />
              <Input
                placeholder="Image URL"
                name="image"
                value={updatedCar.image}
                onChange={(e) => setUpdatedCar ({ ...updatedCar, price: e.target.value})}
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}
                onClick={ () => handleUpdateCar(car._id, updatedCar)}
            >
              Update
            </Button>
            <Button variant={"ghost"} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CarCard;
