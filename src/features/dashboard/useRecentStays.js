import { subDays } from "date-fns";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export default function useRecentStays() {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get("last")
    ? 7
    : parseInt(searchParams.get("last"));
  const queryDate = subDays(new Date(), numDays).toISOString();
  const { isLoading, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${numDays}`],
  });
  const confirmedStays = stays?.filter((stay) => stay.status !== "unconfirmed");
  return { isLoading, stays, confirmedStays, numDays };
}
