import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../redux/auth/authSlice';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
    dispatch(reset());
  }, [user, navigate, dispatch]);
  
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  }

  return (
    <div className="home">
      <div className="home-content">
        <h1> Home Page </h1>
        {user && <h3>Hello {user.fullname}</h3>}
        <button 
          type="submit" 
          className="btn-logout" 
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home