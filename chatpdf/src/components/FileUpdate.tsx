"use client";
import { uplodetoS3 } from '@/lib/s3';
import { useMutation } from '@tanstack/react-query';
import { Inbox, Loader2 } from 'lucide-react';
import React from 'react'
import { useDropzone } from 'react-dropzone'
import axios from "axios"
import toast from 'react-hot-toast';
import {useState} from "react"

function FileUpdate() {
    const [uploading ,setUploading ] = useState(false)

    const { mutate, isPending }= useMutation({
        mutationFn: async ({file_key,file_name,}: {file_key: string;file_name: string;}) => {
          const response = await axios.post("/api/create-chat", {
            file_key,
            file_name,
          });
          return response.data;
        },
      });


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
                toast.error("file to large")
                return
            }
            try {
                setUploading(true)

                const data = await uplodetoS3(file)

                if(!data?.file_key || !data?.file_name){
                    toast.error("somthing went worng")
                    return
                }
                
                mutate(data,{
                    onSuccess:(data)=>{toast.success("Success creating the chat ")},
                    onError:(error)=>{toast.error("Error creating chat");
                    }
                })
            } catch (error) {
                console.log(error)
            }
            finally{
                setUploading(false)
            }
        }

    })


    
  return (
    <div className='p-2 bg-white rounded-lx '>
        <div {...getRootProps({
            className:" border-dashed border-2 rounded-xl cursor-pointer bg-green-200 py-8 flex jus  items-center flex-col"
        })}>
           
            
            <input{...getInputProps()}/>
            {uploading||isPending? (
            <>
           <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
            <p className="mt-2 text-sm text-slate-400">
              Spilling Tea to GPT...
            </p>
            </>):(<>
            <Inbox className='w-10 h-10 text-blue-500'/>
            <p className='mt-2 text-sm text-slate-400'>Drop your PDF here</p>
            </>)}
            
        </div>
    </div>
  )
}

export default FileUpdate