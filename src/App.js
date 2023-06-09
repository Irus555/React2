import './App.css';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Card, Spin } from 'antd'

import { HelloWorld, Navbar, Posts, PostPage } from './components/';
import { getCurrentPostsToUser } from './services/postService';

import { Routes, Route, useLocation } from 'react-router-dom'
import { getPosts } from './store/actions/postsActions';
import { useDispatch, useSelector } from 'react-redux'

function App() {


    return (
      <Navbar>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/posts' element={<Posts />} />
          <Route path='/post/:id' element={<PostPage />} />
          <Route path='/hello/:id/temp/:dataid' element={<HelloWorld />} />
          <Route path='*' element={<NotFoud />} />
        </Routes>
        <div></div>

      </Navbar>
    )
  }

const Home = () => {
  const [counter, setCounter] = useState()
  const [users, setUsers] = useState([])
  // const { loading, success, posts: users } = useSelector((state => state.posts))

  // const dispatch = useDispatch()

  const location = useLocation()
  console.log('location:', location)

  const increment = () => {
    setCounter(counter + 1)
  }
  const decrement = () => {
    if (counter > 0) setCounter(counter - 1)

  }

  const getData = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(res => {
        if (res && Array.isArray(res) && res.length > 0) {
          setUsers(res)
        } //typeof res == 'array'
      })

  }

  const loadUsers = () => {
    getData()
  }

  useEffect(() => {
    getData()
    // dispatch(getPosts)
  }, [])



  const styles = {
    // 'border: 1 solid #000',
    // color: 'red',
    border: '1px solid #000',
    padding: 10,
    margin: 'auto',
    borderRadius: 10,
    marginBottom: 5,
    // backgroudColor: '#333'
  }


  return (
    <div>
      <h2>Users: <button type="" onClick={() => { loadUsers() }}>Load users</button></h2>
      <div style={{ margin: 50, display: 'flex', gap: 16 }}>
        {users && users.length > 0 &&
          users.map(user => {
            // getCurrentPostsToUser(user.id, posts)
            return <Card title={user.name} key={Math.random()} style={{ width: 200 }}><p  >{user.email}</p></Card>
          })
        }
      </div>
    </div>
  )
}

const NotFoud = () => {
  return (
    <> <h1>Page not found!</h1></>
  )
}
export default App;
