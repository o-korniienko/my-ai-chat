import AppNavbar from './../component/nav_bar/NavBar.jsx';
import { withCookies } from 'react-cookie';
import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { message} from 'antd';


function Chat (){

   return(<section>Hello world</section>)
}

const showError = (response) =>{
  message.error("Oooops, something goes wrong. \n error: " + response.status + "\n error description: " + response.statusText)

}

function ChatPage(){
    const[user, setUser] = useState(null)
     /* useEffect(() => {
        fetch('/get_user')
         .then(response=> response.status !== 200 ? showError(response) : response.url.includes("login_in") ? window.location.href = "/login_in" : response.json())
        .then(data=>setUser(data));


     }, []); */

    return (
        <>
            <AppNavbar user = {user}/>
            <Chat/>
        </>)

}

export default withCookies(ChatPage);