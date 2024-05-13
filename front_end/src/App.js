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
import ShowAccomodationDetails from "./pages/Customer/Page_AccommodationDetails.jsx";

import Show_ListImg_Acc from "./pages/Customer/Page_ListImg_Acc.jsx";

import Booking from "./pages/Customer/Page_Booking.jsx";
import ShowListBooking from "./pages/Customer/Page_ListBooking.jsx";
import EditBooking from "./pages/Customer/Page_EditBooking.jsx";

// url interface Admin
import AdminHome from "./pages/Admin/Page_AdminHome.jsx";

import ListCustomer from "./pages/Admin/Page_ListCustomer.jsx";
import EditCustomer from "./pages/Admin/Page_EditCustomer.jsx";

import CreateAccommodation from "./pages/Admin/Page_CreateAccommodation.jsx";
import ListHotelAdmin from "./pages/Admin/Page_ListHotel.jsx";
import ListHomeStayAdmin from "./pages/Admin/Page_ListHomeStay.jsx";
import ListMotelAdmin from "./pages/Admin/Page_ListMotel.jsx";
import EditAccommodation from "./pages/Admin/Page_EditAccommodation.jsx";

import CreateRoom from "./pages/Admin/Page_CreateRoom.jsx";
import ListRoom from "./pages/Admin/Page_ListRoom.jsx";
import EditRoom from "./pages/Admin/Page_EditRoom.jsx";

import ListBookings from "./pages/Admin/Page_ListBooking_Admin.jsx";
import EditBookings from "./pages/Admin/Page_EditBooking_Admin.jsx";
import ProfileAdmin from "./pages/Admin/Page_Profile_Admin.jsx";
import Page_ListHotel from "./pages/Customer/Page_ListHotel.jsx";
import Page_ListHomeStay from "./pages/Customer/Page_ListHomeStay.jsx";
import Page_ListMotel from "./pages/Customer/Page_ListMotel.jsx";
import SearchResult from "./pages/Customer/Page_SearchResult.jsx";




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
          <Route path="/search-results" element={<SearchResult />} />
          <Route path="/accommodations/:acc_id" element={<ShowAccomodationDetails />} />
          <Route path="/list-hotel" element={<Page_ListHotel />} />
          <Route path="/list-homestay" element={<Page_ListHomeStay />} />
          <Route path="/list-motel" element={<Page_ListMotel />} />
          <Route path="/accommodations/:acc_id/list-images" element={<Show_ListImg_Acc />} />
          <Route path="/booking/:acc_id/:room_id" element={<Booking />} />
          <Route path="/list-booking" element={<ShowListBooking />} />
          <Route path="/edit-booking/:booking_id" element={<EditBooking />} />

          <Route path="/admin" element={<AdminRoute element={<AdminHome />} isAdmin={isAdmin} />} />
          <Route path="/admin/profile/:id" element={<AdminRoute element={<ProfileAdmin />} isAdmin={isAdmin} />} />
          <Route path="/admin/:acc_id/create-rooms" element={<AdminRoute element={<CreateRoom />} isAdmin={isAdmin} />} />
          <Route path="/admin/:acc_id/list-rooms" element={<AdminRoute element={<ListRoom />} isAdmin={isAdmin} />} />
          <Route path="/admin/:acc_id/edit-room/:room_id" element={<AdminRoute element={<EditRoom />} isAdmin={isAdmin} />} />
          <Route path="/admin/create-hotel" element={<AdminRoute element={<CreateAccommodation />} isAdmin={isAdmin} />} />
          <Route path="/admin/list-hotel" element={<AdminRoute element={<ListHotelAdmin />} isAdmin={isAdmin} />} />
          <Route path="/admin/list-homestay" element={<AdminRoute element={<ListHomeStayAdmin />} isAdmin={isAdmin} />} />
          <Route path="/admin/list-motel" element={<AdminRoute element={<ListMotelAdmin />} isAdmin={isAdmin} />} />
          <Route path="/admin/edit-hotel/:acc_id" element={<AdminRoute element={<EditAccommodation />} isAdmin={isAdmin} />} />
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
