import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Topbar = () => {
    const {currentUser} = useSelector((state) => state.user);
    return <div className="bg-black">
        <div className="flex justify-between px-2 py-2">
            <Link to='/'>
                <h1 className="pl-8 text-lg font-bold text-white">Web4U</h1>
            </Link>
            <ul className="flex gap-14 text-white">
                <Link to='/'><li>Home</li></Link>
                <Link to='/about'><li>About</li></Link>
                <Link to='/profile'>
                {currentUser ? ( <img src = {currentUser.profilePhoto} alt="profile" className="h-7 w-7 rounded-full object-cover"/>) : (<li>Signin</li>)}
                </Link>
            </ul>
        </div>
    </div>
}