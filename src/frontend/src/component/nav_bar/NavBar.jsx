import 'antd/dist/antd.css';
import { PageHeader, Button, Avatar, message, Affix, Descriptions, Tag} from 'antd';
import styled from 'styled-components'
import  './NavBar.css';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
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
     <Link className="logo" to="/" title="My chat" ><img alt="here must be a logo" style={{maxWidth:'30%', height:'auto'}} src={logo} /></Link>

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

const HeaderMenu = (props) =>{
    const[isPlayHover, setIsPlayHover] = useState(false);
    const[isTranslateHover, setIsTranslateHover] = useState(false);
    const[isCPaaSHover, setIsCPaaSHover] = useState(false);

    const handleMouseEnter = (setIsHover) => {
       setIsHover(true);
    };

    const handleMouseLeave = (setIsHover) => {
       setIsHover(false);
    };

    let playgroundColor = 'white';
    let translateColor = 'white';
    let cpaasColor = 'white';

    switch(props.pathName){
        case "/" : playgroundColor = "#367a58"
        break
        case "/translate" : translateColor = "#367a58"
        break
        case "/cpaas" : cpaasColor = "#367a58"
        break
    }

    return(<>

            <Tag color="black">
               <NavLink className="header_menu" style = {{color: isPlayHover ? '#367a58' : playgroundColor, fontSize:"20px"}}   to="/"
                onMouseEnter={()=>handleMouseEnter(setIsPlayHover)}
                onMouseLeave={()=>handleMouseLeave(setIsPlayHover)}
               >Play</NavLink>
           </Tag>
            <Tag  color="black">
               <NavLink className="header_menu" style = {{color:isTranslateHover ? '#367a58' : translateColor, fontSize:"20px"}}  to="/translate"
                onMouseEnter={()=>handleMouseEnter(setIsTranslateHover)}
                onMouseLeave={()=>handleMouseLeave(setIsTranslateHover)}
               >Translate</NavLink>
           </Tag>
           <Tag  color="black">
               <NavLink className="header_menu"  style = {{color:isCPaaSHover ? '#367a58' : cpaasColor, fontSize:"20px"}} to="/cpaas"
               onMouseEnter={()=>handleMouseEnter(setIsCPaaSHover)}
               onMouseLeave={()=>handleMouseLeave(setIsCPaaSHover)}
               >CPaaS</NavLink>
           </Tag>
           </>)

}


function NavBar(props){
    const StyledPageHeader = styled(PageHeader)`
          position:relative;
          minHeight:15%;
          minWidth:100%;
          border: 1px solid rgb(0, 0, 0);
          background-color:black;
        `


           return  (
            <Affix offsetTop={0} >
                <StyledPageHeader
                    className="site-page-header"
                    title=<Logo/>
                    tags={<HeaderMenu pathName = {props.pathName}/>}
                    //extra = {[<UserButton key='0' {... props.user}/>, <Admin key='1' user={props.user}/>, <LogOutButton key='2'/>]}
                >
                </StyledPageHeader>
             </Affix>
             )

}


export default function AppNavBar(props){
  return <NavBar {...props}/>;
}
