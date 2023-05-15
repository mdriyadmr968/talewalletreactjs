import React, { useState } from "react";
import { useEffect } from "react";
import Nftimage from "./Nftimage";
import useAll from "./useAll";
import descicon from "./images/align-left-solid.svg";
import algologo from "./images/Algorand.png";
import { createRoot } from "react-dom/client";
import "./talewallet.css";
import WalletUI from "./WalletUI";

const NftDetail = ({ item }) => {
  console.log("logging item", item);
  const { fetchdetails, images } = useAll();
  const [data, setData] = useState("");
  const [activeIndexes, setActiveIndexes] = useState([]);

  const handleClick = (index) => {
    setActiveIndexes((prevIndexes) => {
      if (prevIndexes.includes(index)) {
        return prevIndexes.filter((i) => i !== index);
      } else {
        return [...prevIndexes, index];
      }
    });
  };

  useEffect(() => {
    const url = item.params.url.replace("ipfs://", "");

    async function fetchData() {
      const data = await fetchdetails(url);
      console.log("logging data", data);
      setData(data);
    }
    fetchData();
  }, []);

  function fetchimages(hash) {
    const result = images(hash);
    return result;
  }
  function handleBackClick() {
    const root = createRoot(document.getElementById("root"));
    root.render(<WalletUI bgColor="white" textColor="black" />);
  }

  return (
    <>
      <button onClick={() => handleBackClick()}> Go Back</button>
      <div className="nft-details-container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
          }}
        >
          <div style={{ width: "40%" }}>
            <Nftimage fetchimages={fetchimages} item={item} />
          </div>
          <div style={{ width: "40%" }}>
            <h3>{item.params.name}</h3>
            <div
              style={{
                display: "flex ",
                alignItems: "center",
                justifyContent: "start",
                gap: "20px",
              }}
            >
              <div
                style={{
                  width: "10%",
                  display: "flex",
                  alignContent: "center",
                }}
              >
                <img
                  src={algologo}
                  alt="algorand"
                  style={{ width: "40px", height: "40px" }}
                />
              </div>
              <h3 style={{}}>Algorand</h3>
            </div>

            <div className="youOwn">
              <h3>You own this NFT</h3>
            </div>
          </div>
        </div>
        <div className="accordion-main-container">
          <div className="accordion-left-container">
            <div className="accordion">
              <div
                className={`accordion-item ${
                  activeIndexes.includes(0) ? "active" : ""
                }`}
              >
                <div
                  className="accordion-header"
                  onClick={() => handleClick(0)}
                >
                  <div style={{ display: "flex", gap: "15px" }}>
                    <img src={descicon} alt="" style={{ width: "15px" }} />
                    <h3> Description</h3>
                  </div>
                  <div>
                    <p className="accordion-icon">
                      {activeIndexes.includes(0) ? (
                        <span>-</span>
                      ) : (
                        <span>+</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="accordion-content">
                  <p>{data.description}</p>
                </div>
              </div>
            </div>

            <div className="accordion">
              <div
                className={`accordion-item ${
                  activeIndexes.includes(1) ? "active" : ""
                }`}
              >
                <div
                  className="accordion-header"
                  onClick={() => handleClick(1)}
                >
                  <div style={{ display: "flex", gap: "15px" }}>
                    <img src={descicon} alt="" style={{ width: "15px" }} />
                    <h3> Properties</h3>
                  </div>
                  <div>
                    <p className="accordion-icon">
                      {activeIndexes.includes(1) ? (
                        <span>-</span>
                      ) : (
                        <span>+</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="accordion-content">
                  <div className="properties-container">
                    {data &&
                      Object.entries(data.properties).map(([key, value]) => (
                        <div className="properties-card">
                          <p key={key}>
                            {key}: {value}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-right-container">
            <div className="accordion">
              <div
                className={`accordion-item ${
                  activeIndexes.includes(2) ? "active" : ""
                }`}
              >
                <div
                  className="accordion-header"
                  onClick={() => handleClick(2)}
                >
                  <div style={{ display: "flex", gap: "15px" }}>
                    <img src={descicon} alt="" style={{ width: "15px" }} />
                    <h3> Owner</h3>
                  </div>
                  <div>
                    <p className="accordion-icon">
                      {activeIndexes.includes(0) ? (
                        <span>-</span>
                      ) : (
                        <span>+</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="accordion-content">
                  <p>Creator Address: {item.params.creator}</p>
                </div>
              </div>
            </div>

            <div className="accordion">
              <div
                className={`accordion-item ${
                  activeIndexes.includes(3) ? "active" : ""
                }`}
              >
                <div
                  className="accordion-header"
                  onClick={() => handleClick(3)}
                >
                  <div style={{ display: "flex", gap: "15px" }}>
                    <img src={descicon} alt="" style={{ width: "15px" }} />
                    <h3> Details</h3>
                  </div>
                  <div>
                    <p className="accordion-icon">
                      {activeIndexes.includes(1) ? (
                        <span>-</span>
                      ) : (
                        <span>+</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="accordion-content">
                  <p>NFT Standard {data.standard}</p>
                  <p>Mint Address: {item.params.creator}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-bottom-container">
          <div className="accordion">
            <div
              className={`accordion-item ${
                activeIndexes.includes(4) ? "active" : ""
              }`}
            >
              <div className="accordion-header" onClick={() => handleClick(4)}>
                <div style={{ display: "flex", gap: "15px" }}>
                  <img src={descicon} alt="" style={{ width: "15px" }} />
                  <h3> Activity</h3>
                </div>
                <div>
                  <p className="accordion-icon">
                    {activeIndexes.includes(0) ? (
                      <span>-</span>
                    ) : (
                      <span>+</span>
                    )}
                  </p>
                </div>
              </div>
              <div className="accordion-content">
                <p>No Activities to Display</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NftDetail;
