import React, { useState } from 'react';

function PostList({ posts }) {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <div
          key={post._id}
          onClick={() => setSelectedPost(post)}
          className="p-4 border rounded-lg shadow hover:shadow-md cursor-pointer transition duration-200 bg-white"
        >
          <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
          <p className="text-sm text-gray-700 mb-2">{post.content.slice(0, 100)}...</p>
          {post.imageUrl && (
            <img
              src={`http://127.0.0.1:5000${post.imageUrl}`}
              alt="Post"
              className="w-full h-40 object-cover rounded"
            />
          )}
          <p className="text-xs text-gray-500 mt-2">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      ))}

      {selectedPost && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="bg-white p-6 rounded shadow-lg w-full max-w-xl overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold">{selectedPost.title}</h2>
            <p className="mt-2 text-gray-800">{selectedPost.content}</p>
            {selectedPost.imageUrl && (
              <img
                src={`http://localhost:5000${selectedPost.imageUrl}`}
                alt="Post"
                className="w-full mt-4 rounded"
              />
            )}
            <p className="text-sm text-gray-500 mt-2">
              {new Date(selectedPost.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostList;
