import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const Read = () => {
  const { id } = useParams();
  const [student, setStudent] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/read/" + id)
      .then((res) => {
        console.log(res);
        setStudent(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, [id]);
  // console.log(student);

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <h2>Student Detail</h2>
        <h4>{student.id}</h4>
        <h4>{student.name}</h4>
        <h4>{student.email}</h4>
        <Link to="/" className="btn btn-primary me-2">Back</Link>
        <Link to={`/edit/${student.id}`} className="btn btn-info">Edit</Link>
      </div>
    </div>
  );
};

export default Read;
