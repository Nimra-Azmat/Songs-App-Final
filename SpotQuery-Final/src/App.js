import { BrowserRouter,Routes, Route} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Artist from './pages/Artist';
import Album from './pages/Album';
import Song from './pages/Song';
import NotFound from './pages/NotFound';
import RootLayout from './layouts/RootLayout';
import Profile from './pages/Profile';
import ProtectedRoute from './utils/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return ( 
    <>

     <BrowserRouter>
     <AuthProvider>
          <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Profile />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/artist" element={<Artist />} />
              <Route path='*' element={<NotFound/>}/>
              <Route element={<ProtectedRoute/>}>    
                <Route path="/album" element={<Album />} />
                <Route path="/song" element={<Song />} />
              </Route>
              </Route>
          </Routes>
      </AuthProvider>
  </BrowserRouter>
  </>
  )}

export default App;

