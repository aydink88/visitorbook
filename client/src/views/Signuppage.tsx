import { useNavigate } from "react-router-dom";
import SignupForm from "../components/SignupForm";
import { useAuthContext } from "../contexts/auth";

const Signuppage = () => {
  const { auth } = useAuthContext();
  const navigate = useNavigate();

  if (auth.userId) navigate("/");

  return <SignupForm />;
};

export default Signuppage;
