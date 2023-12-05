import { useMutation } from "react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useSignup() {
  const navigate = useNavigate();
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: ({ email, password, fullName }) =>
      signupApi(email, password, fullName),
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        "Account succesfully created ! Please check your email to verify your account"
      );
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { signup, isLoading };
}
