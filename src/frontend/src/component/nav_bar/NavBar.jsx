import 'antd/dist/antd.css';
import { PageHeader, Button, Avatar, message } from 'antd';
import styled from 'styled-components'
import  './NavBar.css';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from './../logo/logo.png';
import Cookies from 'universal-cookie';
import {useState, useEffect} from 'react';
import {
UserOutlined
} from '@ant-design/icons';
const cookies = new Cookies();

const getLogOut = () =>{
    window.location.href = "/login_in";

}

function UserButton(props){
    const StyledUserButton = styled(Button)`
    position:relative;
    right:5%;
    top:10%;
    color:white;
    font-family: "Trebuchet MS";
    text-decoration: underline;`



    return ( <StyledUserButton  type="link" title="Set user settings">
                    <Link to="/usr_settings">
                 <Avatar className='usr_ava' style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />&nbsp;
                 {props.username}</Link>
               </StyledUserButton>
            )


}

const Logo = () =>
     <Link className="logo" to="/" title="GMS" ><img alt="here must be a logo" style={{maxWidth:'30%', height:'auto'}} src={logo} /> Smart Chat</Link>

const LogOut = () =>{
    const XSRFToken  = cookies.get('XSRF-TOKEN');
    fetch('/logout', {
      method: 'POST',
      headers: {
        'X-XSRF-TOKEN': XSRFToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then(response => response.status === false ? message.error("Something goes wrooong. status:" + response.status + ", status text:" + response.statusText) : getLogOut())


}

const LogOutButton = () =>
     <StyledLogOutButton type="link" title="Log out"><Link onClick={LogOut}>
                 log out</Link>
               </StyledLogOutButton>
const StyledLogOutButton = styled(Button)`
position:relative;
right:3%;
top:10%;
color:white;
font-family: "Trebuchet MS";
text-decoration: underline;`

const Admin = (props) =>{
    const StyledButton = styled(Button)`
    position:relative;
    right:5%;
    top:10%;
    color:white;
    font-family: "Trebuchet MS";
    text-decoration: underline;
    `

    if(props.user != null){
        if(props.user.roles[0] === "ADMIN"){
            return (<StyledButton type="link"><Link to="/admin">
                      Administration</Link>
                    </StyledButton>)
        }else{
            return(<>
                    </>)
        }
    }else{
        return(<>
                </>)
    }


}


function NavBar(props){
    const StyledPageHeader = styled(PageHeader)`
          position:relative;
          height:30%;
          minWidth:100%;
          border: 1px solid rgb(0, 0, 0);
          background-color:black;
        `


           return  (<StyledPageHeader
             className="site-page-header"
             title=<Logo/>
             //extra = {[<UserButton key='0' {... props.user}/>, <Admin key='1' user={props.user}/>, <LogOutButton key='2'/>]}
             >
             </StyledPageHeader>)

}


export default function AppNavBar(props){
  return <NavBar user = {props.user}/>;
}
