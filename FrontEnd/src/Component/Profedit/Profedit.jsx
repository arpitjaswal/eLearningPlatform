import React from "react";
import user from "../user.json";
import { useState, useEffect } from "react";
import Show from "../Showcase/Showcase";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Layout from "../Layout";
import LayoutGuest from "../LayoutGuest";
import Header from "../Header";
var Slider = require("react-slick");

const Profedit = () => {
  return (
    <>
      <Header />
      <div className="main">
        <div className="left">
          <Show />
        </div>
        <div className="right">
          <Edit />
        </div>
      </div>
    </>
  );
};

let Edit = (match) => {
  const [values, setValues] = useState({
    fname: "",
    lname: "",
    bio: "",
    photo: "",
    dob: "",
    city: "",
  });

  console.log("v" ,values)
  const clickSubmit = async (e) => {
    e.preventDefault();
    console.log("get",values.date);
    const uploadData = new FormData();
    // for (const key in values) {
    //   if (key === "profile_picture") {
    //     uploadData.append(key, "");
    //   } else uploadData.append(key, values[key]);
    // }
     uploadData.append("fname", values.fname);
     uploadData.append("lname", values.lname);
    if(values.bio!=null)
     uploadData.append("bio", values.bio);
    if(values.city!=undefined)
      uploadData.append("city", values.city);
    if(values.dob)
    uploadData.append(
      "dob",
      new Date(document.getElementById("account-date").value)
    );
    if(values.photo!=undefined)
      uploadData.append("profile_picture", values.photo);
    // console.log(values.dob)
    await fetch(
      `http://localhost:4000/user/${
        JSON.parse(localStorage.getItem("user"))?._id
      }`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: uploadData,
      }
    )
      .then((res) => res.json())
      .then((resp) => {
        console.log(resp);
        if (resp.acknowledged == true && resp.success == "user updated") {
          localStorage.setItem("user", JSON.stringify(values));
          for (const [key, value] of uploadData) {
            // console.log(key, value);
          }
          alert("Update done");
        }
      });

    for (const [key, value] of uploadData) {
      console.log(key, value);
    }
  };
  const init = async () => {
    //console.log(JSON.parse(localStorage.getItem("user")));
    // setValues(JSON.parse(localStorage.getItem("user")));
   await fetch(`http://localhost:4000/user/${JSON.parse(localStorage.getItem("user"))._id}/profile`)
        .then(res=>res.json())
        .then(res=>{
          console.log(res);
          if(res && res[0]){
            setValues(res[0]);
            console.log("fd",res[0])
            localStorage.setItem("user",JSON.stringify(res[0]));
          }
        })
    // setValues(...values,dob=)
  };
  //console.log("k" + values);
  useEffect(() => {
    init();
  }, []);
  const { fname, lname, email, addr, dob, city, bio, pin, photo } = values;
  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;

    setValues({ ...values, [name]: value });
    console.log("ipdate",values.date)
  };

  return (
    <>
      <h5 className="pre-label font-size-base head">Profile settings</h5>
      <div className="bg-white p-4 p-lg-5 br-sm shadow-sm mb-3 mb-lg-5">
        <div className="row">
          <div className="col-sm-6">
            <div className="form-group">
              <label className="pre-label pre-label-sm" htmlFor="account-fn">
                First Name
              </label>
              <input
                className="form-control form-control-simple"
                onChange={handleChange("fname")}
                type="text"
                id="account-fn"
                defaultValue={values.fname}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label className="pre-label pre-label-sm" htmlFor="account-ln">
                Last Name
              </label>
              <input
                className="form-control form-control-simple"
                onChange={handleChange("lname")}
                type="text"
                id="account-ln"
                defaultValue={values.lname}
              />
            </div>
          </div>
          <div className="col-sm-6 length">
            <div className="form-group">
              <label
                className="pre-label pre-label-sm "
                htmlFor="account-email"
              >
                Date of Birth
              </label>
              <input
                className="form-control form-control-simple"
                onChange={handleChange("dob")}
                type="date"
                id="account-date"
                defaultValue={values?.dob?.slice(0,10)}
              />
            </div>
          </div>
          <div className="col-sm-6 length">
            <div className="form-group">
              <label
                className="pre-label pre-label-sm "
                htmlFor="account-email"
              >
                Works as:
              </label>
              <input
                className="form-control form-control-simple"
                onChange={handleChange("work")}
                type="text"
                id="account-email"
                defaultValue={values.work}
              />
            </div>
          </div>
          <div className="col-sm-12 length">
            <div className="form-group">
              <label
                className="pre-label pre-label-sm "
                htmlFor="account-email"
              >
                Email address
              </label>
              <input
                className="form-control form-control-simple"
                onChange={handleChange("email")}
                type="text"
                id="account-email"
                defaultValue={values.email}
                disabled
              />
            </div>
          </div>
          <div className="col-sm-12 length">
            <div className="form-group">
              <label
                className="pre-label pre-label-sm "
                htmlFor="account-email"
              >
                Bio:
              </label>
              <textarea
                className="form-control form-control-simple"
                onChange={handleChange("bio")}
                type="text"
                id="account-email"
                defaultValue={values.bio}
              />
            </div>
          </div>
          <div className="col-sm-12">
            <div className="form-group">
              <label className="pre-label pre-label-sm" htmlFor="account-city">
                City
              </label>
              <input
                className="form-control form-control-simple"
                onChange={handleChange("city")}
                type="text"
                id="account-city"
                defaultValue={values.city}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label
                className="pre-label pre-label-sm"
                htmlFor="account-address"
              >
                Address Line
              </label>
              <input
                className="form-control form-control-simple"
                onChange={handleChange("addr")}
                type="text"
                id="account-address"
                defaultValue={values.addr}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label className="pre-label pre-label-sm" htmlFor="account-zip">
                PIN/ZIP Code
              </label>
              <input
                className="form-control form-control-simple"
                onChange={handleChange("pin")}
                type="text"
                id="account-zip"
                defaultValue={values.pin}
              />
            </div>
          </div>
          <div className="centring">
            <div className="form-group">
              <label className="pre-label pre-label-sm" htmlFor="account-fn">
                Upload Image
              </label>
              <input
                onChange={handleChange("photo")}
                className="form-control form-control-simple"
                name="photo"
                type="file"
                id="account-fn"
                defaultValue=""
              />
            </div>
          </div>
          <div className="col-12">
            <div className="d-flex flex-wrap justify-content-between align-items-center">
              <button
                className="btn btn-rounded btn-outline-primary btn-sm px-3 mt-3  "
                type="button"
                onClick={(e) => clickSubmit(e)}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profedit;
