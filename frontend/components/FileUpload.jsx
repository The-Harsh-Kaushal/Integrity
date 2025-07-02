import React, { useRef, useState } from "react";
import { FolderClosed } from "lucide-react";
import fileUploadIcon from "./utility/images/file_upload.png";
import AuthButton from "./utility/AuthButton";
import api from "../axiosreq";

/**
 * Mobile‑first, responsive file upload/verify component.
 * – Full‑width on phones, fixed card width on tablets/desktop
 * – Buttons stack on mobile, sit inline from sm≥640px
 * – Minor typo fixes (setDisableButton, displayLabel)
 */
const FileUpload = ({ responseCallback, setRefetch }) => {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [displayLabel, setDisplayLabel] = useState(null);
  const [disableButton, setDisableButton] = useState(true);

  const triggerFileSelect = () => inputRef.current?.click();

  const handleChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setDisableButton(false);

    // prettify long filenames for the card header
    const originalName = f.name;
    const [base, ext = ""] = originalName.split(".");
    const label =
      originalName.length > 30 ? `${base.slice(0, 26)}….${ext}` : originalName;
    setDisplayLabel(label);
  };

  const sendRequest = async (url) => {
    try {
      const form = new FormData();
      form.append("filetohash", file);

      const { data } = await api.post(url, form);

      // reset
      setFile(null);
      setDisplayLabel(null);
      setDisableButton(true);
      if (inputRef.current) inputRef.current.value = null;

      const msg = `${data.message} at Index ${data.block.index} with hash ${data.block.docHash}`;
      setRefetch((prev) => prev + 1);
      responseCallback(msg);
    } catch (err) {
      responseCallback(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="w-full sm:w-[22rem] bg-[var(--surface-1)] shadow-xl shadow-black/30 flex flex-col rounded-2xl overflow-hidden transition hover:shadow-2xl hover:ring-2 hover:ring-[var(--primary)]">
      {/* Header / filename */}
      <label
        htmlFor="inputforfile"
        className="bg-[var(--surface-1)] text-white cursor-pointer border-b border-dashed border-[var(--primary)] px-2 sm:px-3 py-2 text-center truncate text-xs sm:text-sm font-medium transition-colors hover:bg-[var(--surface-0)] hover:text-[var(--primary)]"
      >
        {displayLabel ?? "Tap or click to upload"}
      </label>

      {/* Drop‑zone */}
      <div
        onClick={triggerFileSelect}
        className="cursor-pointer bg-[var(--surface-1)] border-b border-dashed border-[var(--primary)] flex items-center justify-center py-6 sm:py-4 transition-colors hover:bg-[var(--surface-0)]"
      >
        <input
          id="inputforfile"
          type="file"
          name="filetohash"
          ref={inputRef}
          className="hidden"
          onChange={handleChange}
        />

        {/* icon only – keep it centred */}
        <img
          src={fileUploadIcon}
          alt="file upload icon"
          className="w-12 sm:w-16 select-none pointer-events-none"
        />
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 px-4 py-4 bg-[var(--surface-1)] justify-between">
        <AuthButton
          content="Upload File"
          disablebtn={disableButton}
          oncliclbtn={() => sendRequest("/uploads/upload")}
          className="flex-1"
        />
        <AuthButton
          content="Verify File"
          disablebtn={disableButton}
          oncliclbtn={() => sendRequest("/uploads/verifydoc")}
          className="flex-1"
        />
      </div>
    </div>
  );
};

export default FileUpload;
