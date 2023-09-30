// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const Update = () => {
//   const {id} = useParams()
//   const [student, setStudent] = useState([]);

//   const [values, setValues] = useState({
//     name: student.name,
//     email: student.email,
//   });
//   useEffect(() => {
//     axios
//     .get("http://localhost:8080/read/" + id)
//     .then((res) => {
//       console.log(res);
//       setValues({
//         name: res.data[0].name,
//         email: res.data[0].email,
//       });
//     })
//     .catch((err) => console.log(err));
//   }, [id]);
//   console.log(values)
//   return (
//     <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
//       <div className="w-50 bg-white rounded p-3">
//         <form>
//           <h2>Update Student</h2>
//           <div className="mb-2">
//             <label htmlFor=""></label>
//             <input
//               type="text"
//               placeholder="Enter Name"
//               className="form-control"
//               onChange={(e) => setValues({ ...values, name: e.target.value })}
//               value={values.name}
//             />
//           </div>
//           <div className="mb-2">
//             <label htmlFor="">Email</label>
//             <input
//               type="email"
//               placeholder="Enter Email"
//               className="form-control"
//               onChange={(e) => setValues({ ...values, email: e.target.value })}
//               value={values.email}
//             />
//           </div>
//           <button className="btn btn-success">Update</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Update;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const { id } = useParams();
  const [values, setValues] = useState({
    name: "", // Initialize with an empty string
    email: "", // Initialize with an empty string
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/read/" + id)
      .then((res) => {
        console.log(res);
        setValues({
          name: res.data[0].name,
          email: res.data[0].email,
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:8080/update/" + id, values)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Update Student</h2>
          <div className="mb-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter Name"
              className="form-control"
              value={values.name} // Use value instead of onChange
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              className="form-control"
              value={values.email} // Use value instead of onChange
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <button className="btn btn-success">Update</button>
        </form>
      </div>
    </div>
  );
};

export default Update;
