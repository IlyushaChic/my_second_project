import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context";
import MyButton from "../button/MyButton";



const Navbar = () => {
   const { isAuth, setIsAuth } = useContext(AuthContext)

   const logout=()=>{
setIsAuth(false)
localStorage.removeItem('auth')

   }
   return (

      isAuth ? <div className="navbar">
         <MyButton onClick={logout}>Выйти</MyButton>
         <div className="navbar__links">
            <Link to="/about">О сайте</Link>
            <Link to="/posts">Посты</Link>
         </div>
      </div>
         : <div className="navbar" style={{color:'violet',textAlign:'center'}}>
         Чтобы попасть на сайт введите логин и пороль 
         </div>





   )
}

export default Navbar;