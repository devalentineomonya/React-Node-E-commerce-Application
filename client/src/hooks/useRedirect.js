import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const useRedirect = ({ to }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.pathname;

  useEffect(() => {
    localStorage.setItem('redirectTo', from);
    navigate(to);
  }, [to, navigate, from]);

  return null;
};

export default useRedirect;
