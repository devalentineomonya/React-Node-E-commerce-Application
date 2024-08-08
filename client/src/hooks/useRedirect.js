import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useRedirect = ({ to }) => {
  const navigate = useNavigate();

  useEffect(() => {

    localStorage.setItem('redirectTo', to);
    navigate('/auth/login');

  }, [to, navigate]);

  return null;
};

export default useRedirect;
