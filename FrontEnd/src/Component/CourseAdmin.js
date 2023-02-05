//import logo from './logo.svg';
import '../App.css';
import './AdminPanel'
import React from 'react';

import {useParams} from "react-router-dom";
import {useState} from "react";
import {useEffect} from "react";
import { Link } from "react-router-dom";
import AdminPanel from './AdminPanel';

const AdminTable=()=>{
  const [detail,setDetail] = useState([])


  useEffect(()=>{

      fetch(`http://localhost:4000/courses/popular`)
      .then(res=>res.json())
      .then((resp)=>{
        console.log("result",resp) 
        setDetail(resp) 
      })
   
  },[])

  return(
  <div className="main">
          <div className="left"><AdminPanel/></div>
          <div className="right">

<div className="Orders">
  <h2>All Courses</h2><br/>
<label>Rows per page: </label>  
<select  className="form-select-2" aria-label="Default select example">
    <option selected>Select Rows</option>
    <option value={1}>One</option>
    <option value={2}>Two</option>
    <option value={3}>Three</option>
  </select>
  <label>&emsp;&emsp;Filter By:</label>
  <select  className="form-select-1" aria-label="Default select example">
    <option selected> Order ID</option>
    <option value={1}>125</option>
    <option value={2}>456</option>
    <option value={3}>637</option>
  </select>
  <label>&emsp;&emsp; Search Here:</label>
  <input type="text" id="myInput" onkeyup="myFunction()" placeholder="Search" />
    <ul id="myUL">
      
    </ul>

  <br/>
    <table className="table">
      <thead>
                   <tr>
                    <th scope="col">Id.</th>
                     <th scope="col">Course Title</th>
                     <th scope="col">Category</th>
                     <th scope="col">Instructor</th>
                     <th scope="col">Total Enrollments</th>
                     <th scope="col">Handle</th>
                     </tr> 
        
      </thead>
      <tbody>
        {detail.map((entry)=>
      <tr>
        <td scope="col">{entry._id}</td>
          <td scope="col">{entry.title}</td>
          <td scope="col">{entry.Categorys[0]?.name}</td>
          <td scope="col">{entry.userData?.fname}</td>
          <td scope="col">{entry.Enrollments.length}</td>
          <td scope="col">
             <Link to={`/course-detail/${entry._id}`}> <button>View</button></Link>
             <Link to={`/edit-course/${entry._id}`}><button>Edit</button></Link>
             {/* <button>Disable</button> */}
          </td>
         
          </tr>
        )}
      </tbody>
    </table>
  </div>
          </div>
      </div>
  );
}


export default AdminTable;
