import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import insta from "../assets/insta.jpg";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '@/redux/authSlice';


const LeftSidebar = () => {
    const navigate = useNavigate();
    const dispatch= useDispatch();
    const { user } = useSelector(store => store.auth);
    const logoutHandler = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/v1/user/logout',
                { withCredentials: true }
            );
            if (res.data.success) {
                dispatch(setAuthUser(null));
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    const sidebarHandler = (textType) => {
        if (textType == 'Logout') logoutHandler();
    }
    const sidebarItems = [
    {icon : <Home/>, text:"Home"},
    {icon : <Search/>, text:"Search"},
    {icon : <TrendingUp/>, text:"Expoler"},
    {icon : <MessageCircle/>, text:"Messages"},
    {icon : <Heart/>, text:"Notifications"},
    {icon : <PlusSquare/>, text:"Create"},
    {icon :(
            <Avatar className='h-6 w-6'>
        <AvatarImage
          src={user?.profilePicture} alt="@shadcn"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ), text:"Profile"},
     {icon : <LogOut/>, text:"Logout"}
]

    return (

        <div className='fixed top-0 z-10 left-0 px-4 border-r border-gray-300 w-[16%] h-screen'>
            <img src={insta} alt="Instagram Logo" className="h-12 w-12 my-8 mt-4 mx-auto mb-6 rounded-full object-cover border border-gray-300 shadow-sm"
            />
            <div>
                {
                    sidebarItems.map((item, index) => {
                        return (
                            <div onClick={() => sidebarHandler(item.text)} key={index} className='flex items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3'>
                                {item.icon}
                                <span>{item.text}</span>
                            </div>
                        )
                    })
                }

            </div>

        </div>
    )
}

export default LeftSidebar