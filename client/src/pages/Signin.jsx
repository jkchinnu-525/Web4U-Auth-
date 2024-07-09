import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signInFailure, signInStart, signInSuccess } from "../Redux/User/Userslice";
export default function SignIn() {
    const [Data,setData]  = useState({});
    const {loading, error} = useSelector((state) => state.user);
    const navigate  = useNavigate();
    const dispatch = useDispatch();
    const handleChange = (e) => {
        setData({...Data, [e.target.id]: e.target.value});
    }
    console.log(Data);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(signInStart());
            const response = await fetch('http://localhost:5173/api/auth/signin',{
                method: 'POST',
                headers: {'Content-Type': 'application/json',
                },
                body: JSON.stringify(Data),
            });
            const data = await response.json();
            if(data.success === false) {
                dispatch(signInFailure(data));
                return;
            }
            dispatch(signInSuccess(data));
            navigate('/');
        } catch(error) {
            dispatch(signInFailure(error));
        }
    }
    return <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-center font-bold py-4 text-3xl">Sign In</h1>
        <div className="font-bold flex justify-center text-2xl py-4">Login</div>
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input id="email" type="text" placeholder="Email" className="p-3 rounded-lg bg-slate-100" onChange={handleChange}/>
                <input id="password" type="text" placeholder="Password" className="p-3 rounded-lg bg-slate-100" onChange={handleChange} />
                <button disabled={loading} type="submit" className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-65">{loading ? 'Loading...' : 'Sign In'}</button>
            </form>
            <div className="flex pt-4">
                <p>Dont Have an account?</p>
                <Link to='/signup'>
                    <p className="text-blue-500 underline">Sign Up</p>    
                </Link>
                <p className="text-red-700 pl-2">{error ? error.message || 'Something Went Wrong!' : ''}</p>
            </div>
        </div>
    </div>
}
