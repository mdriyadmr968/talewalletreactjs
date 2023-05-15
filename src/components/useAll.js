import React, { useEffect } from "react";
import LoginUi from "./LoginUi";
import WalletUI from "./WalletUI";
import ReactDOM from "react-dom";

const useAll = () => {
  function validateEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function sendOTP(email) {
    if (!validateEmail(email)) {
      document.getElementById("sb_rb_error").innerHTML =
        "<span>Email id is expected</span>";
    } else {
      let config = {
        method: "post",
        headers: {
          "X-App-Token": process.env.REACT_APP_APP_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      };

      fetch(
        `${process.env.REACT_APP_NFTVERSE_DEV_API}/otp/send?type=login`,
        config
      ).then((res) => {
        document.getElementById(
          "email_address_input"
        ).innerHTML = `<div class="flex shadow-1 w-full  email-input-container" id="otp-container">
                    <input type="text" class = "border-none outline-none mt-10 " placeholder="Enter OTP received on your mail" name="uname" id="input_otp" required>
            </div> <span id="sb_rb_error" style="color:red"></span>
                    <button type="submit"  id="submit_otp_btn" class="btn primary-btn mt-10">Submit Otp</button>
        <div>In future you will be able to access your account using this email and OTP</div>
                </div>`;
        document.getElementById("sb_rb_error").innerHTML = "";
        const submitOtpBtn = document.getElementById("submit_otp_btn");
        submitOtpBtn.addEventListener("click", function () {
          verifyOtp(email, document.getElementById("input_otp").value);
        });
      });
    }
  }

  function verifyOtp(email, otp) {
    console.log(otp);
    if (!otp) {
      document.getElementById("sb_rb_error").innerHTML =
        "<span>Otp is expected</span>";
    } else {
      let config = {
        method: "post",
        headers: {
          "X-App-Token": process.env.REACT_APP_APP_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          otp: otp,
        }),
      };
      fetch(
        `${process.env.REACT_APP_NFTVERSE_DEV_API}/otp/verify?type=login`,
        config
      )
        .then((res) => res.json())
        .then((res) => {
          getOrSetupWallet(res.userId, res.authToken);
        })
        .catch(
          (rej) =>
            (document.getElementById("sb_rb_error").innerHTML =
              "<span>Wrong otp</span>")
        );
    }
  }
  function getOrSetupWallet(userId, authToken) {
    localStorage.setItem("wallet_authToken", authToken);
    localStorage.setItem("userId", userId);
    let config = {
      method: "get",
      headers: {
        "X-Auth-Token": authToken,
        "Content-Type": "application/json",
      },
    };

    fetch(
      `${process.env.REACT_APP_BLOCKCHAIN_SERVICE}/user/blockchain/account?blockchain=ALGORAND`,
      config
    )
      .then((res) => res.json())
      .then((res) => {
        const talewallet = res?.filter(
          (wallet) => wallet.wallet === "TALEWALLET"
        );
        if (talewallet?.length === 0) {
          setUpTaleWallet(authToken);
        } else {
          localStorage.setItem("tale_wallet_address", talewallet[0].address);
          const walletAddress = talewallet[0].address;
          ReactDOM.render(
            <WalletUI
              bgColor="geen"
              textColor="red"
              walletAddress={walletAddress}
            />,
            document.getElementById("root")
          );
        }
      })
      .catch(
        (rej) =>
          (document.getElementById("sb_rb_error").innerHTML =
            "<span>Having trouble getting account try again later</span>")
      );
  }

  function setUpTaleWallet(authToken) {
    let config = {
      method: "post",
      headers: {
        "X-Auth-Token": authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        blockchain: "ALGORAND",
        wallet: "TALEWALLET",
        marketplaceAddress: 0,
      }),
    };
    fetch(
      `${process.env.REACT_APP_BLOCKCHAIN_SERVICE}/user/blockchain/wallet/setup`,
      config
    )
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("tale_wallet_address", res.address);
        document.getElementById("wallet_div").innerHTML = "";
        WalletUI(res.address);
      })
      .catch((rej) => console.log(rej));
  }

  function handleTablClick(event, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "contents";
    event.currentTarget.className += " active";
  }
  function defaultOpen() {
    // default open tab
    const defaultOpenTab = document.getElementById("defaultOpen").click();
    if (defaultOpenTab) {
      defaultOpenTab.click();
    }
  }

  //fetch list of asset
  async function fetchList(tale_wallet_address, authToken) {
    try {
      const response = await fetch(
        ` https://bs-dev.api.onnftverse.com/v1/user/${tale_wallet_address}/list`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": authToken,
          },
        }
      );
      const data = await response.json();
      return data.content;
    } catch (error) {
      console.error(error);
    }
  }

  // fetch details of nft
  async function fetchdetails(url) {
    try {
      const response = await fetch(
        `https://nftverse-dev.mypinata.cloud/ipfs/${url}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  //fetch balance
  async function balance(tale_wallet_address, authToken) {
    try {
      const response = await fetch(
        `https://bs-dev.api.onnftverse.com/v1/user/wallet/balance?blockchain=ALGORAND&address=${tale_wallet_address}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": authToken,
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  // fetch  image
  async function images(hash) {
    try {
      const response = await fetch(`https://ipfs.io/ipfs/${hash}`);
      const data = await response.json();

      return data.image.replace("ipfs://", "");
    } catch (error) {
      console.error(error);
    }
  }

  return {
    handleTablClick,
    validateEmail,
    sendOTP,
    verifyOtp,
    getOrSetupWallet,
    setUpTaleWallet,
    defaultOpen,
    fetchList,
    balance,
    images,
    fetchdetails,
  };
};

export default useAll;
