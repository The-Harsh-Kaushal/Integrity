import React from "react";
import FileUpload from "../components/FileUpload";
import Block from "../components/Block";
import Display from "../components/Display";
import Navbar from "../components/Navbar";
import "./style/home.css";

const randomHash = () =>
  "0x" + Math.random().toString(16).substr(2, 16).toUpperCase();

const randomData = [
  "Genesis Block",
  "Alice pays Bob 5 BTC",
  "Bob pays Carol 2 BTC",
  "Carol pays Dave 1 BTC",
  "Dave pays Eve 0.5 BTC",
  "Eve pays Frank 0.2 BTC",
  "Frank pays Grace 0.1 BTC",
  "Grace pays Heidi 0.05 BTC",
];

const Home = () => {
  const [showAlert, setShowAlert] = React.useState(false);

  const handleCheckBlockchain = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 10000); // 10 seconds
  };

  return (
    <div className="main">
      <Navbar />
      <div className="bottom">
        <div className="upload-file">
          <FileUpload />
          <Display />
        </div>
        <div className="blockchain-section">
          <div className="blockchain-header">
            <span className="blockchain-label">Blockchain</span>
            <button className="blockchain-btn" onClick={handleCheckBlockchain}>
              Check Blockchain
            </button>
          </div>
          {showAlert && (
            <div className="blockchain-alert danger">
              ❌ Document has been tampered or is not recorded
            </div>
          )}
          <div className="blockchain-slider">
            <div className="blockchain-track">
              {randomData.map((data, i) => (
                <Block
                  key={i}
                  index={i + 1}
                  hash={randomHash()}
                  timestamp={`2025-06-04 1${i}:00`}
                  data={data}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
