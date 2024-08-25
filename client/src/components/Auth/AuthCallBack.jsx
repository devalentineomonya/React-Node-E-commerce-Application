import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Loading from "../common/Loading/Loading";
import { setUser } from "../../../app/features/auth/authSlice";
import { useFetchUserDataQuery } from "../../../app/features/user/userAPI";
import { decryptMessage } from "../../../utils/decryptionUtil";
import { toast } from "react-toastify";

const GoogleAuthCallback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");
  const userId = searchParams.get("id");
  const encryptedMessage = searchParams.get("msg_id");
  const decryptedMessage = encryptedMessage ? decryptMessage(encryptedMessage) : null;

  useEffect(() => {
    if (decryptedMessage) {
      toast.error(decryptedMessage); 
      navigate("/auth/login"); 
      return;
    }

    if (token && userId) {
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
    }
    
  }, [decryptedMessage, token, userId, navigate, dispatch]);

  const { data: userData, isFetching } = useFetchUserDataQuery(userId, {
    skip: !userId || !!decryptedMessage,
  });

  useEffect(() => {
    if (userData) {
      dispatch(setUser(userData.data));
      toast.success("Logged in successfully!")
      navigate("/");
    }
  }, [dispatch, navigate, userData]);

  if (isFetching) {
    return <Loading />;
  }

  return null;
};

export default GoogleAuthCallback;
