import React, { useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/upload.png";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import convertToBase64 from "../helper/convert";
import styles from "../styles/Username.module.css";
import { profileValidation } from "../helper/validate";

export default function Profile() {
  const [file, setFile] = useState();
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      mobile:"",
      email: "",
    },
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || "" });
      toast.success("Form submitted successfully!");
      console.log(values);
    },
  });
  //** formik doesn't support the file upload so we need to crate this handler  */
  const onUpload = async (e) => {
    // files: This is a property of the target element, which is a FileList object containing all the files selected in the input element.
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass} style={{ height: "510px" }}>
          <div className="title flex flex-col items-center">
            <h4 className="text-3xl font-bold pt-4">Profile</h4>
            <span className="py-2 text-sm w-2/3 text-center text-gray-500">
              You can update the details
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex flex-col justify-center items-center py-4">
              <label htmlFor="profile">
                <img
                  src={file || avatar}
                  className={styles.profile_img}
                  style={{ width: "100px", cursor: "pointer" }}
                  alt="avatar"
                />
              </label>
              <input
                onChange={onUpload}
                type="file"
                id="profile"
                name="profile"
                style={{ display: "none" }}
              />
            </div>

            <div className="textbox flex flex-col items-center gap-4">
              <div className="name flex w-4/5 gap-4">
                <input
                  {...formik.getFieldProps("firstname")}
                  className={styles.textbox}
                  type="text"
                  placeholder="FirstName"
                />
                <input
                  {...formik.getFieldProps("lastname")}
                  className={styles.textbox}
                  type="text"
                  placeholder="LastName"
                />
              </div>
              <div className="name flex w-4/5 gap-4">
                <input
                  {...formik.getFieldProps("mobile")}
                  className={styles.textbox}
                  type="text"
                  placeholder="Mobile No."
                />
                <input
                  {...formik.getFieldProps("email")}
                  className={styles.textbox}
                  type="text"
                  placeholder="Email"
                />
              </div>
              <input
                {...formik.getFieldProps("address")}
                className={styles.textbox}
                type="text"
                placeholder="Address"
              />
              <button className={styles.btn} type="submit">
                Update
              </button>
            </div>

            <div className="text-center">
              <span className="text-gray-500 text-xs">
                come back later{" "}
                <Link className="text-red-500" to="/">
                  Logout
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
