import React, { useEffect, useState } from 'react'
import { Card, Form, Skeleton, Typography, Input, Button } from 'antd'
import moment from 'moment'
import { ButtonUI } from '../ui/ButtonUI/ButtonUI'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, getPosts } from '../../store/actions/postsActions'


export const Posts = () => {

  const navigation = useNavigate();
  const dispatch = useDispatch();

  // const [posts, setPosts] = useState([])
  // const [isLoading, setLoading] = useState(true)
  const [addPostFlag, setAddPostFlag] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    short_desc: '',
    full_desc: ''
  })

  const { posts, loading, success, errMsg } = useSelector((state) => state.posts)

  useEffect(() => {
    dispatch(getPosts)
  }, [dispatch])

  // const getData = () => {
  //   fetch('http://localhost:3900/posts')
  //     .then(res => res.json())
  //     .then(res => {
  //       console.log('fetch')
  //       if (res.ok && Array.isArray(res.posts) && res.posts.length > 0) {
  //         setTimeout(() => {
  //           // setPosts(res.posts)
  //           // setLoading(false)
  //         }, 2000)

  //       }
  //     })

  // }


  const goToPost = (id = '') => {
    if (id.length > 0) {
      navigation(`/post/${id}`)
    }
  }

  const createPostMethon = async () => {
    await createPost(dispatch, formData)
    navigation('/posts')
  }

  return (
    <div>

      {loading && !success &&
        <Skeleton active />
      }

      {!loading && !success && errMsg.length > 0 &&
        <Typography style={{ color: 'red' }}>{errMsg}</Typography>
      }

      {!loading && !addPostFlag &&
        <div style={{ marginBottom: 10 }}>
          <Button onClick={() => setAddPostFlag(!addPostFlag)}> Добавить новый пост</Button>
        </div>
      }

      {!loading && addPostFlag &&
        <Form>
          <Form.Item label={'Заголовок'}>
            <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
          </Form.Item>
          <Form.Item label={'Краткое содержание'}>
            <Input.TextArea rows={4} value={formData.short_desc} onChange={(e) => setFormData({ ...formData, short_desc: e.target.value })} />
          </Form.Item>
          <Form.Item label={'Полное содержание'}>
            <Input.TextArea rows={4} value={formData.full_desc} onChange={(e) => setFormData({ ...formData, full_desc: e.target.value })} />
          </Form.Item>
          <Form.Item >
            <Button onClick={() => createPostMethon()}>Создать</Button>
          </Form.Item>
        </Form>
      }

      {!loading && !addPostFlag && posts && Array.isArray(posts) &&
        posts.map((item, index) => {
          return <Card key={Math.random()} title={item.title} style={{margin: 5, boxShadow:'0px 0px 3px' }}>
            <p style={{ wordBreak: 'break-all' }}>{item.short_desc}</p>
            <span
              style={{ color: '#959595' }}
            >{moment(item.create_date).format('DD.MM.YYYY HH:m:s')}</span>
            <br />
            <br />
            <ButtonUI label="Открыть" onClick={() => goToPost(item._id)} />
          </Card>
        })
      }
    </div>
  )
}
