import React, { useState } from 'react'
import { Dropzone, FileMosaic } from "@files-ui/react";
import { upload } from '../Api/file.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Upload() {
    const [files, setFiles] = React.useState([]);
    const [token, setToken] = useState(localStorage.getItem("token"))
    console.log(token)
  const updateFiles = (incommingFiles) => {
    try {
        console.log(incommingFiles)
        setFiles(incommingFiles);
    } catch (error) {
        
    }
  };
  return (
    <div className='min-h-screen flex justify-center items-center flex-col px-4'>
       <Dropzone maxFiles={1} onChange={updateFiles} value={files} style={{height:"70vh"}} accept='image/*,Video/*'  actionButtons={{
      position: "after",
      uploadButton: { style: { textTransform: "uppercase" }, onClick:() => {
        upload()
      } },
      abortButton: {},
    //   cleanButton: {},
      deleteButton: {},
     }}
     uploadConfig={{
      url: "http://localhost:4000/upload",
      method: "POST",
      headers: {
          Authorization:
           "Bearer " + token,
       },
      cleanOnUpload: true,
   }}
   onUploadFinish={() => {
    toast.success("File Uploaded")
   }}
     >
      {files.map((file) => (
        <FileMosaic {...file} preview />
      ))}
    </Dropzone>
    <ToastContainer type='error' />
    </div>
  )
}

export default Upload