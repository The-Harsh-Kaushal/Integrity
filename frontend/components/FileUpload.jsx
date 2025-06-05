import React from "react";
import "./CSS/fileupload.css";

const Display = ({ message = "No message yet." }) => (
  <div className="display-square">{message}</div>
);

const FileUpload = () => {
  const [file, setFile] = React.useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="file-upload-layout">
      <div className="file-upload-box">
        <label htmlFor="file-upload-input" className="file-upload-label">
          <span className="file-upload-icon">📁</span>
          <span className="file-upload-text">
            Click or drag a file to upload
          </span>
        </label>
        <input
          id="file-upload-input"
          type="file"
          className="file-upload-input"
          onChange={handleFileChange}
        />
        {file && <div className="file-upload-filename">{file.name}</div>}
        <div className="file-upload-actions">
          <button className="file-upload-btn">Create Hash</button>
          <button className="file-upload-btn secondary">Check Hash</button>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
