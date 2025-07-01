import React, { useState, useSyncExternalStore } from 'react'
import Navbar from '../components/Navbar'
import FileUpload from '../components/FileUpload'
import Display from '../components/Display';

const Home = () => {
  const [MsgToDisplay , setMsgToDisplay]= useState(null);

  return (
    <div>
      <Navbar/>
      {/* mid section------------------------------------ */}
      <div className='flex justify-between items-center mt-15 px-10 '>
      <FileUpload responseCallback={setMsgToDisplay} />
      <Display message={MsgToDisplay}/>
      </div>
    </div>
  )
}

export default Home