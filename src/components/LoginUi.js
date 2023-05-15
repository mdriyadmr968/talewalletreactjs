import React from "react";
import useAll from "./useAll";
import mail from "./images/mail.svg";
import talewallet from "./images/talewallet.png";
import "./talewallet.css";

const LoginUi = () => {
  const { sendOTP } = useAll();
  return (
    <div className="flex flex-col gap-10 w-60 mx-auto">
      <div className="imgcontainer">
        <img src={talewallet} alt="Avatar" className="avatar" />
      </div>
      <div className="flex flex-col items-center">
        <div className="font-bold text-2xl text-tale">
          Welcome to {process.env.REACT_APP_WALLET_NAME}
        </div>
        <div className="font-semibold text-lg">Veirfy your email address</div>
      </div>
      <div
        className="flex flex-col gap-20 items-start"
        id="email_address_input"
      >
        <div className="flex shadow-1 w-full  email-input-container">
          <span>
            <img src={mail} className="" />
          </span>
          <input
            type="text"
            className="border-none outline-none"
            placeholder="Enter your email"
            name="uname"
            id="otp_email_address"
            required
          />
        </div>
        <div className="w-full">
          <span id="sb_rb_error"></span>
          <button
            className="btn primary-btn"
            type="submit"
            id="sbt_email_otp_btn"
            onClick={() =>
              sendOTP(document.getElementById("otp_email_address").value)
            }
          >
            Continue
          </button>
        </div>

        <div className="text-center w-full">
          You will get an OTP on this email
        </div>
      </div>
    </div>
  );
};

export default LoginUi;
