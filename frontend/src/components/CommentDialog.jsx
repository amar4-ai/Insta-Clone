// import React, { useEffect, useState } from 'react'
// import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
// import { Link } from 'react-router-dom'
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
// import { MoreHorizontal } from 'lucide-react'
// import { Button } from './ui/button'
// import { useDispatch, useSelector } from 'react-redux'
// import Comment from './Comment'
// import axios from 'axios'
// import { toast } from 'sonner'
// import { setPosts } from '@/redux/postSlice'

// const CommentDialog = ({ open, setOpen }) => {
//     const [text, setText] = useState("");
//     const { selectedPost, posts } = useSelector(store => store.post);
//     const [comment, setComment] = useState([]);
//     const dispatch = useDispatch();


//         useEffect(() => {
//         if (selectedPost?.comments) {
//             setComment(selectedPost.comments);
//         } else {
//             setComment([]);
//         }
//     }, [selectedPost]);

//     const changeEventHandler = (e) => {
//         const inputText = e.target.value;
//         // if (inputText.trim()) {
//             setText(inputText);
//         // } else {
//         //     setText("");
//         // }
//     };


//     const sendMessageHandler = async () => {
//          if (!text.trim()) return;
//         try {
//             const res = await axios.post(`http://localhost:8000/api/v1/post/${selectedPost?._id}/comment`, { text }, {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 withCredentials: true
//             });

//             if (res.data.success) {
//                 const updatedCommentData = [...comment, res.data.comment];
//                 setComment(updatedCommentData);

//                 const updatedPostData = posts.map(p =>
//                     p._id == selectedPost._id ? { ...p, comments: updatedCommentData } : p
//                 );
//                 dispatch(setPosts(updatedPostData));
//                 toast.success(res.data.message);
//                 setText("");
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     }
//     return (
//         <Dialog open={open}>
//             <DialogContent onInteractOutside={() => setOpen(false)} className="max-w-5xl p-0 flex flex-col">
//                 <div className="flex flex-1">
//                     <div className="w-1/2">
//                         <img
//                             src={selectedPost?.image}
//                             alt="post_image"
//                             className='w-full h-full object-cover rounded-l-lg' />

//                     </div>
//                     <div className="w-1/2 flex flex-col justify-between">
//                         <div className="flex items-center justify-between p-4">
//                             <div className="flex gap-3 items-center">
//                                 <Link>
//                                     <Avatar>
//                                         <AvatarImage src={selectedPost?.author?.profilePicture} />
//                                         <AvatarFallback>CN</AvatarFallback>
//                                     </Avatar>

//                                 </Link>
//                                 <div>
//                                     <Link className='font-semibold text-xs'>{selectedPost?.author?.username}</Link>
//                                     {/* <span className='text-sm text-gray-600'>Bio here...</span> */}
//                                 </div>
//                             </div>
//                             <Dialog>
//                                 <DialogTrigger asChild>
//                                     <MoreHorizontal className='cursor-pointer' />
//                                 </DialogTrigger>
//                                 <DialogContent>
//                                     <div className="cursor-pointer w-full text-[#ED4956] font-bold">
//                                         Unfollow
//                                     </div>
//                                     <div className="cursor-pointer w-full">
//                                         Add to favroutes
//                                     </div>
//                                 </DialogContent>
//                             </Dialog>
//                         </div>
//                         <hr />
//                         <div className="flex-1 overflow-y-auto max-h-96 p-4">
//                             {
//                                comment.map((comment) => <Comment key={comment._id} comment={comment} />)
//                             }

//                         </div>
//                         <div className="p-4">
//                             <div className='flex items-center gap-2'>
//                                 <input type="text" onChange={changeEventHandler} placeholder='Add a comment...' className='w-full outline-none text-sm border border-gray-300 p-2 rounded' />
//                                 <Button disabled={!text.trim()} onClick={sendMessageHandler} variant="outline">Send</Button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </DialogContent>
//         </Dialog>
//     )
// }

// export default CommentDialog


import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { MoreHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { useDispatch, useSelector } from 'react-redux';
import Comment from './Comment';
import axios from 'axios';
import { toast } from 'sonner';
import { setPosts } from '@/redux/postSlice';

const CommentDialog = ({ open, setOpen }) => {
    const [text, setText] = useState('');
    const [comment, setComment] = useState([]);

    const { selectedPost, posts } = useSelector(store => store.post);
    const dispatch = useDispatch();

    // Sync comments when selectedPost changes
    useEffect(() => {
        if (selectedPost?.comments) {
            setComment(selectedPost.comments);
        } else {
            setComment([]);
        }
    }, [selectedPost]);

    const changeEventHandler = (e) => {
        const inputText = e.target.value;
        setText(inputText);
    };

    const sendMessageHandler = async () => {
        if (!text.trim()) return;

        try {
            const res = await axios.post(
                `https://insta-clone-5she.onrender.com/api/v1/post/${selectedPost?._id}/comment`,
                { text },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );

            if (res.data.success) {
                const updatedCommentData = [...comment, res.data.comment];
                setComment(updatedCommentData);

                const updatedPostData = posts.map(p =>
                    p._id === selectedPost._id
                        ? { ...p, comments: updatedCommentData }
                        : p
                );

                dispatch(setPosts(updatedPostData));

                toast.success(res.data.message);
                setText('');
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent
                onInteractOutside={() => setOpen(false)}
                className="max-w-5xl p-0 flex flex-col"
            >
                <div className="flex flex-1">

                    {/* Left Image Section */}
                    <div className="w-1/2">
                        <img
                            src={selectedPost?.image}
                            alt="post_image"
                            className="w-full h-full object-cover rounded-l-lg"
                        />
                    </div>

                    {/* Right Comment Section */}
                    <div className="w-1/2 flex flex-col justify-between">

                        {/* Header */}
                        <div className="flex items-center justify-between p-4">
                            <div className="flex gap-3 items-center">
                                <Link to="#">
                                    <Avatar>
                                        <AvatarImage src={selectedPost?.author?.profilePicture} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </Link>
                                <div>
                                    <Link to="#" className="font-semibold text-xs">
                                        {selectedPost?.author?.username}
                                    </Link>
                                </div>
                            </div>

                            <Dialog>
                                <DialogTrigger asChild>
                                    <MoreHorizontal className="cursor-pointer" />
                                </DialogTrigger>
                                <DialogContent>
                                    <div className="cursor-pointer w-full text-[#ED4956] font-bold">
                                        Unfollow
                                    </div>
                                    <div className="cursor-pointer w-full">
                                        Add to favourites
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>

                        <hr />

                        {/* Comments List */}
                        <div className="flex-1 overflow-y-auto max-h-96 p-4">
                            {comment?.length > 0 ? (
                                comment.map((c) => (
                                    <Comment key={c._id} comment={c} />
                                ))
                            ) : (
                                <p className="text-sm text-gray-500">
                                    No comments yet.
                                </p>
                            )}
                        </div>

                        {/* Input Section */}
                        <div className="p-4">
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={text}
                                    onChange={changeEventHandler}
                                    placeholder="Add a comment..."
                                    className="w-full outline-none text-sm border border-gray-300 p-2 rounded"
                                />
                                <Button
                                    disabled={!text.trim()}
                                    onClick={sendMessageHandler}
                                    variant="outline"
                                >
                                    Send
                                </Button>
                            </div>
                        </div>

                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CommentDialog;