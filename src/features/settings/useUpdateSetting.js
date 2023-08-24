import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries(["settings"]);
      toast.success("Successfully updated settings");
    },
    onError: (error) => {
      toast.success(error.message);
    },
  });
  return { isUpdating, updateSetting };
}
