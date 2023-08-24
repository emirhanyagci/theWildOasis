import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "react-query";
export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      queryClient.invalidateQueries(["cabins"]);
      toast.success("Successfully added new cabin");
    },
    onError: (error) => {
      toast.success(error.message);
    },
  });
  return { isCreating, createCabin };
}
