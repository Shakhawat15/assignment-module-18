import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const ListByUser = () => {

    const [data,setData]=useState([])
    const [id,setID]=useState(0)

    const token = localStorage.getItem('authToken');

    const config = {
        headers: {
            Authorization: token
        }
    }

    useEffect(()=>{
        (async ()=>{
            const res=await axios.get("http://localhost:8000/api/v1/postByAuthor", config);
            console.log('first', res)
            setData(res.data['data']);
        })()
    },[id])

    const onDelete = async (id) => {
      let URL="http://localhost:8000/api/v1/post/"+id;
      await axios.delete(URL, config)
      setID(id);
    }

    if (data.length === 0) {
        return (
            <div className="container">
                <div className="row mb-3">
                    <div className="col-10 offset-1 d-flex justify-content-end">
                        <Link to="/create" className="btn btn-primary">
                            Create New Post
                        </Link>
                    </div>
                </div>
                <div className="row">
                    <p className="text-center fs-5 text-dark-emphasis">No Post Available.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="row mb-3">
                <div className="col-10 offset-1 d-flex justify-content-end">
                    <Link to="/create" className="btn btn-primary">
                        Create New Post
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col-10 offset-1">
                   <div className="table-responsive">
                       <table className="table table-striped table-bordered">
                           <thead>
                           <tr className='text-center'>
                               <th>ID</th>
                               <th>Image</th>
                               <th>Title</th>
                               <th>Publish Date</th>
                               <th>Action</th>
                           </tr>
                           </thead>
                           <tbody>
                           {
                               data.map((item,index)=>{
                                   return(
                                       <tr key={index}>
                                           <td className="col-1">{index + 1}</td>
                                           <td className="col-2"><img className="w-25" src={item['photo']}/></td>
                                           <td className="col-5">{item['title']}</td>
                                           <td className="col-2">{new Date(item['createdAt']).toLocaleDateString()}</td>
                                           <td className="col-2">
                                               <div className="d-flex justify-content-center">
                                                   <Link to={"/edit/"+item['_id']} className="btn btn-success btn-sm me-1">Edit</Link>
                                                   <button onClick={async ()=>{await onDelete(item['_id'])}} className="btn btn-danger btn-sm ms-1">Delete</button>
                                               </div>
                                           </td>
                                       </tr>
                                   )
                               })
                           }
                           </tbody>
                       </table>
                   </div>

                </div>
            </div>
        </div>
    );
};

export default ListByUser;