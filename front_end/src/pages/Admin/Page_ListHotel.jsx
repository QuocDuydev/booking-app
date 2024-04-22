import { useState, useEffect } from "react";
import Header_Admin from "../../components/Admin/Layout/Header";
import Sidebar_Admin from "../../components/Admin/Layout/SideBar";
import { useAccessToken } from "../../components/ultiti";
import { getHotel } from "../../api/hotel_API";
import { deleteHotel } from "../../api/hotel_API";
import HotelTable from "../../components/Admin/Hotel_Table";
import Pagination from "../../components/Customer/Layout/Panination";

function ListHotelAdmin() {
    const token = useAccessToken()
    const [hotels, setHotels] = useState([]);
    const isConfirmed = false;
    useEffect(() => {
        const fetchData = async () => {
            try {

                const hotelData = await getHotel();

                setHotels(hotelData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (item) => {
        const isConfirmed = window.confirm("Are you sure you want to delete?");
        if (isConfirmed) {
            try {
                await deleteHotel(item.hotel_id, token);
                const updateHotels = await getHotel();
                setHotels(updateHotels);
                window.location.reload();
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        };
    }
    const [currentPage, setCurrentPage] = useState(1);
    // Giả sử danh sách khách sạn là một mảng hotels
    const hotelsPerPage = 5;
    const totalHotels = hotels.length;
    const totalPages = Math.ceil(totalHotels / hotelsPerPage);

    // Hàm xử lý để lấy danh sách khách sạn cho trang hiện tại
    const getHotelsForPage = (pageNumber) => {
        const startIndex = (pageNumber - 1) * hotelsPerPage;
        const endIndex = startIndex + hotelsPerPage;
        return hotels.slice(startIndex, endIndex);
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
                    <HotelTable handleDelete={handleDelete} getHotelsForPage={getHotelsForPage} currentPage={currentPage}/>
                    <Pagination handlePageChange={handlePageChange} totalPages={totalPages} />
                </div>
            </div>
        </>
    )
} export default ListHotelAdmin;