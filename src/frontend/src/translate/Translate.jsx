import AppNavbar from './../component/nav_bar/NavBar.jsx';
import { withCookies } from 'react-cookie';
import React, { useState, useEffect } from 'react';
import  './Translate.css';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import { message, Button, Input, Space, Form, Select, Layout, Divider, Spin, Typography} from 'antd';
import {
SendOutlined

} from '@ant-design/icons';
import { CopyBlock, androidstudio } from "react-code-blocks";
import styled from 'styled-components'

const{Title, Text} = Typography

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const StyledButton = styled(Button)`
        background-color: black;
        on-hold-color:red;
      `

var language = "Ukrainian"
var localInputText = ""

function TranslatorElement (props){
    const [form] = Form.useForm();
    const [inputText, setInputText] = useState("")
    const { TextArea } = Input;
    const { Option } = Select;

    const onFinish = (value) =>{
        if(inputText.trim() !== ""){
          props.setIsLoading(true)
          fetch('/translate?language=' + language,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:inputText

          }).then(response=> response.json())
          .then(body=>setData(body));
        }
    }

    const setData = (data) =>{
        console.log(data)
        if(data.error != null){
            message.error(data.error)
        }else{
            if(data.error === null && data.translated === null){
                message.error("unknown error was occurred")
            }else{
                form.setFieldsValue({output: data.translated});
            }
        }

        props.setIsLoading(false)
    }


    const setInputData = (target) =>{
        if(target !== undefined && target !== null){
            localInputText = target.target.value
            setInputText(localInputText)
        }
    }

    const setLanguage = (value) =>{
        language = value
    }

    return(<section style={{position:'relative', width:'100%', top:'10%'}}>
            <Form style={{position:'relative', width:'90%',  left:'5%', backgroundColor:'#367a58'}} tabIndex={0}  form = {form}   name="nest-messages"  onFinish={onFinish} >
                    <Space style={{position:'relative', width:'90%',  left:'5%', }}>
                        <Form.Item
                            name="input"
                        >
                         <TextArea style = {{position: 'relative', marginTop:'2%'}} className="none-resize"  cols={100} rows = {20} disabled={props.isLoading} shape="circle" allowClear onChange={setInputData}/>
                         </Form.Item>
                         <Form.Item
                             label=""
                         >
                            <Form.Item>
                             <Select disabled = {props.isLoading} name = "language" defaultValue="Ukrainian" style={{ width: 170, color:"blue" }} onChange={value => setLanguage(value)}>
                               <Option style={{color:"#d3872a"}} value="Ukrainian">Ukrainian</Option>
                               <Option style={{color:"#d3872a"}} value="English">English</Option>
                               <Option style={{color:"#d3872a"}} value="Russian">Russian</Option>
                               <Option style={{color:"#d3872a"}} value="Bengali">Bengali</Option>
                               <Option style={{color:"#d3872a"}} value="Bulgarian">Bulgarian</Option>
                               <Option style={{color:"#d3872a"}} value="Burmese">Burmese</Option>
                               <Option style={{color:"#d3872a"}} value="Croatian">Croatian</Option>
                               <Option style={{color:"#d3872a"}} value="French">French</Option>
                               <Option style={{color:"#d3872a"}} value="Greek">Greek</Option>
                               <Option style={{color:"#d3872a"}} value="Indonesian">Indonesian</Option>
                               <Option style={{color:"#d3872a"}} value="Polish">Polish</Option>
                               <Option style={{color:"#d3872a"}} value="Portuguese">Portuguese</Option>
                               <Option style={{color:"#d3872a"}} value="Norwegian">Norwegian</Option>
                               <Option style={{color:"#d3872a"}} value="Punjabi">Punjabi</Option>
                               <Option style={{color:"#d3872a"}} value="Spanish">Spanish</Option>
                               <Option style={{color:"#d3872a"}} value="Urdu">Urdu</Option>
                             </Select>
                            </Form.Item>
                         </Form.Item>
                         <Form.Item
                            name="output"
                         >
                         <TextArea style = {{position: 'relative', marginTop:'2%'}} className="none-resize" readOnly={true} cols={100} rows = {20} disabled={props.isLoading} shape="circle" icon={<SendOutlined/>} />
                         </Form.Item>
                    </Space>
                <Form.Item
                >
                <Button disabled={props.isLoading} style={{position:'relative', left:'5%', marginBottom:'1%'}} type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
           </section>
           )
}


const showError = (response) =>{
  message.error("Oooops, something goes wrong. \n error: " + response.status + "\n error description: " + response.statusText)

}

function Translator(props){
    const[user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [pathName, setPathName] = useState(window.location.pathname)

    return (
        <section style={{position:'relative', width:'100%', height:'100%'}}>

             <AppNavbar user = {user} pathName = {pathName}/>
             <TranslatorElement isLoading={isLoading} setIsLoading={setIsLoading}/>

        </section>)

}

export default function TranslatePage(props){
    return <Translator {... props}/>
}