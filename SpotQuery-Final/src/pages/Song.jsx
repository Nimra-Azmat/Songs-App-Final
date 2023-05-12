// import { Container, Heading, Text, Box } from "@chakra-ui/react";
import React,{ useContext } from "react";
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
    TableContainer,
} from "@chakra-ui/react";
import { TbReportSearch } from "react-icons/tb";
import AuthContext from "../context/AuthContext";

import { useMediaQuery } from '@chakra-ui/media-query';

export default function Song() {
  
    let {Song,albumName,setAlbumName,handleSongSearch,isLoading,error}=useContext(AuthContext)
    const [isNotSmallerScreen] = useMediaQuery("(min-width:600px)");

    return (
    <> 
    <Flex direction={isNotSmallerScreen ? "row" : "column"}
         p={isNotSmallerScreen ? "10" : "0"}
        alignSelf="flex-start">
    <Box w={'100%'}  mx='auto'>
      <Heading fontSize="3xl" fontWeight="bold"  textAlign= "center" bgGradient="linear(to-r,  purple.300, green.500)" bgClip='text'>Song</Heading> 
                <FormControl id="albumName">
                    <FormLabel bgGradient="linear(to-r,  purple.300, green.500)" bgClip='text' fontWeight="extrabold">Album Name</FormLabel>
                    <Input
                        type="text"
                        value={albumName}
                        onChange={(e) => setAlbumName(e.target.value)}
                    />
                </FormControl>
                <Flex align="center" justify='center'>
                    <Button
                       mt={4} onClick={handleSongSearch} isLoading={isLoading} leftIcon={<TbReportSearch />} colorScheme='purple' size='md' variant='outline'>
                        Search
                    </Button>
                </Flex>
                         {/* Table */}
              <TableContainer>
                <Table variant='simple'>
                    <Thead>
                    <Tr>
                        <Th>Album ID</Th>
                        <Th>Song ID</Th>
                        <Th>Song Name</Th>
                        <Th>Danceability</Th>
                        <Th>Duration</Th>
                    </Tr>
                    </Thead>
                <Tbody> 
                    {Song.length > 0 && (Song?.map((song) => (
                        <Tr key={song.id} >
                            <Td>{song.album_id}</Td>
                            <Td>{song.id_songs}</Td>
                            <Td>{song.name_song}</Td>
                            <Td>{song.danceability}</Td>
                            <Td>{song.duration_ms}</Td>
                        </Tr>
                        )))}
                 </Tbody>
                </Table>
               </TableContainer>
                {error && <Text color="red.500">{error}</Text>}
        </Box> 
        </Flex>
        </>
    );
}

