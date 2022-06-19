import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Lock from '../img/lock.png';
import facebook from '../img/facebook.png';
import LeftSide from '../components/LeftSide';
import Languages from '../components/Languages';
import { register, reset } from '../redux/auth/authSlice';


const Register = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  
  const navigate = useNavigate();

  const { user, isLoading, isSuccess, isError, message } = useSelector(state => state.auth);

  useEffect(() => {
    if(isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate('/home');
    }
    dispatch(reset());
  }, [user, isLoading, isSuccess, isError, message, navigate, dispatch]);

  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const handleSubmit = e => {
    e.preventDefault();
    if(!fullname || !email || !password){
      alert('Please fill all the fields');
      return;
    }
    if(!email.match(validRegex)){
      alert('Please enter a valid email');
      return;
    }
    if(password.length < 6){
      alert('Password must be at least 6 characters long');
      return;
    }
    const userData = { fullname, email, password };
    dispatch(register(userData));
  }

  return (
    <div className="row">
      <LeftSide />
      <div className="right">
        <Languages />
        <div className="content">
          <div className="title">
            <h5>Create Account</h5>
          </div>
          <div className="social-btn">
            <button className="facebook-btn"> 
              <img src={facebook} alt="facebook" className="facebook-img" /> 
              <span>Sign up with Facebook</span>
            </button>
          </div>
          <p className="or">- OR -</p>
          <form onSubmit={handleSubmit} className="form">
            <div>
              <input 
                className="input-text" 
                type="text" 
                placeholder="Full Name" 
                value={fullname} 
                onChange={e => setFullname(e.target.value)} 
              />
            </div>
            <div>
              <input 
                className="input-text" 
                type="text" 
                placeholder="Email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
              />
            </div>
            <div>
              <input 
                type="text" 
                className="input-text" 
                placeholder="Password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
              />
              <img className="lock" src={Lock} alt="lock" />
            </div>
            <button type="submit" className="btn-register"> Create Account </button>
          </form>
          <p className="login-link">
            Already have an account? <Link to={"/login"}>Log In</Link> 
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register