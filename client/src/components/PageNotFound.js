import React, { useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/profile.png";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";

import styles from "../styles/Username.module.css";
import { usernameValidate } from "../helper/validate";

export default function Username() {
  const [file, setFile] = useState();
  const formik = useFormik({
    initialValues: {
      username: "Example123",
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      toast.success("Form submitted successfully!");
      console.log(values);
    },
  });
  const onUpload = (e) => {
    const uploadImage = e.target.files[0];
    if (uploadImage) {
      const reader = new FileReader();
      console.log(reader);
      reader.onload = () => {
        setFile(reader.result);
      };
      reader.readAsDataURL(uploadImage);
    }
  };

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-3xl font-bold">Hello Again!</h4>
            <span className="py-2 text-sm w-2/3 text-center text-gray-500">
              Explore More by connecting with us.
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <div className="profile flex flex-col justify-center items-center py-4">
                <label htmlFor="profile">
                  <img
                    src={file}
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
            </div>

            <div className="textbox flex flex-col items-center gap-4">
              <input
                {...formik.getFieldProps("username")}
                className={styles.textbox}
                type="text"
                placeholder="Username"
              />
              <button className={styles.btn} type="submit">
                Let's Go
              </button>
            </div>

            <div className="text-center">
              <span className="text-gray-500 text-xs">
                Not a Member{" "}
                <Link className="text-red-500" to="/register">
                  Register Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
