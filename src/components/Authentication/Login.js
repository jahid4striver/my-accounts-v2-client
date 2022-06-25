import React from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from './firebase.init';
import login from '../../assets/images/login.jpeg'


const Login = () => {
    const [signInWithEmailAndPassword, user, loading, error,] = useSignInWithEmailAndPassword(auth);
    const navigate= useNavigate();

    if(user){
        navigate('/')
    }


    const handleSignIn = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        signInWithEmailAndPassword(email, password);

        e.target.reset();
    }

    return (
        <div className='mt-20'>
            <div className='container mx-auto'>
                <form onSubmit={handleSignIn} className=' w-10/12 lg:w-96 mx-auto mt-8 shadow-xl rounded-lg p-4 flex flex-col justify-center items-center'>
                    <img className='w-80' src={login} alt="" />
                    <p className='text-sm bg-red-400 p-2 rounded-lg text-white'>Email: admin@myaccounts.com pass: 123456</p>
                    <div class="form-control w-full max-w-xs">
                        <label class="label">
                            <span class="label-text">Your Email</span>
                        </label>
                        <input name='email' type="email" placeholder="Enter Your Email" class="input input-bordered w-full max-w-xs" />
                    </div>
                    <div class="form-control w-full max-w-xs">
                        <label class="label">
                            <span class="label-text">Your Password</span>
                        </label>
                        <input name='password' type="password" placeholder="Enter Your Password" class="input input-bordered w-full max-w-xs" />
                    </div>
                    <input className='btn w-full mt-4' type="submit" value="Login" />
                </form>
            </div>
        </div>
    );
};

export default Login;