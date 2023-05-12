import  { createContext, useState, useEffect} from 'react'
import jwt_decode from "jwt-decode"
import { useNavigate } from 'react-router-dom'
import {base_url} from '../base_url'

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) =>{
    
    let history = useNavigate()
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens')? JSON.parse(localStorage.getItem('authTokens')): null)
    let [user,setUser] = useState(() => localStorage.getItem('authTokens')? jwt_decode(localStorage.getItem('authTokens')): null)
    let [loading,setLoading] = useState(true)
    const [artists, setArtists] = useState([]);
    const [previousPage, setPreviousPage] = useState(null);
    const [nextPage, setNextPage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [artistName, setArtistName] = useState("");
    const [albums, setAlbums] = useState([]);
    const [albumName, setAlbumName] = useState("");
    const [Song, setsong] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    
  // useEffect(()=>{
  //     handleSearch()
  //   },[])
  const handleSongSearch = async () => {
      setIsLoading(true);
      try {
          const response = await fetch(`${base_url}songs/showsong/`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + String(authTokens.access),
              },
              body: JSON.stringify({ album: albumName }),
          });
          const data = await response.json();
          if (data.status === true) {
              handleSongSearch();
             }
          setsong(data);
          setIsLoading(false);
      } catch (err) {
          setError("Something went wrong. Please try again later.");
          setIsLoading(false);
      }
  };

  const handleAlbumSearch = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${base_url}albums/showalbums/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
        body: JSON.stringify({ artists: artistName }),
      });
      const data = await response.json();
      // if (data.status === true) {
      //  handleSearch();
      // }
      setAlbums(data);
      setIsLoading(false);
    } catch (err) {
      setError("Something went wrong. Please try again later.");
      setIsLoading(false);
    }
  };
  
    useEffect(() => {
      fetch(`${base_url}artists/showartist/?page=${currentPage}`)
        .then(response => response.json())
        .then(data => {
          setArtists(data.artists);
          setPreviousPage(data.links.previous);
          setNextPage(data.links.next);
        })
        .catch(error => console.error(error));
    }, [currentPage]);
    const handlePreviousPage = () => {
      setCurrentPage(previousPage);
    };
    const handleNextPage = () => {
      setCurrentPage(nextPage);
    };
    const uniqueArtists = [];
  
  String(artists)
    .split(",")
    .map((value) => value.trim())
    .forEach((value) => {
      if (!uniqueArtists.includes(value)) {
        uniqueArtists.push(value);
      }
    });
  
    let loginUser = async (e)=>{
        e.preventDefault()
        console.log('Form Submitted')
        let response = await fetch(`${base_url}api/token/`,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'username': e.target.username.value, 'password':e.target.password.value})
        })
    let data = await response.json();
   
    if(response.status === 200){
        setAuthTokens(data)
        setUser(jwt_decode(data.access))
        localStorage.setItem('authTokens',JSON.stringify(data))
        history('/')
    }else {
        alert("Something went wrong in Authentication")
    }
    }

    let logoutUser=() => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        history('/login')
    }
    let updateToken = async ()=> {
        // let response = await fetch(`https://songapp-react-django-nimra-dot-cloud-work-314310.ew.r.appspot.com/api/token/refresh/`, {

        let response = await fetch(`${base_url}api/token/refresh/`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':authTokens?.refresh})
        })

        let data = await response.json()
        
        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        }else{
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }
    }

    let contextData = {
        user:user,
        authTokens:authTokens,
        handleAlbumSearch:handleAlbumSearch,
        handleSongSearch:handleSongSearch,
        isLoading:isLoading,
        artistName:artistName,
        albumName:albumName,
        error:error,
        albums:albums,
        Song:Song,
        setArtistName:setArtistName,
        setAlbumName:setAlbumName,
        uniqueArtists:uniqueArtists,
        nextPage:nextPage,
        handleNextPage:handleNextPage,
        previousPage:previousPage,
        handlePreviousPage:handlePreviousPage,
        loginUser:loginUser,
        logoutUser:logoutUser
    }

    useEffect(()=> {

        if(loading){
            updateToken()
        }

        let fourMinutes = 1000 * 60 * 4

        let interval =  setInterval(()=> {
            if(authTokens){
                updateToken()
            }
        }, fourMinutes)
        return ()=> clearInterval(interval)
        
    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null :children}
        </AuthContext.Provider>
    )
}