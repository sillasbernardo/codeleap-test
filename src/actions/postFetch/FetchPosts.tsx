import axios from "axios"

const BACKEND_URL = "https://dev.codeleap.co.uk/careers/"

// Get the first 10 posts from API
export const getPosts = async () => {
  const postsData = await axios.get(BACKEND_URL);

  return postsData.data;
}

// Load more posts from API (infinite scrolling)
export const loadMorePosts = async (offset: number) => {
  const morePosts = await axios.get(BACKEND_URL, {
    params: {
      limit: 10,
      offset: offset
    }
  })

  return morePosts.data;
}

export const sendPost = async (title: string, content: string, username: string) => {
  await axios.post(BACKEND_URL, {
    username: username,
    title: title,
    content: content
  })
}

export const updatePost = async (id: number, title: string, content: string) => {
  await axios.patch(BACKEND_URL + id + "/", {
    title: title,
    content: content
  })
}

export const deletePost = async (id: number) => {
  await axios.delete(BACKEND_URL + id + "/");
}