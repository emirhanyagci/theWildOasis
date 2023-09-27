import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success("Successfully deleted");
      queryClient.invalidateQueries(["bookings"]);
    },
    onError: () => {
      toast.error("Failed deleting");
    },
    onSettled() {
      navigate(-1);
    },
  });
  return { isDeleting, deleteBooking };
}
