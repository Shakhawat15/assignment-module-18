import { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';

const CreateUpdatePostForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('authToken');

    const config = {
        headers: {
            Authorization: token
        }
    }

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');

    useEffect(() => {
        if (id) {
            // Fetch post data if in update mode
            (async () => {
                try {
                    const response = await axios.get(`http://localhost:8000/api/v1/post/${id}`);
                    const post = response.data.data;
                    setTitle(post.title);
                    setContent(post.content);
                    setPhotoUrl(post.photo);
                } catch (error) {
                    console.error('Error fetching post:', error);
                }
            })();
        }
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const postData = { title, content, photo: photoUrl };

        console.log(postData)

        try {
            if (id) {
                // Update existing post
                const response = await axios.put(`http://localhost:8000/api/v1/post/${id}`, postData, config);
                if (response.status === 200) {
                    navigate("/dashboard");
                }
            } else {
                // Create new post
                const response = await axios.post('http://localhost:8000/api/v1/post', postData, config);
                if (response.status === 200) {
                    navigate("/dashboard");
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container mt-5">
            {id ? <h2>Edit Post</h2> : <h2>Create New Post</h2>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        Title
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="photoUrl" className="form-label">
                        Photo URL
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="photoUrl"
                        value={photoUrl}
                        onChange={(e) => setPhotoUrl(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">
                        Content
                    </label>
                    <textarea
                        className="form-control"
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    {id ? 'Update Post' : 'Create Post'}
                </button>
            </form>
        </div>
    );
};

export default CreateUpdatePostForm;
