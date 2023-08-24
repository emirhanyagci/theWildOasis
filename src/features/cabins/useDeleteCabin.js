import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "react-query";
export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success("Successfully deleted");
      queryClient.invalidateQueries(["cabins"]);
    },
    onError: () => {
      toast.error("Failed deleting");
    },
  });
  return { isDeleting, deleteCabin };
}
