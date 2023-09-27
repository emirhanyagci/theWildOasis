import { useMutation, useQueryClient } from "react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();
  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} succesfully checked out`);
      queryClient.invalidateQueries({ active: true });
      queryClient.invalidateQueries(["bookings"]);
    },
    onError: () => toast.error("There was an error while checking out"),
  });
  return { checkout, isCheckingOut };
}
