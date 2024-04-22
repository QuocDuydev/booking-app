import { useState, useEffect } from "react";
import Header_Admin from "../../components/Admin/Layout/Header";
import Sidebar_Admin from "../../components/Admin/Layout/SideBar";
import { useAccessToken } from "../../components/ultiti";
import { deleteBooking, getlistBooking } from "../../api/booking_API";
import BookingTable from "../../components/Admin/Booking_Table";
import Pagination from "../../components/Customer/Layout/Panination";

function ListBookings() {
    const [bookings, setBookings] = useState([]);
    const isConfirmed = false;
    let token = useAccessToken()

    useEffect(() => {
        const fetchData = async () => {
            try {

                const bookingData = await getlistBooking(token);

                setBookings(bookingData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (item) => {
        const isConfirmed = window.confirm("Are you sure you want to delete?");
        if (isConfirmed) {
            if (item.status === "active") {
                alert("Cannot delete an active booking!");
            } else {
                try {
                    await deleteBooking(item.booking_id, token);
                    const updateBookings = await getlistBooking(token);
                    setBookings(updateBookings);
                    window.location.reload();
                } catch (error) {
                    console.error("Error deleting booking:", error);
                }
            }
        }
    };
    const [currentPage, setCurrentPage] = useState(1);
    // Giả sử danh sách khách sạn là một mảng hotels
    const bookingsPerPage = 5;
    const totalBookings = bookings.length;
    const totalPages = Math.ceil(totalBookings / bookingsPerPage);

    // Hàm xử lý để lấy danh sách khách sạn cho trang hiện tại
    const getBookingsForPage = (pageNumber) => {
        const startIndex = (pageNumber - 1) * bookingsPerPage;
        const endIndex = startIndex + bookingsPerPage;
        return bookings.slice(startIndex, endIndex);
    };

    // Xử lý khi chuyển tới một số trang mới
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    return (
        <>
            <div className=" flex h-screen overflow-hidden">
                <Sidebar_Admin />
                <div className="flex flex-col flex-1 w-full">
                    <Header_Admin />
                    <BookingTable handleDelete={handleDelete} getBookingsForPage={getBookingsForPage} currentPage={currentPage} />
                    <Pagination handlePageChange={handlePageChange} totalPages={totalPages} />
                </div>
            </div>
        </>
    )
} export default ListBookings;