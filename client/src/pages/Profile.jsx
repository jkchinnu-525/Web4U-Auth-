import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOut, updateUserFailure, updateUserStart, updateUserSuccess } from "../Redux/User/Userslice";
import { app } from "../firebase";
export default function Profile() {
    const { currentUser, loading, error} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const fileRef = useRef(null);
    const [imagePercent, setImagePercent] = useState(0);
    const [image, setImage] = useState(undefined);
    const [imageError, setImageError] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [formData, setFormData] = useState({});
    console.log(formData);
    useEffect(() => {
        if(image) {
            handleFileUpload(image);
        }
    },[image]);
    const handleFileUpload = async (image) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + image.name;
        const storageRef = ref(storage,fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setImagePercent(Math.round(progress));
        },
        () => {
            setImageError(true);
        },
        ()  => {getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => setFormData({...FormData,profilePhoto: downloadURL,}));
        }
    );
};
const handleChange =(e) => {
    setFormData({...formData,[e.target.id]: e.target.value});
}
const apiURL = `https://web4u-l62e.onrender.com/api/user/update/${currentUser._id}`;
const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        dispatch(updateUserStart());
        const res = await fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        if(data.success === false) {
            dispatch(updateUserFailure(data));
            return;
        }
        dispatch(updateUserSuccess(data));
        setUpdateSuccess(true);
    } catch(error) {
        dispatch(updateUserFailure(error));
    }
};
const handleDeleteAccount = async() => {
    try {
        dispatch(deleteUserStart());
        const res = await fetch(`http://localhost:9000/api/user/delete/${currentUser._id}`,{
            method: 'DELETE',
        });
        const data = await res.json();
        dispatch(deleteUserSuccess(data));
        if(data.success === false) {
            dispatch(deleteUserFailure(data));
            return;
        }
    } catch(error) {
        dispatch(deleteUserFailure(error));
    }
}

const handleSignOut = async () => {
    try {
        await fetch('http://localhost:9000/api/auth/signout');
        dispatch(signOut());
    } catch(error) {
        console.log(error);
    }
}
    return <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-center text-3xl py-8 font-bold ">Profile</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input type="file" ref={fileRef} onChange={(e) => setImage(e.target.files[0])} accept="image/.*" hidden />
            <img onClick={() => fileRef.current.click()} src = {formData.profilePhoto || currentUser.profilePhoto} alt="Profile" className="h-24 w-24 self-center cursor-pointer rounded-full object-cover"/>
            <p className="self-center">
                {imageError ? (
                    <span className="text-red-700">Error while uploading image(File size must less than 2 MB)</span>) : imagePercent > 0 && imagePercent < 100 ? (
                        <span className="text-slate-600">{`Uploading: ${imagePercent} %`}</span>) : imagePercent === 100 ? (
                            <span className="text-green-400">Image uploaded succesfully</span>) : ''}
            </p>
            <input onChange={handleChange} defaultValue={currentUser.username} type = "text" id="username" placeholder="Username" className="bg-slate-200 rounded-lg p-3"/>
            <input onChange={handleChange} defaultValue={currentUser.email} type = "email" id="email" placeholder="Email" className="bg-slate-200 rounded-lg p-3"/>
            <input type = "password" id="password" placeholder="password" className="bg-slate-200 rounded-lg p-3"/>
            <button className="bg-slate-600 text-md text-white p-3 rounded-full cursor-pointer uppercase hover:opacity-95">{loading ? "loading.." : "Update"}</button>
        </form>
        <div className="flex justify-between mt-4">
            <span onClick={handleDeleteAccount} className="text-red-500 cursor-pointer underline font-bold">Delete Account</span>
            <span onClick={handleSignOut} className="text-red-500 underline cursor-pointer font-bold">Sign out</span>  
        </div>
        <p className="text-red-600 mt-5">{error && "Something went wrong"}</p>
        <p className="text-green-700 mt-5">{updateSuccess && "User successfully updated"}</p>
    </div>
}
