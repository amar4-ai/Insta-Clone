import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { MoreHorizontal } from 'lucide-react'
import { Button } from './ui/button'

const CommentDialog = ({ open, setOpen }) => {
    const [text, setText] = useState("");

    const changeEventHandler = (e) => {
        const inputText = e.target.value;
        if (inputText.trim()) {
            setText(inputText);
        } else {
            setText("");
        }
    }

    const sendMessageHandler = async()=>{
        alert(text);
    }
    return (
        <Dialog open={open}>
            <DialogContent onInteractOutside={() => setOpen(false)} className="max-w-5xl p-0 flex flex-col">
                <div className="flex flex-1">
                    <div className="w-1/2">
                        <img
                            src="data:image/jpeg;base64,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"
                            alt="post_image"
                            className='w-full h-full object-cover rounded-l-lg' />

                    </div>
                    <div className="w-1/2 flex flex-col justify-between">
                        <div className="flex items-center justify-between p-4">
                            <div className="flex gap-3 items-center">
                                <Link>
                                    <Avatar>
                                        <AvatarImage src="" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>

                                </Link>
                                <div>
                                    <Link className='font-semibold text-xs'>username</Link>
                                    {/* <span className='text-sm text-gray-600'>Bio here...</span> */}
                                </div>
                            </div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <MoreHorizontal className='cursor-pointer' />
                                </DialogTrigger>
                                <DialogContent>
                                    <div className="cursor-pointer w-full text-[#ED4956] font-bold">
                                        Unfollow
                                    </div>
                                    <div className="cursor-pointer w-full">
                                        Add to favroutes
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <hr />
                        <div className="flex-1 overflow-y-auto max-h-96 p-4">
                            Comments come here.....
                        </div>
                        <div className="p-4">
                            <div className='flex items-center gap-2'>
                                <input type="text" onChange={changeEventHandler} placeholder='Add a comment...' className='w-full outline-none border border-gray-300 p-2 rounded' />
                                <Button disabled={!text.trim()} onClick={sendMessageHandler} variant="outline">Send</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CommentDialog