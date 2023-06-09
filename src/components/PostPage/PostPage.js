import React, { useEffect, useState } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import moment from 'moment'
import { Typography, Spin, Button, Form, Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getPost, updatePost } from '../../store/actions/postsActions'


const { Title } = Typography

export const PostPage = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const navigation = useNavigate()

  const { loading, posts, success } = useSelector((state) => state.posts)


  const [editedPost, setEditedPost] = useState({
    title: '',
    short_desc: '',
    full_desc: ''
  })

  const [showEditForm, setShowEditForm] = useState(false)


  const { id } = params

  useEffect(() => {
    getPost(dispatch, id)
  }, [dispatch])

  useEffect(() => {
    setEditedPostMethod()
  }, [posts])

  const setEditedPostMethod = () => {
    if (Array.isArray(posts) && posts.length > 0) {
      setEditedPost({
        ...editedPost,
        title: posts[0].title,
        short_desc: posts[0].short_desc,
        full_desc: posts[0].full_desc,
      })
    }

  }

  const updatePostMethod = () => {
    updatePost(dispatch, id, editedPost)
    navigation('/posts')
  }


  return (
    <div style={{ margin: '0 auto', width: '100%', textAlign: 'center' }}>
      {loading && !success &&
        <Spin tip="Загрузка..." size="large" />
      }
      {!loading && !showEditForm &&
        <Button type='primary' onClick={() => setShowEditForm(!showEditForm)}> Редактировать </Button>
      }

      {!loading && showEditForm &&
        <div>
          <Form>
            <Form.Item label={'Заголовок'}>
              <Input value={editedPost.title} onChange={(e) => setEditedPost({...editedPost, title: e.target.value}) }/>
            </Form.Item>
            <Form.Item label={'Краткое содержание'}>
              <Input.TextArea rows={4} value={editedPost.short_desc} onChange={(e) => setEditedPost({...editedPost, short_desc: e.target.value}) } />
            </Form.Item>
            <Form.Item label={'Полное содержание'}>
              <Input.TextArea rows={4} value={editedPost.full_desc} onChange={(e) => setEditedPost({...editedPost, full_desc: e.target.value}) } />
            </Form.Item>
            <Form.Item >
              <Button onClick={() => updatePostMethod() }>Сохранить</Button>
            </Form.Item>
          </Form>
        </div>
      }

      {!loading && !showEditForm && success && posts &&
        posts.map(post => {
          return (<div>
            <div>
              <Title level={1}>{post.title}</Title>
            </div>

            <div>
              <Title level={5}>{post.full_desc}</Title>
            </div>

            <div>
              <Title type="secondary" style={{ fontSize: 12 }}>{moment(post.create_date).format('DD.MM.YYYY HH:m:s')}</Title>
            </div>
          </div>)
        })
      }
    </div>
  )
}
