import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import {app} from "../firebase"
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../hooks/usersSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const buttonStyle = {
      backgroundColor: '#EF4444', // Equivalent to bg-red-700
      color: '#FFFFFF', // Equivalent to text-white
      padding: '0.75rem', // Equivalent to p-3
      borderRadius: '0.5rem', // Equivalent to rounded-lg
      textTransform: 'uppercase',
      border:"none",
      cursor: 'pointer',
      '&:hover': {
        opacity: '0.95', // Equivalent to hover:opacity-95
      },
    };
  
    const handleGoogleClick = async () => {
      try {
        const provider = new GoogleAuthProvider();
        const auth = getAuth(app);
  
        const result = await signInWithPopup(auth, provider);
  
        const res = await fetch('https://mern-kzu7.onrender.com/google', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: result.user.displayName,
            email: result.user.email,
            Image: result.user.photoURL,
          }),
        });
        const data = await res.json();
        dispatch(signInSuccess(data));
        navigate('/home');
      } catch (error) {
        console.log('could not sign in with google', error);
      }
    };
  
    return (
      <button
        onClick={handleGoogleClick}
        type='button'
        style={buttonStyle}
      >
        Continue with Google
      </button>
    );
  }
  