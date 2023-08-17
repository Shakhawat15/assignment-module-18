import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const List = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get('http://localhost:8000/api/v1/posts');
      setData(res.data['data']);
    })();
  }, []);

  const truncateContent = (content, maxLength) => {
    if (content.length <= maxLength) {
      return content;
    }
    return content.slice(0, maxLength) + '...';
  };

  return (
    <div className="container">
      <div className="row d-flex">
        {data.map((item, index) => (
          <div className="col-4 mb-4" key={index}>
            <div className="card h-100">
              <img src={item['photo']} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{item['title']}</h5>
                <p className="card-text">{truncateContent(item['content'], 50)}</p>
                <p className="card-text">Author: {item['author']['name']}</p>
                <p className="card-text">Published on: {new Date(item['createdAt']).toLocaleDateString()}</p>
                <Link to={`/post/${item['_id']}`} className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
