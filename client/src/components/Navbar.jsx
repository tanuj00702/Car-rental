import React from 'react';
import { useState } from 'react';
import { assets, menuLinks } from '../assets/assets';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { motion } from 'motion/react';
const Navbar = () => {
    const { setShowLogin, user, logout, isOwner, axios, setIsOwner } = useAppContext();
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const changeRole = async () => {
        try {
            const { data } = await axios.post('/api/owner/change-role');
            if (data.success) {
                setIsOwner(true);
                toast.success(data.message);
                navigate('/owner'); // Navigate to dashboard after successful role change
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred.');
        }
    };

    const handleListCarClick = () => {
        if (!user) {
            setShowLogin(true);
            toast.error("Please log in to list your car.");
        } else if (isOwner) {
            navigate('/owner');
        } else {
            changeRole();
        }
    };

    return (
        <motion.div
    initial={{y: -20, opacity: 0}}
    animate={{y: 0, opacity: 1}}
    transition={{duration: 0.5}}
    className={`flex items-center justify-between px-6 md:px-16 lg:px-24
    xl:px-32 py-4 text-gray-600 border-b border-borderColor relative
    transition-all ${location.pathname === "/" && "bg-light"}`}
>

    <Link to='/'>
        <motion.img whileHover={{scale: 1.05}} src={assets.logo}
        alt="logo" className="h-8"/>
    </Link>

            <div className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 
                max-sm:border-t border-borderColor right-0 flex flex-col sm:flex-row 
                items-center sm:items-center gap-4 sm:gap-8 max-sm:p-4 transition-all
                duration-300 z-50 ${location.pathname === "/" ? "bg-light" : "bg-white"}
                ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}`}>
                
                {menuLinks.map((link, index) => (
                    <Link key={index} to={link.path}>
                        {link.name}
                    </Link>
                ))}

                <div className='hidden lg:flex items-center text-sm gap-2 border 
                border-borderColor px-3 rounded-full max-w-56'>
                    <input type="text" className="py-1.5 w-full bg-transparent 
                    outline-none placeholder-gray-500" placeholder="Search products" />
                    <img src={assets.search_icon} alt="search" />
                </div>

                <div className='flex max-sm:flex-col items-center sm:items-center gap-6'>
                    <button onClick={handleListCarClick} className="cursor-pointer">
                        {isOwner ? 'Dashboard' : 'List cars'}
                    </button>

                    <button onClick={() => { user ? logout() : setShowLogin(true) }} className="cursor-pointer px-8 py-2 bg-primary
                    hover:bg-primary-dull transition-all text-white rounded-lg">
                        {user ? 'Logout' : 'Login'}
                    </button>
                </div>
            </div>

            <button className='sm:hidden cursor-pointer' aria-label="Menu" onClick={() => setOpen(!open)}>
                <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" />
            </button>
        </motion.div>
    );
};

export default Navbar;



// import React, { useState, useEffect } from 'react';
// import { assets, menuLinks } from '../assets/assets';
// import { Link, useLocation, useNavigate } from 'react-router-dom';

// const Navbar = ({ setShowLogin }) => {
//     const location = useLocation();
//     const [open, setOpen] = useState(false);
//     const navigate = useNavigate();

//     // This useEffect hook prevents the page from scrolling when the mobile menu is open.
//     useEffect(() => {
//         if (open) {
//             document.body.style.overflow = 'hidden';
//         } else {
//             document.body.style.overflow = 'auto';
//         }
//         return () => {
//             document.body.style.overflow = 'auto';
//         };
//     }, [open]);

//     return (
//         <div className={`flex items-center justify-between px-6 md:px-16 lg:px-24
//             xl:px-32 py-4 text-gray-600 border-b border-borderColor relative
//             transition-all ${location.pathname === "/" ? "bg-light" : "bg-white"}`}>
            
//             <Link to='/'>
//                 <img src={assets.logo} alt="logo" className="h-8" />
//             </Link>

//             {/* ====== 1. DESKTOP & TABLET MENU ====== */}
//             {/* This div is hidden on small screens and visible on 'sm' screens and larger. */}
//             <div className='hidden sm:flex items-center gap-8'>
//                 {menuLinks.map((link, index) => (
//                     <Link key={index} to={link.path} className="whitespace-nowrap">
//                         {link.name}
//                     </Link>
//                 ))}
                
//                 <div className='hidden lg:flex items-center text-sm gap-2 border border-borderColor px-3 rounded-full max-w-56'>
//                     <input type="text" className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" placeholder="Search products" />
//                     <img src={assets.search_icon} alt="search" />
//                 </div>

//                 <div className='flex items-center gap-6'>
//                     <button onClick={() => navigate('/owner')} className="cursor-pointer whitespace-nowrap">Dashboard</button>
//                     <button onClick={() => setShowLogin(true)} className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg">Login</button>
//                 </div>
//             </div>

//             {/* ====== 2. MOBILE MENU BUTTON (Hamburger) ====== */}
//             {/* This button is ONLY visible on small screens. */}
//             <button className='sm:hidden cursor-pointer z-50' aria-label="Menu" onClick={() => setOpen(!open)}>
//                 <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" />
//             </button>

//             {/* ====== 3. MOBILE SLIDE-OUT MENU ====== */}
//             {/* This menu only appears when 'open' is true and is hidden on 'sm' screens and larger. */}
//             {open && (
//                 <div className={`sm:hidden fixed h-screen w-full top-0 left-0 pt-24 
//                     flex flex-col items-center gap-8 p-4 transition-all z-40 
//                     ${location.pathname === "/" ? "bg-light" : "bg-white"}`}>
                    
//                     {menuLinks.map((link, index) => (
//                         <Link key={index} to={link.path} onClick={() => setOpen(false)} className="text-xl">
//                             {link.name}
//                         </Link>
//                     ))}
                    
//                     <div className='flex flex-col items-center gap-6 mt-8'>
//                         <button onClick={() => { navigate('/owner'); setOpen(false); }} className="cursor-pointer text-xl">Dashboard</button>
//                         <button onClick={() => { setShowLogin(true); setOpen(false); }} className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg text-xl">Login</button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Navbar;

