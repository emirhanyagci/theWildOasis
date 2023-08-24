import { useQuery } from "react-query";
import { getSettings } from "../../services/apiSettings";
export function useSettings() {
  const {
    data: settings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
  return { settings, isLoading, error };
}
