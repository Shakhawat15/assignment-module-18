import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/post/${id}`);
        setPost(response.data['data']);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    })();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <div className="card">
            <img src={post['photo']} className="card-img-top" alt="..." />
            <div className="card-body">
              <h2 className="card-title">{post['title']}</h2>
              <p className="card-text">Author: {post['author']['name']}</p>
              <p className="card-text">Published on: {new Date(post['createdAt']).toLocaleDateString()}</p>
              <p className="card-text">{post['content']}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
