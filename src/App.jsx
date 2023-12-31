import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DarkModeProvider } from "./context/DarkModeContext";
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
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
import ProtectedRoute from "./ui/ProtectedRoute";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });

  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
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
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route
                index
                element={<Navigate replace={true} to="dashboard" />}
              ></Route>
              <Route path="dashboard" element={<Dashboard />}></Route>
              <Route path="Bookings" element={<Bookings />}></Route>
              <Route path="bookings/:bookingId" element={<Booking />}></Route>
              <Route path="checkin/:bookingId" element={<Checkin />}></Route>

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
    </DarkModeProvider>
  );
}

export default App;
