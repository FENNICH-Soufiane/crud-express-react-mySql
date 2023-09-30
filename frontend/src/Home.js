import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  // console.log(data);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:8080/delete/" + id)
      .then((res) => {
        window.location.reload();
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-75 bg-white rounded p-4">
        <h2 className="mb-4">Student List</h2>
        <div className="d-flex justify-content-end mb-3">
          <Link to="/create" className="btn btn-success">
            Create +
          </Link>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((student, index) => (
              <tr key={index}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>
                  <Link
                    to={`/read/${student.id}`}
                    className="btn btn-sm btn-info me-2"
                  >
                    Read
                  </Link>
                  <Link
                    to={`/edit/${student.id}`}
                    className="btn btn-sm btn-primary me-2"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
