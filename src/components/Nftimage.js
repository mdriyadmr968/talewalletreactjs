import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Nftimage = ({ fetchimages, item }) => {
  // const [imageurl, setImageurl] = useState("");
  const [hash, setHash] = useState("");

  useEffect(() => {
    fetchimages(item.params.url.replace("ipfs://", "")).then((data) =>
      setHash(data)
    );
  }, []);

  return (
    <img
      src={`https://ipfs.io/ipfs/${hash}`}
      style={{ width: "100%" }}
      alt="nft"
    />
  );
};

export default Nftimage;
