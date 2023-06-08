import AppNavbar from './../component/nav_bar/NavBar.jsx';
import { withCookies } from 'react-cookie';
import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { message, Button, Input, Space, Form, Typography, Layout, List, Affix, Divider, Spin} from 'antd';
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


var localChatElements = []
var askText = ""

function InputComponent (props){
    const [form] = Form.useForm();
    const [bottom, setBottom] = useState(10);
    const [top, setTop] = useState("80%");
    const [askMeText, setAskMeText] = useState("")

    const onFinish = (value) =>{
        if(askText.trim() !== ""){
          props.setIsLoading(true)
          fetch('/ask_gpt',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:askText

          }).then(response=> response.json())
          .then(body=>setData(body));
        }
    }


    const setData = (data)=>{
        console.log(data)
        if(data !== undefined && data !== null && data.answer !== null){
            localChatElements.push({"question": data.question,
                                    "answer":data.answer})

            const updatedChatElements = []
            for(var i = 0; i < localChatElements.length; i++){
                updatedChatElements.push(localChatElements[i])
            }
            props.setChatElements(updatedChatElements)

            askText = ""
            setAskMeText("")
            setTop("10%")
        }else{
            if(data.error !== null){
                message.error(data.error)
            }else{
                message.error("unknown error was occurred")
            }
        }
        props.setIsLoading(false)
    }

    const setInputData = (target) =>{
        if(target !== undefined && target !== null){
            askText = target.target.value
            setAskMeText(askText)
        }
    }

    return(<section style={{position:'relative', top:top}}>
            <Affix offsetBottom={bottom}>
            <Form style={{position:'relative', width:"50%", left:'25%'}} tabIndex={0}  form = {form}   name="nest-messages"  onFinish={onFinish} >
                <Form.Item
                  name="question"
                  label=""
                >
                    <Space.Compact style={{width: '100%', position:'relative'}}>
                         <Input disabled={props.isLoading} value={askMeText} placeholder="ask me" allowClear onChange={setInputData}/>
                         <StyledButton disabled={props.isLoading} shape="circle" icon={<SendOutlined/>} type="primary"  htmlType="submit"></StyledButton>
                    </Space.Compact>
                </Form.Item>
            </Form>
            </Affix>
           </section>
           )
}

function isThisCodeBlock(string, codeBlocks){
    for(var i = 0; i < codeBlocks.length; i++){
        if(string === codeBlocks[i]){
            return true
        }
    }
    return false
}


function getCodeLanguage (codeBlock){
    var codeArray = codeBlock.split("\n")
    if(codeArray.length > 0 && codeArray[0] !== ""){
        return codeArray[0]
    }
    return "java"
}

function AnswerItem (props){
    const regex = /```([\s\S]+?)```/g;
    const matches = props.answer.match(regex);

    if(matches){
        const answerParts = props.answer.split("```")
        const codeBlocks = matches.map(match => match.replace(/```/g, ''));
        const answerSections = []
        var language = "java"

        for(var i = 0; i < answerParts.length; i++){
            if(isThisCodeBlock(answerParts[i], codeBlocks)){
                language = getCodeLanguage(answerParts[i])
                answerSections.push(<CopyBlock
                    text={answerParts[i]}
                    language={language}
                    showLineNumbers={true}
                    theme={androidstudio}
                />)
            }else{
                answerSections.push(<Text strong>{answerParts[i]}</Text>)
            }

        }

        return(<section style={{whiteSpace: 'pre-line'}}>

                {answerSections}
                </section>)
    }else{
        return(<section style={{whiteSpace: 'pre-line'}}>
                    <Text strong>{props.answer}</Text>
                </section>)
    }
}


const ChatElements = (props)=> {
    const { Sider, Content } = Layout
    //const [chatItems, setChatItems] = useState()

    /* useEffect(() => {
        setChatItems(props.chatElements)
    }, [props.chatElements]); */

    if(props.chatElements !== undefined && props.chatElements.length > 0){
        return(<section style={{position:"relative", width:"50%", left:'25%', top:'10%', height:'70%'}}>
                <Layout>
                   <Layout >

                       <List

                         style={{position:"relative", width:"100%", }}
                         bordered
                         dataSource={props.chatElements}
                         renderItem={item => (
                           <List.Item key={item.question} disabled = {true}>
                             <Content >
                             <Title  copyable level={4} style={{textAlign: 'center', color:'white', backgroundColor:'#367a58', marginTop:'3%'}}>{item.question}</Title>

                             <AnswerItem answer={item.answer} />
                             <Divider ></Divider >

                             </Content>
                           </List.Item>
                         )}
                       />
                    </Layout>
                </Layout>
                </section>)
    }else{
        return(<section style={{position:"relative", width:"100%", height:'70%'}}></section>)
    }
}

const showError = (response) =>{
  message.error("Oooops, something goes wrong. \n error: " + response.status + "\n error description: " + response.statusText)

}

function IOChat(props){
    const[user, setUser] = useState(null)
    const[chatElements, setChatElements] = useState()
    const [isLoading, setIsLoading] = useState(false);
    const [pathName, setPathName] = useState(window.location.pathname)

    return (
        <section style={{position:'relative', width:'100%', height:'100%'}}>

                <AppNavbar user = {user} pathName = {pathName}/>

            <Spin style={{position:"relative", width:"50%", left:'25%', top:'10%', minHeight:'70%'}}  size="large" tip="Sending..." spinning={isLoading}>
                <ChatElements isLoading = {isLoading} chatElements = {chatElements}/>
            </Spin>
            <InputComponent setIsLoading={setIsLoading} isLoading = {isLoading} setChatElements = {setChatElements} chatElements = {chatElements}/>
        </section>)

}

export default function ChatPage(props){
    return <IOChat {... props}/>
}