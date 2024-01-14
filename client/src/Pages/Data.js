import 'bootstrap/dist/css/bootstrap.min.css'
import { Helmet } from 'react-helmet';
import React, {useState} from 'react';
import axios from 'axios'
import {$host} from '../Routes'

const DATA_PATH = '/data'

const PostItem = (props) => {
    const [post, setPost] = useState(props.getPost(props.index))
    return (
        <div>
            <row>
                <input
                    value={post.title}
                    onChange={e => {
                        props.setPost(props.index, {...post, title: e.target.value})
                        setPost({...post, title: e.target.value})
                    }}
                    type="text"
                    placeholder="Название поля"
                />
                <input
                    value={post.value}
                    onChange={e => {
                        props.setPost(props.index, {...post, value: e.target.value})
                        setPost({...post, value: e.target.value})
                    }}
                    type="text"
                    placeholder="Значение поля"
                />
                <button onClick={() => props.remove(props.getPost(props.index).id)}>Удалить</button>
            </row>
        </div>
    );
};

const LongPostItem = (props) => {
    const [post, setPost] = useState(
        {title: props.post.title, value: props.post.value})
    return (
        <div>
            <row>
                <input
                    value={post.title}
                    onChange={e => {
                        setPost({...post})
                    }}
                    type="text"
                    placeholder="Название поля"
                />
                <input
                    value={post.value}
                    onChange={e => {
                        Object.assign(props.post, {...post, value: e.target.value})
                        setPost({...post, value: e.target.value})

                    }}
                    type="text"
                    placeholder="Значение поля"
                />
            </row>
        </div>
    );
};

const PostList = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            {
                props.postCountArray.map((x, i) =>
                    <PostItem
                        remove={props.remove}
                        getPost={props.getPost}
                        setPost={props.setPost}
                        index={i}
                        key={props.getPost(i).id}/>
            )}
        </div>
    );
};

const PostForm = (props) => {
    const addNewPost = (e) => {
        e.preventDefault()
        props.create()
    }

    const getData = (e) => {
        e.preventDefault()
        props.get()
    }

    const postData = (e) => {
        e.preventDefault()
        props.post()
    }

    return (
        <form>
            <button onClick={addNewPost}>Добавить поле</button>
            <button onClick={postData}>Добавить данные на сервер</button>
            <button onClick={getData}>Получить данные с сервера</button>
        </form>
    );
};

const posts = [
    {id:3, title: 'title', value: 'ИТ-211'},
]

let sectionPost = {id: 1, title: 'section', value: 'groups'}
let IDPost = {id: 2, title: 'id', value: '1'}

function DataPage() {

    const setPost = (index, value) => {
        Object.assign(posts[index], value)
    }

    const getPost = (index) => {
        const retPost = {id: 0, title: '', value: ''}
        Object.assign(retPost, posts[index])
        return retPost
    }

    const [postCountArray, setPostCountArray] = useState([1])

    const createPost = async () => {
        const newPost = {title: '', value: '', id: Date.now()}
        posts.push(newPost)
        await setPostCountArray([...postCountArray, 1])
    }

    const removePost = (post) => {
        //posts = posts.filter(p => p.id !== post.id)
    }

    const postData = async () => {
        const sendData = {
            id: IDPost.value,
            section: sectionPost.value,
        }

        posts.map(item => {
            sendData[item.title] = item.value
        })

        console.log('Отправка данных', sendData);

        try {
            const response = await $host.post(
                '/api/data/post',
                sendData, {
                    headers: {
                        'Content-Type': 'application/json'
                    },

                })
            console.log('Ответ сервера', response.data);
        } catch(err) {
            console.log(err)
        }
    }

    const getData = async () => {
        const searchData = {
            id: IDPost.value,
            section: sectionPost.value,
        }
        console.log('Поиск данных по', searchData);

        try {
            const response = await $host.post(
                '/api/data/get',
                searchData, {
                    headers: {
                        'Content-Type': 'application/json'
                    },

                })
            console.log('Ответ сервера', response.data);
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div>
            <Helmet>
                <title>Данные</title>
            </Helmet>

            <LongPostItem post={sectionPost}/>
            <LongPostItem post={IDPost}/>
            <PostForm create={createPost} get={getData} post={postData}/>
            <PostList
                remove={removePost}
                setPost={setPost}
                getPost={getPost}
                postCountArray={postCountArray}
            />
        </div>
    );
}

export default DataPage;
