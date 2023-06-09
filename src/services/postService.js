export const getCurrentPostsToUser = (userId, posts ) => {
  let currentPosts = []

  currentPosts = posts.find(post => 
    {
      if (userId == userId) {
        return post
      }
    })

  return currentPosts;
}
