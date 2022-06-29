import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../Authentication/firebase.init';

const Navbar = () => {
    const [user] = useAuthState(auth)

    return (
        <div class={`navbar shadow-xl h-20 ${!user && 'hidden'} bg-red-300`}>
            <div className='navbar-start lg:hidden'>
                <label for="my-drawer-2" tabindex="0" class="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
            </div>
            <div class="flex-1">
                <Link to='/' class="btn btn-ghost text-xl uppercase font-bold mr-36">My Accounts</Link>
            </div>
            <div class="flex-none">
                <div class="dropdown dropdown-end indicator">
                        <Link style={{marginLeft:'-40px'}} className='font-bold' to='/myexpense'>My Expenses<span class="badge badge-sm indicator-item">8 New</span></Link>
                </div>
                <div class="dropdown dropdown-end ml-8">
                    <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                        <div class="w-10 rounded-full">
                            <img src="https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png" alt='user' />
                        </div>
                    </label>
                    <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <a class="justify-between">
                                Profile
                                <span class="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li>{user && <button onClick={() => signOut(auth)}>Logout</button>}</li>
                    </ul>
                </div>
            </div>
        </div>







        // <div class={`navbar shadow-xl h-20 ${!user && 'hidden' } bg-red-300`}>
        //     <div class="navbar-start">
        //         <div class="dropdown">
        //             <label tabindex="0" class="btn btn-ghost lg:hidden">
        //                 <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        //             </label>
        //             <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">

        //             </ul>
        //         </div>
        //         <Link to='/' class="btn btn-ghost normal-case text-2xl">My Accounts</Link>
        //     </div>
        //     <div class="navbar-center hidden lg:flex">
        //         <ul class="menu menu-horizontal p-0">

        //         </ul>
        //     </div>
        //     <div className='navbar-end'>
        //     <label for="my-drawer-2" tabindex="0" class="btn btn-ghost lg:hidden">
        //         <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        //     </label>
        //     </div>
        // </div>
    );
};

export default Navbar;