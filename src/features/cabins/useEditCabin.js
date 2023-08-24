import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
export function useEditCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ newCabinData, id }) => {
      console.log(newCabinData);
      createEditCabin(newCabinData, id);
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries(["cabins"]);
      toast.success("Successfully eddited cabin");
    },
    onError: (error) => {
      toast.success(error.message);
    },
  });
  return { isEditing, editCabin };
}
