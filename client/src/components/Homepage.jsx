import React from 'react'
import Navbar from './Navbar'

const Homepage = () => {
const [posts, setPosts] = useState([]);
useEffect(() => {
    getPosts();
})
const getPosts = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch posts');
    const data = await response.json();
    setPosts(data);
  } catch (error) {
    console.error('GET Error:', error.message);
  }
};
  return (
    <div>
      
    </div>
  )
}

export default Homepage