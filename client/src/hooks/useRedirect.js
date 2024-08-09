import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useRedirect = ({ to }) => {
  const navigate = useNavigate();
  const from = location.pathname

  useEffect(() => {

    localStorage.setItem('redirectTo', from);
    navigate(to);

  }, [to, navigate]);

  return null;
};

export default useRedirect;
