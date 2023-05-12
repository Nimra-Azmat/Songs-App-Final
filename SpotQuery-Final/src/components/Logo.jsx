import React from "react";
import { HStack, Text } from "@chakra-ui/react";
import {useColorMode} from "@chakra-ui/color-mode";
import { Flex} from '@chakra-ui/layout';
import { IconButton, Spacer } from "@chakra-ui/react";
import {SunIcon, MoonIcon} from '@chakra-ui/icons';
// import { FaSun, FaMoon } from 'react-icons/fa';
// import { useMediaQuery } from '@chakra-ui/media-query';


export default function Logo(props) {
    const { colorMode, toggleColorMode }= useColorMode();
    const isDark = colorMode === "dark";
    // const [isNotSmallerScreen] = useMediaQuery("(min-width:600px)");
    return (
      <>
      <Flex w='100%'>
          <Spacer/>
          <IconButton icon={isDark ?<SunIcon color="yellow"/> : <MoonIcon color="gray"/>}  onClick={toggleColorMode}/>
        </Flex> 
        <HStack>
            <Text fontSize="3xl" fontWeight="bold" bgGradient="linear(to-r, blue.400, purple.500)" bgClip='text' >Spot Query</Text>
         </HStack>
    </>
  );
}