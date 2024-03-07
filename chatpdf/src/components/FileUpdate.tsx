"use client";
import { Inbox } from 'lucide-react';
import React from 'react'
import { useDropzone } from 'react-dropzone'
function FileUpdate() {
    const {getRootProps,getInputProps}= useDropzone({
        //type of file that user can upload
        accept: {'application/pdf':['.pdf']},
        //max files
        maxFiles:1,
        onDrop:(acceptedFile)=>{
            console.log(acceptedFile)
        }

    })
  return (
    <div className='p-2 bg-white rounded-lx '>
        <div {...getRootProps({
            className:" border-dashed border-2 rounded-xl cursor-pointer bg-green-200 py-8 flex jus  items-center flex-col"
        })}>
            <input{...getInputProps()}/>
            <>
            <Inbox className='w-10 h-10 text-blue-500'/>
            <p className='mt-2 text-sm text-slate-400'>Drop your PDF here</p>
            </>
        </div>
    </div>
  )
}

export default FileUpdate