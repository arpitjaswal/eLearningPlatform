//import logo from './logo.svg';
// import './App.css';
import '../Styles/add-course.css';
import {Link} from "react-router-dom";
import Header from './Header';
import { Button, FormGroup, FormControl, ControlLabel, Form } from "react-bootstrap";
import { useEffect } from 'react';
import {useState} from "react";
import React from 'react';

function Add_course() {

  const [thumbnail,setthumbnail] = useState(null);
  const [categories,setCategory] = useState(null);
  const initialState ={
    title:"",
    description:"",
    thumbnail:"",
    category:"62624057a95105869d739ae0"
  }
  const initialStateErrstate ={
    title:false,
    description:false,
    thumbnail:false,
    category:false
  }
  useEffect(()=>{

    fetch('http://localhost:4000/category')
        .then(res => res.json())
        .then(res =>{
          console.log(res);
          setCategory(res);
      })
  },[])

  const validateCategory = (ev)=>{
    console.log(course.category)
    if(course.category === "")
      return false;
    return true;
  }

  const handleChange = (ev) => {
    let { name, value } = ev.target;
    if(name === "thumbnail"){
      const files = Array.from(ev.target.files)
      console.log(files)
      setthumbnail(files)
      console.log(thumbnail)

    }
    setCourse({
      ...course,
      [name]: value,
    });
  };
  const[course,setCourse] = useState(initialState);
  const [courseErr, setCourseErr] = useState(initialStateErrstate);
  async function Add_course(event)
  {

    const token = localStorage.getItem('token')
    if(!token){
      window.location.href = '/login'
    }
    event.preventDefault()
    let formData = new FormData();
    const thub = document.getElementById("validationCustom03");
    formData.append("thumbnail",thub.files[0]);
    formData.append("title",course.title);
    formData.append("description",course.description);
    formData.append("category",course.category);
    const result = await fetch('http://localhost:4000/courses', {
      method: 'POST',
      headers:
          {
            'accept': 'application/json',
            'authorization':`Bearer ${token}`
          },
      body: formData,
    })
    const data = await result.json();
    console.log(data)
    if(data._id){
      alert("Course Added Successfully")
      window.location.href = '/InsCourse'
    }
    else{
      alert("Course Not Added")
      window.location.href = '/InsCourse'
    }
    console.log("result",data);
  }

  const categoriesOptions =  categories!=null?categories.map(category =>{
    return <option value={category._id} key={category._id} >{category.name}</option>
  }):null;


  function validateTitle(event) {
    const {name , value } = event.target
    console.log(name,value)
    if (value.length!=0 && value.length<= 50 ) 
    {
        setCourseErr({
          ...courseErr,
          [name]: false,
        });
        setCourse({
          ...course,
          [name]: value,
        })
    } else {
        setCourseErr({
          ...courseErr,
          [name]: true,
        });
        setCourse({
          ...course,
          [name]: value,
        });
    }
}
// function validateDesc(event)
// {
//   const {name , value } = event.target
//     console.log(name,value)
//     if (value.length!=0 && value.length<= 50 ) 
//     {
//         setCourseErr({
//           ...course,
//           [name]: false,
//         });
//         setCourse({
//           ...course,
//           [name]: value,
//         })
//     } else {
//         setCourseErr({
//           ...course,
//           [name]: true,
//         });
//         setCourse({
//           ...course,
//           [name]: value,
//         });
//     }
// }
  return (
    <>
    <Header/>
      <body className="main">
        
      <div className="container">
        <div className="signup">
          <form id="addCourseForm" className="row g-3 needs-validation" enctype="multipart/form-data" noValidate>

            <center><h2>Add Your Course Here</h2></center>
            <div className="col-md-12">
              {/* <label for="validationCustom01" className="form-label">First name</label> */}

              <input name='title' placeholder='Enter Course Title' value={course.title}
                      type="text" className={`form-control input100 ${ courseErr.title ? "is-invalid" : "is-valid"}`} 
                     id="validationCustom01" onChange={validateTitle} required />
            </div>
            {
                            courseErr.title ?
                                <span className="invalid-feedback">Enter valid Title</span>
                                : null
                        }
            {/*<div className="col-md-12">*/}
            {/*  /!* <label for="validationCustomUsername" className="form-label">Email</label> *!/*/}
            {/*  <div className="input-group has-validation">*/}
            {/*    <input name='user' placeholder='Enter Course Description' value="6239616b41c54b81336c1963"*/}
            {/*           type="text-area" className="form-control" id="validationCustomUsername"*/}
            {/*           aria-describedby="inputGroupPrepend" required/><br/>*/}
            {/*  </div>*/}
            {/*</div>*/}
            {/* <div className="col-md-12">
              <div className="input-group has-validation">
                <input name='category' placeholder='Enter Course Description' value={course.category}
                       onChange={handleChange}
                       type="text-area" className="form-control" id="validationCustomUsername"
                       aria-describedby="inputGroupPrepend" required/><br/>
              </div>
            </div> */}
            <div className="col-md-12">
              <div className="input-group has-validation">
                <Form.Select value={course.category}  name="category" size="lg" onChange={handleChange} isValid={validateCategory()}>
                  <option value=""> Select any category</option>
                  {categoriesOptions}
                </Form.Select>
              </div>
            </div>
            <div className="col-md-12">
              {/* <label for="validationCustomUsername" className="form-label">Email</label> */}
              <div className="input-group has-validation">
                <input name='description' placeholder='Enter Course Description' value={course.description}
                         type="text-area" className={`form-control input100 ${ courseErr.description ? "is-invalid" : "is-valid"}`}
                       id="validationCustomUsername" onChange={validateTitle} aria-describedby="inputGroupPrepend" required/><br/>
              </div>
              {
                            courseErr.desc ?
                                <span className="invalid-feedback">Enter valid Description</span>
                                : null
                        }
            </div>
            <div className="col-md-12">
              {/* <label for="validationCustom03" className="form-label">City</label> */}
              <input name='thumbnail' placeholder='Enter Course Thumbnail' value={course.thumbnail}
                     onChange={handleChange}  type="file" className="form-control"
                     id="validationCustom03" required/>
            </div>
            <Link to="/edit-course">
            <div className="col-md-12">
              <center>
                <button className="btn1 btn2" type="submit" onClick={Add_course}>Add Course</button>
              </center>
            </div>
            </Link>
          </form>
        </div>
      </div>
      </body>
    </>
  );
}

export default Add_course;