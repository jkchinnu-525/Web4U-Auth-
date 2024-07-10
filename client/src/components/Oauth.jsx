import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../Redux/User/Userslice';
import { app } from '../firebase';
export default function Oauth() {
    const dispatch = useDispatch();
    const handleGoogle = async () => {
        try{
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth,provider);
            const res = await fetch('http://localhost:9000/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                })
            });
            const data = await res.json();
            console.log(data);
            dispatch(signInSuccess(data));
        }   catch(error){
            console.log('Couldnot log in with google:', error);
        }
    }
    return (
        <button type='button' onClick={handleGoogle} className='bg-red-600 rounded-lg hover:opacity-65 px-2 py-3 text-white'>CONTINUE WITH GOOGLE</button>
    )
}
