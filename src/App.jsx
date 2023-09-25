import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Toaster } from "react-hot-toast";

import {
  Account,
  Bookings,
  Cabins,
  Dashboard,
  Login,
  PageNotFound,
  Settings,
  Users,
} from "./pages";
import AppLayout from "./ui/AppLayout";
import GlobalStyles from "./styles/GlobalStyles";
import Booking from "./pages/Booking";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <ReactQueryDevtools initialIsOpen={true} />
      <Toaster
        position="top-center"
        gutter={12}
        toastOptions={{
          style: {
            padding: "16px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route
              index
              element={<Navigate replace={true} to="dashboard" />}
            ></Route>
            <Route path="dashboard" element={<Dashboard />}></Route>
            <Route path="Bookings" element={<Bookings />}></Route>
            <Route path="bookings/:id" element={<Booking />}></Route>

            <Route path="Cabins" element={<Cabins />}></Route>
            <Route path="Users" element={<Users />}></Route>
            <Route path="Settings" element={<Settings />}></Route>
            <Route path="Account" element={<Account />}></Route>
          </Route>
          <Route path="Login" element={<Login />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
