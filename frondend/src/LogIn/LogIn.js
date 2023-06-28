import React, { useState } from 'react';
import {Button, Form, Input, notification, Space } from 'antd';
import {Link} from 'react-router-dom'

import "./LogIn.css";
import { client } from '../API/axios';


const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    /*===================== custom function =====================*/
    // nofication
    const [api, contextHolder] = notification.useNotification();
    
    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
        message: message,
        description:
            description,
        });
    };

    /*=========================== submit form login ===========================*/
    const handleSubmit = (event) => {
        event.preventDefault();
        postAccount(email, password);
    };

    /*=========================== send api post to backend ===========================*/
    const postAccount = async (email, password) => {
        await client.post('http://localhost:8080/api/v1/demoApp/logIn',{
            email: email,
            password: password,
        }).then(reponse => {
            if (reponse.status == 202){
                openNotificationWithIcon('success', 'Login success', '');
                window.location.replace(`http://localhost:3000/${reponse.data.data.id}/${reponse.data.data.name}/blog`)
            };
        }).catch(reponse =>{
            if (reponse.response.status == 406){
                openNotificationWithIcon('error', 'Login false', 'Wrong password')
            }else if(reponse.response.status == 404){
                openNotificationWithIcon('error', 'Login false', 'Not found user of this email')
            }else if (reponse.response.status == 405){
                openNotificationWithIcon('error', 'Enter email and password', 'Please input your email and password correct')
            }
        });
        
    };

    return (
        <>
            <div className='middleLogin'>
                <Form
                    name='basic'                   
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 300}}
                    initialValues={{ remember: true }}
                    autoComplete="off"                    
                >
                    {/*============================== input email ==============================*/}
                    <Form.Item
                        label="Email"
                        name="Email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        
                        <Input 
                            id='email'
                            value={email}
                            className='inputForm'
                            placeholder='Email'
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </Form.Item>

                    {/*============================== input password ==============================*/}
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}                       
                    >
                        <Input.Password 
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="inputForm"
                            placeholder='Password'
                        />
                    </Form.Item>

                    {/* ============================== button ============================== */}
                    <Form.Item
                        className='buttonLogIn'
                        wrapperCol={{
                            offset: 4,
                            span: 16,
                        }}
                    >
                        {contextHolder}
                        <Space>
                            <Button 
                                className='LogInButton' 
                                type="primary" 
                                htmlType="submit" 
                                onClick = {handleSubmit} 
                                style={{width: "200px"}}
                            >
                                Submit
                            </Button>
                        </Space>
                        {/* ============================== to sign in ============================== */}
                        <Link to="/SignIn" className='toSignIn'>register now!</Link>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
}

export default LogIn;