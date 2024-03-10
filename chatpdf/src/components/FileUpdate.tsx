"use client";
import { uplodetoS3 } from '@/lib/s3';
import { Inbox } from 'lucide-react';
import React from 'react'
import { useDropzone } from 'react-dropzone'
function FileUpdate() {
    const {getRootProps,getInputProps}= useDropzone({
        //type of file that user can upload
        accept: {'application/pdf':['.pdf']},
        //max files
        maxFiles:1,
        onDrop: async (acceptedFile)=>{
            console.log(acceptedFile)
            const file = acceptedFile[0]
            if(file.size > 10*1024*1024){
                // bigger then 10mb!
                alert("please uploade a smaller file")
                return
            }
            try {
                const data = await uplodetoS3(file)
                console.log("data",data)
            } catch (error) {
                console.log(error)
            }
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