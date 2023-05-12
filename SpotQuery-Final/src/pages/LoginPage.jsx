import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading
} from '@chakra-ui/react';
import { IoMdLogIn } from "react-icons/io";
import {useColorModeValue} from "@chakra-ui/color-mode";
const LoginPage = () => {

    let {loginUser}=useContext(AuthContext)
    const formBackground = useColorModeValue('gray.100', 'gray.700');
    return (
    <>
      <Flex
        flexDirection="column"
        bg={formBackground}
        p={12}
        borderRadius={8}
        boxShadow="lg">
    <Heading fontSize="3xl" fontWeight="bold"  textAlign= "center" bgGradient="linear(to-r,  purple.300, green.500)" bgClip='text'  >Log In</Heading>
        <form onSubmit ={loginUser}>
        <FormControl id="username" isRequired>
        <FormLabel fontWeight="extrabold" bgGradient="linear(to-r,  purple.300, green.500)" bgClip="text">Username</FormLabel>
            <Input type="text" name="username" placeholder="Enter Username" />
         </FormControl>
        <FormControl  id="password" isRequired>
        <FormLabel fontWeight="extrabold" bgGradient="linear(to-r,  purple.300, green.500)" bgClip="text">Password</FormLabel></FormControl>
        <Input type="password" name="password" placeholder="Enter Password" />
        <Flex align="center" justify='center'>
        <Button type="submit" leftIcon={<IoMdLogIn />} colorScheme='purple' variant='outline' mt={8}>
          Log In
        </Button></Flex>
        </form>
      </Flex>
     </>
    )}

export default LoginPage

