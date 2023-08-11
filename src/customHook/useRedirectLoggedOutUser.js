import React, { useEffect } from "react";
import { useDispatch ,useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_LOGIN } from "../redux/features/auth/authSlice";
import { getLoginStatus } from "../services/authService";
import { toast } from "react-toastify";
import { selectIsLoggedIn } from "../redux/features/auth/authSlice";

const useRedirectLoggedOutUser = (path) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    const redirectLoggedOutUser = async () => {
      const isLoggedIn = await getLoginStatus();
      dispatch(SET_LOGIN(isLoggedIn));

      if (isLoggedIn) {
        toast.info("Session expired, please login to continue.");
        navigate(path);
        return;
      }
    };
    redirectLoggedOutUser();
  }, [navigate, path, dispatch]);
};

export default useRedirectLoggedOutUser;
