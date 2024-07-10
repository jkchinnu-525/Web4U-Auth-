import { useSelector } from "react-redux";
export default function Profile() {
    const { currentUser} = useSelector((state) => state.user);
    return <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-center text-3xl py-8 font-bold ">Profile</h1>
        <form className="flex flex-col gap-4">
            <img src = {currentUser.profilePhoto} alt="Profile" className="h-24 w-24 self-center cursor-pointer rounded-full object-cover"/>
            <input defaultValue={currentUser.username} type = "text" id="username" placeholder="Username" className="bg-slate-200 rounded-lg p-3"/>
            <input defaultValue={currentUser.email} type = "email" id="email" placeholder="Email" className="bg-slate-200 rounded-lg p-3"/>
            <input type = "password" id="password" placeholder="password" className="bg-slate-200 rounded-lg p-3"/>
            <button className="bg-slate-600 text-md text-white p-3 rounded-full cursor-pointer uppercase hover:opacity-95">Update</button>
        </form>
        <div className="flex justify-between mt-4">
            <span className="text-red-500">Delete Account</span>
            <span className="text-red-500">Sign out</span>
        </div>
    </div>
}