import React, { useState } from "react";
import { useEffect } from "react";
import "./Overlay.css";

import "../talewallet.css";
import ellipse from "../images/ellipse.svg";
import copy from "../images/copy.png";
import algorandhexagon from "../images/algorandhexagon.svg";
import useAll from "../useAll";
import Nftimage from "../Nftimage";

const Overlay = ({ bgColor, textColor, width, height }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { handleTablClick, defaultOpen, fetchList, balance, images } = useAll();
  const [details, setDetails] = useState([]);
  const [walletBalance, setwalletBalance] = useState("");
  const [image, setImage] = useState("");

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClickOutside = (event) => {
    if (event.target.className === "modal") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen === true) {
      defaultOpen();
    }
  }, [isOpen]);

  var authToken = localStorage.getItem("wallet_authToken");
  var tale_wallet_address = localStorage.getItem("tale_wallet_address");

  useEffect(() => {
    async function fetchData() {
      const result = await fetchList(tale_wallet_address, authToken);
      setDetails(result);
    }
    fetchData();

    //fetch balance
    async function fetchBalance() {
      const result = await balance(tale_wallet_address, authToken);
      setwalletBalance(result);
    }
    fetchBalance();
  }, []);

  function fetchimages(hash) {
    const result = images(hash);
    return result;
  }

  return (
    <div>
      <button onClick={handleOpen}>Open Modal</button>
      {isOpen && (
        <div className="modal" onClick={handleClickOutside}>
          <div
            className="modal-content"
            style={{
              backgroundColor: bgColor,
              color: textColor,
              width: width,
              height: height,
            }}
          >
            <div className="flex justify-center items-center">
              <div
                className="flex flex-col items-center gap-20"
                style={{ marginTop: "50px" }}
              >
                <div className="text-lg font-bold flex justify-around items-center shadow-xl wallet-address-container">
                  <div>
                    <img src={ellipse} className="w-40 h-40 object-contain" />
                  </div>
                  <div
                    style={{ overflow: "hidden", textOverflow: "ellipsis" }}
                    className="w-100 font-bold"
                    id="tale_wallet_address"
                  >
                    {tale_wallet_address}
                  </div>
                  <div id="copy_to_clipboard">
                    <img src={copy} alt="Copy Address" width="25" />
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="relative z-10">
                    <img src={algorandhexagon} className="w-50" />
                  </div>
                  <div id="wallet_balance" className=" font-bold text-tale">
                    <h3>{walletBalance.balance} Algos ⟳</h3>
                  </div>
                  <div>
                    <p>Min Balance: 0.1 Algos </p>
                  </div>
                </div>
                <div className="flex gap-20 justify-center">
                  <button className="btn primary-btn" id="buy-btn">
                    Buy
                  </button>
                  <button className="btn secondary-btn" id="sell-btn">
                    Send
                  </button>
                </div>
              </div>
            </div>
            {/* tab start here  */}
            <div
              className="tab-container"
              style={{
                backgroundColor: bgColor,
                color: textColor,
              }}
            >
              <div className="tab">
                <button
                  className="tablinks font-bold"
                  style={{
                    backgroundColor: bgColor,
                    color: textColor,
                  }}
                  onClick={(e) => handleTablClick(e, "NFTs")}
                  id="defaultOpen"
                >
                  NFTs
                </button>
                <button
                  style={{
                    backgroundColor: bgColor,
                    color: textColor,
                  }}
                  className="tablinks font-bold"
                  onClick={(e) => handleTablClick(e, "Tokens")}
                >
                  Tokens
                </button>
                <button
                  style={{
                    backgroundColor: bgColor,
                    color: textColor,
                  }}
                  className="tablinks font-bold"
                  onClick={(e) => handleTablClick(e, "Activity")}
                >
                  Activity
                </button>
              </div>
              <div className="w-80 mx-auto">
                <div id="NFTs" className="tabcontent ">
                  <div className="nfttab">
                    {details &&
                      details.map((item) => {
                        return (
                          <div key={item.assetId} className="tabCard ">
                            <div className="nftCardContent">
                              <Nftimage fetchimages={fetchimages} item={item} />
                              <div className="flex flex-row justify-start items-center gap-5">
                                <img
                                  src={ellipse}
                                  className="w-40 h-40 object-contain"
                                />
                                <p>thedoodles</p>
                              </div>
                              <p className="font-bold">{item.params.name}</p>

                              <div>
                                <p className="text-xs">Price</p>
                                <p className="font-bold">2 ETH</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                <div id="Tokens" className="tabcontent">
                  <h3>Tokens</h3>
                  <p>Some Tokens here</p>
                </div>

                <div id="Activity" className="tabcontent">
                  <h3>Activity</h3>
                  <p>Some Activity here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overlay;
