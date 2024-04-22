import "./index.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// url config
import { AuthProvider } from "./context/AuthContext.jsx";
import AdminRoute from "./context/PrivateRoute.jsx";

// url interface Customer
import Login from "./pages/Customer/Page_Login.jsx";
import Registers from "./pages/Customer/Page_Register.jsx";
// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import Error from "./pages/Page_Error.jsx";
import ShowProfile from "./pages/Customer/Page_Profile.jsx";

import Home from "./pages/Customer/Page_Home.jsx";
import ListSearch from "./pages/Customer/Page_Search.jsx";
import ShowHotelDetails from "./pages/Customer/Page_HotelDetails.jsx";

import Booking from "./pages/Customer/Page_Booking.jsx";
import ShowListBooking from "./pages/Customer/Page_ListBooking.jsx";
import EditBooking from "./pages/Customer/Page_EditBooking.jsx";

// url interface Admin
import AdminHome from "./pages/Admin/Page_AdminHome.jsx";

import ListCustomer from "./pages/Admin/Page_ListCustomer.jsx";
import EditCustomer from "./pages/Admin/Page_EditCustomer.jsx";

import CreateHotel from "./pages/Admin/Page_CreateHotel.jsx";
import ListHotelAdmin from "./pages/Admin/Page_ListHotel.jsx";
import EditHotel from "./pages/Admin/Page_EditHotel.jsx";

import CreateRoom from "./pages/Admin/Page_CreateRoom.jsx";
import ListRoom from "./pages/Admin/Page_ListRoom.jsx";
import EditRoom from "./pages/Admin/Page_EditRoom.jsx";

import ListBookings from "./pages/Admin/Page_ListBooking_Admin.jsx";
import EditBookings from "./pages/Admin/Page_EditBooking_Admin.jsx";
import ProfileAdmin from "./pages/Admin/Page_Profile_Admin.jsx";


function App() {
  const [isAdmin] = useState(true);

  return (
    <Router>
      <AuthProvider>
        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registers />} />
          <Route path="/error" element={<Error />} />
          <Route path="/profile/:id" element={<ShowProfile />} />

          <Route path="/" element={<Home />} />
          <Route path="/search-results" element={<ListSearch />} />
          <Route path="/hotel/:hotel_id" element={<ShowHotelDetails />} />
          <Route path="/booking/:hotel_id/:room_id" element={<Booking />} />
          <Route path="/list-booking" element={<ShowListBooking />} />
          <Route path="/edit-booking/:booking_id" element={<EditBooking />} />

          <Route path="/admin" element={<AdminRoute element={<AdminHome />} isAdmin={isAdmin} />} />
          <Route path="/admin/profile/:id" element={<AdminRoute element={<ProfileAdmin />} isAdmin={isAdmin} />} />
          <Route path="/admin/:hotel_id/create-rooms" element={<AdminRoute element={<CreateRoom />} isAdmin={isAdmin} />} />
          <Route path="/admin/:hotel_id/list-rooms" element={<AdminRoute element={<ListRoom />} isAdmin={isAdmin} />} />
          <Route path="/admin/:hotel_id/edit-room/:room_id" element={<AdminRoute element={<EditRoom />} isAdmin={isAdmin} />} />
          <Route path="/admin/create-hotel" element={<AdminRoute element={<CreateHotel />} isAdmin={isAdmin} />} />
          <Route path="/admin/list-hotel" element={<AdminRoute element={<ListHotelAdmin />} isAdmin={isAdmin} />} />
          <Route path="/admin/edit-hotel/:hotel_id" element={<AdminRoute element={<EditHotel />} isAdmin={isAdmin} />} />
          <Route path="/admin/list-customer" element={<AdminRoute element={<ListCustomer />} isAdmin={isAdmin} />} />
          <Route path="/admin/edit-customer/:id" element={<AdminRoute element={<EditCustomer />} isAdmin={isAdmin} />} />
          <Route path="/admin/list-booking" element={<AdminRoute element={<ListBookings />} isAdmin={isAdmin} />} />
          <Route path="/admin/edit-booking/:booking_id" element={<AdminRoute element={<EditBookings />} isAdmin={isAdmin} />} />

        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
