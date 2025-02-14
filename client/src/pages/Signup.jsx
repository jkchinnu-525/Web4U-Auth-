import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Oauth from "../components/Oauth";
export default function SignUp() {
    const [Data,setData]  = useState({});
    const [error, setErrors] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) => {
        setData({...Data, [e.target.id]: e.target.value});
    }
    const apiURL = "https://web4u-l62e.onrender.com/api/auth/signup";
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setErrors(false);
            const response = await fetch(apiURL,{
                method: 'POST',
                headers: {'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            setLoading(false);
            if(data.success === false) {
                setErrors(true);
                return;
            }
            navigate('/signin');
        } catch(error) {
            setLoading(false),
            setErrors(true)
        }
    }
    return <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-center font-bold py-4 text-3xl">Sign Up</h1>
        <div className="font-bold flex justify-center text-2xl py-4">Create an account</div>
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input id="username" type="text" placeholder="Username" className=" p-3 rounded-lg bg-slate-100" onChange={handleChange} />
                <input id="password" type="text" placeholder="Password" className="p-3 rounded-lg bg-slate-100" onChange={handleChange} />
                <input id="email" type="text" placeholder="Email" className="p-3 rounded-lg bg-slate-100" onChange={handleChange}/>
                <button disabled={loading} type="submit" className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-65">{loading ? 'Loading...' : 'Sign Up'}</button>
                <Oauth/>
            </form>
            <div className="flex pt-4">
                <p>Already Have an account?</p>
                <Link to='/signin'>
                    <p className="text-blue-500 underline">Sign In</p>    
                </Link>
                <p className="text-red-700 pl-2">{error && "Something Went Wrong!"}</p>
            </div>
        </div>
    </div>
}
