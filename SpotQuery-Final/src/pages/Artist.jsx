import { Flex,  Spacer, Text, Box, Button, Stack } from "@chakra-ui/react";
import React,{ useContext } from "react";
import { TiArrowRightOutline, TiArrowLeftOutline } from "react-icons/ti";
import AuthContext from "../context/AuthContext";

export default function Artist() {

  let {uniqueArtists,handleNextPage,handlePreviousPage,previousPage,nextPage}=useContext(AuthContext)

  return (

    <>
     <Box w={'100%'}  mx='auto'>
  <Text fontSize="3xl" fontWeight="extrabold"  textAlign= "center" bgGradient="linear(to-r,  purple.300, green.500)" bgClip='text'  >Artists
  </Text>
  <Flex align="center" justify='center'>
    <Box fontWeight='semibold'
        letterSpacing='wide'
        textTransform='sentancecase'
        height='300px' width='150px' > 
        <ul>
        {uniqueArtists.map((value, index) => (
          <li key={index}>
            {value}
          </li>
        ))}</ul>  </Box>
     </Flex>    

    <Spacer /> 
    <Flex align="center" justify='center'>
    <Stack mt={4} direction='row' spacing={4} align='center'>
      <Button  disabled={!previousPage} onClick={handlePreviousPage} leftIcon={<TiArrowLeftOutline />} colorScheme='purple' variant='outline'>
        Previous
      </Button>
      <Button  disabled={!nextPage} onClick={handleNextPage} rightIcon={<TiArrowRightOutline />} colorScheme='purple' variant='outline'>
        Next
      </Button>
    </Stack>
    </Flex>
    </Box>
    </> 
  )
}
