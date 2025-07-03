import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import FileUpload from "../components/FileUpload";
import Display from "../components/Display";
import Block from "../components/Block";
import AuthButton from "../components/utility/AuthButton";
import api from "../axiosreq";
import { useNavigate } from "react-router-dom";
import { FullScreenLoader } from "../components/utility/FullScreenLoader";


const Home = () => {
  const [msgToDisplay, setMsgToDisplay] = useState(null);
  const [blocks, setblocks] = useState([]);
  const [refetch, setrefetch] = useState(0);
  const [Loader,setLoader] = useState(false);
  const navigate = useNavigate();

  const NavToAuth = () => {
    const token = sessionStorage.getItem("accessToken");
    if (!token) navigate("/authentication");
  };
  useEffect(() => {
    NavToAuth();
  }, []);
  useEffect(() => {
    const fetchAllBlocks = async () => {
      try {
        const response = await api.post("/block/getallblocks");
        setblocks(response.data.blocks);
        console.log(response.data.blocks);
      } catch (err) {
        setMsgToDisplay(err.message);
      }
    };
    fetchAllBlocks();
  }, [refetch]);
  const RefreshAllBlocks = async () => {
    try {
      const response = await api.post("/block/verifychain");
      setrefetch((prev) => prev + 1);
    } catch (err) {
      setMsgToDisplay(err.message);
    }
  };

  return (
    <>
    <FullScreenLoader loading={Loader}/>
    <div className="min-h-screen flex flex-col bg-surface-0 text-white">
      {/* Top navigation */}
      <Navbar loaderSetfn={setLoader} />

      {/* Upload & hash display */}
      <section className="mx-auto mt-16 pt-16 w-full max-w-7xl px-6 sm:px-12 flex flex-col lg:flex-row gap-40">
        <FileUpload
          responseCallback={setMsgToDisplay}
          setrefetch={setrefetch}
        />
        <Display message={msgToDisplay} />
      </section>

      {/* Blockchain visualisation */}
      <section className="mx-auto mt-12 w-full max-w-7xl px-6 flex flex-col items-center gap-6 bg-surface-1 rounded-2xl border border-amber-500/80 shadow-xl py-10">
        {/* Section heading */}
        <div className="flex flex-col items-center text-center gap-2">
          <span className="text-amber-500 text-sm uppercase tracking-widest font-medium">
            Visual Chain Snapshot
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-amber-300 drop-shadow-sm">
            Blockchain Verification View
          </h2>
        </div>

        {/* Verify button */}
        <div className="w-full flex justify-center">
          <AuthButton
            content="Verify Chain"
            disablebtn={false}
            oncliclbtn={RefreshAllBlocks}
          />
        </div>

        {/* Blocks scroller */}
        <div className="flex w-full gap-6 overflow-x-auto scrollbar-thin custom-scroll max-w-full px-2">
          {blocks.map((block) => {
            return <Block key={block.index} {...block} />;
          })}
        </div>
      </section>
    </div>
    </>
  );
};

export default Home;
