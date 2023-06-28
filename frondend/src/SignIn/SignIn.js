import React, { useState } from 'react';
import { DatePicker, notification, Button, Form, Input, Space } from 'antd';
import {Link} from 'react-router-dom'

import "./SignIn.css";
import { client } from '../API/axios';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [dob, setDob] = useState('');
    const [posts, setPosts] = useState([]);

    /*===================== custom function =====================*/

    //fix date string from 2002-5-2 to 2002-05-02
    function fixDateString(number){
        if (number < 10){
            return `0${number}`;
        }
        else{
            return `${number}`;
        }
    }

    //nofication
    const [api, contextHolder] = notification.useNotification();
    
    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
        message: message,
        description:
            description,
        });
    };

    /*===================== handle submit from form =====================*/
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Email ${email}, password ${password}, full name ${fullName}, date ${dob}`);
        postAccount(fullName, email, password, dob);
    };

    /*===================== sent api post to backenf =====================*/
    const postAccount = async (fullName, email, password, dob) => {
        let reponse = await client.post('http://localhost:8080/api/v1/demoApp/signIn',{
            name: fullName,
            password: password,
            email: email,           
            dob: dob,
        }).then(reponse => {
            if (reponse.status == 202){
                openNotificationWithIcon('success', 'Sign in success', 'Please use another email or go to login with this email');
            }
        }).catch(reponse => {
            if(reponse.response.status == 406){
                openNotificationWithIcon('error', 'Already have this email', 'Please use another email or go to login with this email');
            }
        });
        setPosts([reponse]);
    };

    /*===================== return =====================*/
    return (
        <>
            <div className='middleSignin'>
                <Form
                    name='basic'                  
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 300}}
                    initialValues={{ remember: true }}
                    autoComplete="off"                   
                >
                    {/* ===================== input email ===================== */}
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

                    {/* ===================== input password ===================== */}
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

                    {/* ===================== input full name ===================== */}
                    <Form.Item
                        label="Full Name"
                        name="Full Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}

                    >
                        <Input 
                            id='Full Name'
                            value={fullName}
                            className='inputForm'
                            placeholder='Full Name'
                            onChange={(e) => setFullName(e.target.value)} 
                        />
                    </Form.Item>

                     {/* ===================== pick date of birth ===================== */}
                    <Form.Item label="Date of birth">
                        <DatePicker 
                            picker='date'
                            format={"YYYY-MM-DD"}
                            onSelect={(e) => setDob(`${e.year()}-${fixDateString(e.month())}-${fixDateString(e.date())}`)}
                        />
                    </Form.Item>

                     {/* ===================== submit button ===================== */}
                    <Form.Item
                        className='buttonSignIn'
                        wrapperCol={{
                            offset: 4,
                            span: 16,
                        }}
                    >
                        {contextHolder}
                        <Space>
                            <Button className='SignInButton' type="primary" htmlType="submit" onClick = {handleSubmit} style={{width: "200px"}}>
                                Submit
                            </Button>
                        </Space>
                        {/*link to LogIn*/}
                        Or <Link to="/LogIn" className='toLogIn'>Login now!</Link>
                    </Form.Item>
                    
                </Form>
            </div>
        </>
    );
}

export default SignIn;