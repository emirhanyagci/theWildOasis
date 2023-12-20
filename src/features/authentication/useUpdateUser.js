import { useMutation, useQueryClient } from "react-query";
import { updateCurrentUser } from "../../services/apiAuth";

import toast from "react-hot-toast";
export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLOading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      toast.success("User updated");
      queryClient.invalidateQueries({ queryKey: "user" });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { updateUser, isUpdating };
}
