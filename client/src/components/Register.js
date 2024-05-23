import React, { useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/upload.png";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import convertToBase64 from "../helper/convert";
import styles from "../styles/Username.module.css";
import { registerValidation } from "../helper/validate";

export default function Register() {
  const [file, setFile] = useState();
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
        values=await Object.assign(values,{profile:file || ''})
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
            <h4 className="text-3xl font-bold pt-4">Register</h4>
            <span className="py-2 text-sm w-2/3 text-center text-gray-500">
              Happy to join you!
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            {/* <div className="profile flex flex-col justify-center items-center py-4">
              <label>
                <img
                  htmlFor="profile"
                  src={file || avatar}
                  className={styles.profile_img}
                  style={{ width: "100px" }}
                  alt="avatar"
                />
              </label>
              <input  onChange={onUpload} type="file" id="profile" name="profile"></input>
            </div> */}
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
              <input
                {...formik.getFieldProps("email")}
                className={styles.textbox}
                type="text"
                placeholder="Email"
              />
              <input
                {...formik.getFieldProps("username")}
                className={styles.textbox}
                type="text"
                placeholder="Username"
              />
              <input
                {...formik.getFieldProps("password")}
                className={styles.textbox}
                type="text"
                placeholder="Password"
              />
              <button className={styles.btn} type="submit">
                Register
              </button>
            </div>

            <div className="text-center">
              <span className="text-gray-500 text-xs">
                Already Register?{" "}
                <Link className="text-red-500" to="/">
                  Login Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
