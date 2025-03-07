
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthPage from './pages/AuthPage';
import { useState } from 'react';
import Home from './pages/Home';

const PrivateRoute = ({ isAuthenticated }) => {
  return isAuthenticated ?
    <>
      <Outlet />
    </>
    : <><Navigate replace to='/auth'></Navigate></>
}

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (<>
    <BrowserRouter>
      <Routes>
          <Route path='/auth' element={<AuthPage setIsAuthenticated={setIsAuthenticated}/>}/>

            <Route element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
              <Route path='/' element={<Home/>}/>
            </Route>

      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
