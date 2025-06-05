import React from "react";
import "./CSS/block.css";

const Block = ({
  hash = "0xA1B2C3D4E5F6...",
  image,
  index = 1,
  timestamp = "2025-06-04 12:00",
  data = "Sample data",
  nonce = 123456,
}) => {
  return (
    <div className="block-container">
      <div className="block-connector"></div> {/* line to next block */}
      <div className="block-card">
        <div className="block-header">
          <span className="block-index">🧱 Block #{index}</span>
          <span className="block-hash">{hash}</span>
        </div>
        {image && (
          <div className="block-image-wrapper">
            <img src={image} alt="Block visual" className="block-image" />
          </div>
        )}
        <div className="block-info">
          <div>
            <strong>Timestamp:</strong> <code>{timestamp}</code>
          </div>
          <div>
            <strong>Data:</strong> <span>{data}</span>
          </div>
          <div>
            <strong>Nonce:</strong> <code>{nonce}</code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Block;
