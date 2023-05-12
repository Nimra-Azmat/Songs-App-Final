import React,{  useContext } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Text, 
  Flex,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { TbReportSearch } from "react-icons/tb";
import AuthContext from "../context/AuthContext";

import { useMediaQuery } from '@chakra-ui/media-query';

export default function Album() {

  let {artistName,setArtistName,handleAlbumSearch,isLoading,error,albums}=useContext(AuthContext)
  const [isNotSmallerScreen] = useMediaQuery("(min-width:600px)");

  return (
  <>
   <Flex direction={isNotSmallerScreen ? "row" : "column"}
        spacing="100px" p={isNotSmallerScreen ? "10" : "0"}
        alignSelf="flex-start">
    
    
    <Box w={'100%'}  mx='auto'>
      <Heading fontSize="3xl" fontWeight="bold"  textAlign= "center" bgGradient="linear(to-r,  purple.300, green.500)" bgClip='text'  >Album</Heading>
      <FormControl id="artistName">
          <FormLabel fontWeight="extrabold" bgGradient="linear(to-r,  purple.300, green.500)" bgClip='text'>Artist Name</FormLabel>
          <Input
            type="text"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
          />
        </FormControl>

        <Flex align="center" justify='center' direction={isNotSmallerScreen ? "row" : "column"}
        spacing="100px" p={isNotSmallerScreen ? "10" : "0"}>
          <Button  mt={4} onClick={handleAlbumSearch} isLoading={isLoading} leftIcon={<TbReportSearch />} colorScheme='purple' variant='outline'>
            Search
          </Button></Flex>
      {/* Table */}
                <Table variant='simple'>
                    <Thead>
                    <Tr>
                        <Th>Artist ID</Th>
                        <Th>Album ID</Th>
                        <Th>Album</Th>
                    </Tr>
                    </Thead> 
            <Tbody>
              {albums?.map((album) => (
                  <Tr key={album.id} >
                      <Td>{album.artist_ids}</Td>
                      <Td>{album.album_id}</Td>
                      <Td>{album.album}</Td>
                     </Tr> 
              ))}
            </Tbody>
                </Table>
        {error && <Text color="red.500">{error}</Text>}
    </Box>
    </Flex>
    </>
  );
}

