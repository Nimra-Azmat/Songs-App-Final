import React from 'react'
import { useMediaQuery } from '@chakra-ui/media-query';
import { Flex,  Text,  Button,Spacer,Box} from '@chakra-ui/react';
import {useColorMode} from "@chakra-ui/color-mode";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { SlCursor } from "react-icons/sl";
import { Link } from "react-router-dom";

function Profile() {

    let {user,logoutUser}= useContext(AuthContext)
    const { colorMode }= useColorMode();
    const isDark = colorMode === "dark";
    const [isNotSmallerScreen] = useMediaQuery("(min-width:600px)");

    return (
    <>
        <Flex direction={isNotSmallerScreen ? "row" : "column"}
        spacing="150px" p={isNotSmallerScreen ? "32" : "0"}
        alignSelf="flex-start">
        <Box w={'100%'}  mx='auto'>
        <Text color={isDark ? "gray.200" : "gray.800"} height='20vh' textAlign= "center" >Welcome to our music app, powered by the Spotify dataset. 
            Discover new artists, browse their albums, and enjoy their top songs all in one place.
            Our dashboard provides an easy-to-use interface for you to explore and discover your next favorite artist. 
            With a vast collection of songs and albums, you can curate your own personalized playlists and share them with your friends.🗣</Text>
       <Spacer/>
        <Flex direction={isNotSmallerScreen ? "row" : "column"}
        spacing="150px" p={isNotSmallerScreen ? "32" : "0"}
        alignSelf="flex-start" align="center" justify='center'>
            {user ? (
                <Button onClick={logoutUser} leftIcon={<SlCursor />} colorScheme='purple' variant='outline'>Logout</Button>
            ):(
                <Button as={Link} to="/Login" leftIcon={<SlCursor />} ccolorScheme='purple'  variant='outline'>Login</Button>
                )} </Flex></Box>
        {/* <Circle position="absolute" bg="blue.100" opacity="0.1"
        w="300px" h="800px" alignSelf="flex-end" /> */}
    </Flex>
    
    </>
    )
}

export default Profile