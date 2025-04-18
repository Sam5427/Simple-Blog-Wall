import React, { useState } from 'react';
import axios from 'axios';

function PostForm({ onPostCreated }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) formData.append('image', image);

    try {
      await axios.post('http://127.0.0.1:5000/posts', formData);
      setTitle('');
      setContent('');
      setImage(null);
      onPostCreated();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-12">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="form-control"
            required
          />
        </div>
        <div className="col-12">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            className="form-control"
            rows="4"
            required
          />
        </div>
        <div className="col-12">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="form-control"
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary w-100">
            Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
