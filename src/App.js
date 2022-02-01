import React, { useEffect, useState } from "react";
import './styles/App.css';
import { BrowserRouter } from 'react-router-dom';
import Navbar from "./components/UI/Navbar/Navbar";
import AppRouter from "./components/AppRouter";
import { AuthContext } from "./components/context";

function App() {
  useEffect(()=>{
    if(localStorage.getItem('auth')){
      setIsAuth(true)
    } 
    setIsLoading(false);
  },[])
  const[isAuth,setIsAuth]=useState(false);
  const[isLoading,setIsLoading]=useState(true);
  return (
    
    <AuthContext.Provider value= {{
      isAuth,
      setIsAuth,
      isLoading
    }}>
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter >
    </AuthContext.Provider>
  )
}

export default App;