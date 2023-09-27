import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "react-query";
export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success("Successfully deleted");
      queryClient.invalidateQueries(["bookings"]);
    },
    onError: () => {
      toast.error("Failed deleting");
    },
  });
  return { isDeleting, deleteBooking };
}
