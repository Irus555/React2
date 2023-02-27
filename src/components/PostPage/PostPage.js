import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import moment from 'moment'
import { Typography, Spin } from 'antd'

const { Title } = Typography

export const PostPage = () => {
  const [post, setPost] = useState({})
  const [isLoading, setLoading] = useState(true)
  const params = useParams()

  const { id } = params

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    if (id.length > 0) {
      fetch(`http://localhost:3900/post/${id}`)
        .then(res => res.json())
        .then(res => {
          if (res.ok && typeof res.post == 'object') {
            setTimeout(() => {
              setPost(res.post)
              setLoading(false)
            }, 2000)

          }
        })
    }


  }
  return (
    <div style={{ margin: '0 auto', width: '100%', textAlign: 'center' }}>
      {isLoading &&
        <Spin tip="Загрузка..." size="large" />
      }

      {!isLoading && post && post?.title && post?.short_desc && post?.full_desc &&
        <div>
          <div>
            <Title level={1}>{post.title}</Title>
          </div>

          <div>
            <Title level={5}>{post.full_desc}</Title>
          </div>

          <div>
            <Title type="secondary" style={{ fontSize: 12 }}>{moment(post.create_date).format('DD.MM.YYYY HH:m:s')}</Title>
          </div>
        </div>
      }
    </div>
  )
}