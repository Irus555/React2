export const getPosts = async (dispatch) => {
  try {
    setTimeout(async () => {
      dispatch({ type: 'getPosts_onfetch' })

      // setTimeout
      const data = await fetch('http://localhost:3900/posts')
        .then(res => res.json())
        .then(res => {
          if (res.ok && Array.isArray(res.posts) && res.posts.length > 0) {
            setTimeout(() => {
              dispatch({ type: 'getPosts_success', posts: res.posts, loading: false, success: true })
            }, 3000)

          }
          if (!res.ok) {
            dispatch({ type: 'getPosts_error', posts: [], loading: false, success: false, errMsg: 'Ошибка при загрузки апи' })
            
          }

        })
    }, 0)
  } catch (error) {
    dispatch({ type: 'getPosts_error', posts: [], loading: false, success: false, errMsg: 'Ошибка при загрузки апи' })
  }
}

export const getPost = async (dispatch, id) => {
  try {
    setTimeout(async () => {
      dispatch({ type: 'getPost_onfetch' })

      // setTimeout
      await fetch(`http://localhost:3900/post/${id}`)
        .then(res => res.json())
        .then(res => {
          console.log('getPost_success')
          if (res.ok && typeof res.post == 'object') {

            setTimeout(() => {
              dispatch({ type: 'getPost_success', posts: [res.post], loading: false, success: true })
            }, 3000)

          }
        })
    }, 0)
  } catch (error) {
    dispatch({ type: 'getPost_error', posts: [], loading: false, success: false, errMsg: 'Ошибка при загрузки апи' })
  }
}

export const updatePost = async (dispatch, id, data) => {
  try {
    setTimeout(async () => {
      dispatch({ type: 'getPost_onfetch' })

      // setTimeout
      await fetch(`http://localhost:3900/post/${id}/update`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(res => {
          console.log('getPost_success')
          if (res.ok && typeof res.post == 'object') {

            setTimeout(() => {
              dispatch({ type: 'updatePost_success', posts: [res.post], loading: false, success: true })
            }, 3000)

          }
        })
    }, 0)
  } catch (error) {
    // dispatch({ type: 'getPost_error', posts: [], loading: false, success: false, errMsg: 'Ошибка при загрузки апи' })
  }
}

export const createPost = async (dispatch, data) => {
  try {
    setTimeout(async () => {
      dispatch({ type: 'getPost_onfetch' })

      // setTimeout
      await fetch(`http://localhost:3900/post/add`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(res => {
          // console.log('createPost_success')
          if (res.ok && typeof res.postId == 'string') {

            setTimeout(() => {
              dispatch({ type: 'createPost_success', postId: [res.postId], loading: false, success: true })
            }, 3000)

          }
        })
    }, 0)
  } catch (error) {
    // dispatch({ type: 'getPost_error', posts: [], loading: false, success: false, errMsg: 'Ошибка при загрузки апи' })
  }
}
