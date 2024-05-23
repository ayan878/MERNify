import React from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/profile.png";

import styles from "../styles/Username.module.css";

export default function Username() {


  return (
    <div className="container mx-auto">
    

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass} style={{width:"40%"}}>
          <div className="title flex flex-col items-center">
            <h4 className="text-3xl font-bold">Recovery</h4>
            <span className="py-2 text-sm text-center text-gray-500">
              Enter OTP to recover password
            </span>
          </div>

          <form className="" onSubmit={""}>
          <div className="profile flex justify-center py-4">
              <img src={avatar} className={styles.profile_img} alt="avatar" />
            </div> 
            <div className="input text-center ">
                
            <span className="py-4 px-4 text-xs text-center  text-gray-500">
              Enter 6 digit OTP sent to your email address
            </span>
            </div>

            <div className="textbox flex flex-col items-center gap-4">
              <input
                className={styles.textbox}
                type="text"
                placeholder="OTP"
              />
              <button className={styles.btn} type="submit">
                Let's Go
              </button>
            </div>

            <div className="text-center">
              <span className="text-gray-500 text-xs">
                Cant't get OTP?{" "}
                <Link className="text-red-500">
                  Resend
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
