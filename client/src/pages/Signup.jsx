import { Link } from "react-router-dom";

export default function SignUp() {
    return <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-center font-bold py-4 text-3xl">Sign Up</h1>
        <div className="font-bold flex justify-center text-2xl py-4">Create an account</div>
        <div>
            <div className="flex flex-col gap-4">
                <input type="text" placeholder="Username" className=" p-3 rounded-lg bg-slate-100" />
                <input type="text" placeholder="Password" className="p-3 rounded-lg bg-slate-100" />
                <input type="text" placeholder="Email" className="p-3 rounded-lg bg-slate-100" />
                <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-65">Sign up</button>
            </div>
            <div className="flex pt-4">
                <p>Already Have an account?</p>
                <Link to='/signin'>
                    <p className="text-blue-500 underline">Sign In</p>    
                </Link>
            </div>
        </div>
    </div>
}
