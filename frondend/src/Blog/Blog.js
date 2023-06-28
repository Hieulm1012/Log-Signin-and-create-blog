import React, { useEffect } from 'react';
import { Card, Row, Button, Form, Input, notification, Space, Layout } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { client } from '../API/axios';
import './blog.css';
import { Link, useParams } from 'react-router-dom';

const { TextArea } = Input;

const {Header} = Layout;
const Blog = () => {
    const [title, setTitle] = useState('');
    const [valueBlog, setvalueBlog] = useState('');
    const [idCustomer] = useState(useParams().idCustomer);
    const [nameCustomer] = useState(useParams().nameCustomer);
    const [listBlog, setListBlog] = useState([]);
    const [count, setCount] = useState(0)

    /*===================== custom function =====================*/
    //to avoid input underfine
    const avoidNulltext = (text) =>{
        if (text){
            return (text);
        }else{
            return ("");
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

    /*===================== get all blog of 1 user =====================*/
    const getBlog = () =>{
        client.get(`http://localhost:8080/api/v1/Blog/${idCustomer}`,{
        }).catch(
            (error) => {
                if (error.response.status === 302){
                    setListBlog(error.response.data.data.reverse());
                }else if(error.response.status === 405){                   
                    setListBlog(error.response.data.data.reverse());
                }
                console.log(error);
            }
        );
    }

    useEffect(getBlog, [idCustomer]);


    /*===================== submit a new blog =====================*/
    //get value from form input
    const handelSubmit = (event)=>{
        event.preventDefault();
        setTitle(avoidNulltext(title));
        setvalueBlog(avoidNulltext(valueBlog));
        postBlog(valueBlog, idCustomer, title);  
    }

    //post new blog to backend
    const postBlog = async (valueBlog, idCustomer, title) => {
        await client.post(`http://localhost:8080/api/v1/Blog/${idCustomer}/newblog`,{
            title:  title,
            value: valueBlog,           
        }).then(() => {           
            openNotificationWithIcon('success', 'new blog has created', ''); 
            getBlog();
        }).catch(reponse =>{
            if (reponse.response.status === 406){
                openNotificationWithIcon('error', 'Add new blog false', 'Title and description can not null at the same time')
            }      
        });
    };


    /*===================== delete a blog =====================*/
    const deleteBlog = (idBlog, idCustomer) =>{
        client.delete(`http://localhost:8080/api/v1/Blog/${idCustomer}/deleteblog/${idBlog}`)
        .then(() =>{
            openNotificationWithIcon('success', 'blog has delete', '');
            getBlog();
            setCount(count+1);
        })
        .catch(reponse =>{
            if (reponse.response.status === 500){
                console.log(reponse);
            };
        });
    }

    /*===================== return =====================*/
    return (
        <>
            <Space
                direction="vertical"
                style={{
                width: '100%',
                }}
                size={[0, 48]}
            >
                {/* ==================================== header ==================================== */}
                <Header className='header'>
                    <div className='topName'>
                        {nameCustomer}
                    </div>
                </Header>
                
                {/* ==================================== to create new blog ==================================== */}
                <div className='newBlog'>
                    <Form
                        name='basic'
                        initialValues={{ remember: true }}
                        autoComplete="off">
                        <Form.Item>
                            <Input 
                                id='email'
                                className='IputValueBlog' 
                                placeholder='Title'
                                onChange={(e) => setTitle(e.target.value)} 
                            />
                        </Form.Item>
                        <Form.Item className='inputBlog'>
                            <TextArea 
                                className='IputValueBlog' 
                                placeholder='description'
                                rows={3} 
                                allowClear = {true} 
                                onChange={(e) =>{e.stopPropagation(); setvalueBlog(e.target.value)}}
                            />
                        </Form.Item>
                        {contextHolder}
                        <Form.Item className='inputBlog'>
                            <Button 
                                className='UpBlogButton' 
                                onClick={handelSubmit} 
                                type="primary" 
                                htmlType="submit" 
                                style={{width: "200px"}}
                            >
                                New Blog
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                {/*==================================== show all blog ==================================== */}
                <div className="showBlog">
                <Row>
                    {listBlog.map(blog => (                   
                        <Card 
                            key={blog.id}
                            className='blog'
                            actions={[
                                <DeleteOutlined className='BlogButton' key="delete" onClick={e => {e.stopPropagation(); deleteBlog(blog.id, idCustomer);}}/>,
                            ]}
                        >                        
                            <Card.Meta
                            title={blog.title}
                            description={
                                <p>         
                                    {blog.value}
                                <br/>
                                <br/>
                                    {blog.bLocalDate}
                                </p>                                                
                            }
                            />
                        </Card>
                    ))}
                    </Row>
                </div>
                {/*==================================== addition ====================================*/}
                <div>
                        <Link to="/LogIn" className='toLogInPage'>Login</Link>
                        <Link to="/SignIn" className='toSignInPage'>Signin</Link>
                </div>
            </Space>
        </>
    );
}

export default Blog;