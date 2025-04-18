import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostForm from './PostForm';
import PostList from './PostList';

function App() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:5000/posts');
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className='col-md-2'></div>
        <div className='col-md-8'>
        <div className="container p-4">
      <h1 className="text-3xl font-bold mb-4">Simple Blog Wall</h1>
      <PostForm onPostCreated={fetchPosts} />
      <PostList posts={posts} />
    </div>
        </div>
        <div className='col-md-2'></div>
      </div>
    </div>
  );
}

export default App;
