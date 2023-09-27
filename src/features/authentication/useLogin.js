import { useMutation, useQueryClient } from "react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi(email, password),
    onSuccess: (user) => {
      console.log(user);
      queryClient.setQueriesData(["user"], user.user);
      navigate("/dashboard");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { login, isLoading };
}
