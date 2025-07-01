import React, { useRef, useState } from "react";
import { FolderClosed } from "lucide-react";
import fileUploadIcon from "./utility/images/file_upload.png";
import AuthButton from "./utility/AuthButton";
import api from "../axiosreq";

const FileUpload = ({ responseCallback }) => {
  const inputref = useRef(null);
  const [file, setfile] = useState(null);
  const [dLabel, setdLable] = useState(null);
  const [disableButton, setdisaleButton] = useState(true);

  const fileuploaddiv = () => {
    inputref.current.click();
  };

  const handlechange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setfile(f);
    setdisaleButton(false);
    let Oname = e.target.files[0].name;
    let fileext = Oname.split(".")[1];
    Oname = Oname.length > 30 ? Oname.slice(0, 30) + "...." + fileext : Oname;
    setdLable(Oname);
  };

  const SendReqButtons = async (Url) => {
    try {
      const form = new FormData();
      form.append("filetohash", file);
      const response = await api.post(Url, form);
      setfile(null);
      setdLable(null);
      setdisaleButton(true);
      const MsgTD = {
        Index: response.data.message.index,
        DocHash: response.data.message.docHash,
      };
      responseCallback(JSON.stringify(MsgTD));
    } catch (err) {
      console.log(err);
      responseCallback(err.message);
    }
  };

  return (
    <div className="h-[280px] w-[400px] bg-[var(--surface-1)] shadow-xl shadow-black/30 flex flex-col transition-all duration-300 hover:shadow-2xl hover:ring-2 hover:ring-[var(--primary)] rounded-2xl overflow-hidden">
      <label
        htmlFor="inputforfile"
        className="bg-[var(--surface-1)] text-white w-full cursor-pointer border-b border-dashed border-[var(--primary)] px-3 text-center overflow-hidden text-sm py-2 font-medium transition-colors duration-200 hover:bg-[var(--surface-0)] hover:text-[var(--primary)]"
      >
        {dLabel ? dLabel : "Click to upload"}
      </label>

      <div
        onClick={fileuploaddiv}
        className="cursor-pointer bg-[var(--surface-1)] border-b border-dashed border-[var(--primary)] flex items-center justify-center p-4 relative transition-colors duration-200 hover:bg-[var(--surface-0)]"
      >
        <input
          id="inputforfile"
          type="file"
          name="filetohash"
          className="hidden"
          ref={inputref}
          onChange={handlechange}
        />

        {/* //upper section */}
        <div className="flex flex-col w-full h-[120px] relative items-center">
          <span className="absolute top-[20px]">
            <img
              src={fileUploadIcon}
              alt="file upload icon"
              className="object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </span>
        </div>
      </div>

      {/* action buttons */}
      <div className="flex px-4 items-center flex-1 bg-[var(--surface-1)] justify-between">
        <AuthButton
          content="Upload File"
          disablebtn={disableButton}
          oncliclbtn={() => SendReqButtons("/uploads/upload")}
        />
        <AuthButton
          content="Verify File"
          disablebtn={disableButton}
          oncliclbtn={() => SendReqButtons("/uploads/verifydoc")}
        />
      </div>
    </div>
  );
};

export default FileUpload;
