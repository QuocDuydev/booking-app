import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import Header_Admin from "../../components/Admin/Layout/Header";
import Sidebar_Admin from "../../components/Admin/Layout/SideBar";
import { deleteRoominHotel, getRoominHotel } from "../../api/room_in_hotel_API";
import RoomTable from "../../components/Admin/Room_Table";
import Pagination from "../../components/Customer/Layout/Panination";

function ListRoom() {
    const { hotel_id } = useParams();
    const [rooms, setRooms] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {

                const roomData = await getRoominHotel(hotel_id);

                setRooms(roomData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [hotel_id]);

    const handleDelete = async (roomId) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this room?");
        if (isConfirmed) {
            try {
                await deleteRoominHotel(roomId);
                // Lọc ra danh sách phòng mới sau khi xóa
                const updatedRooms = rooms.filter(room => room.room_id !== roomId);
                setRooms(updatedRooms);
            } catch (error) {
                console.error("Error deleting room:", error);
            }
        }
    };
    const [currentPage, setCurrentPage] = useState(1);
    // Giả sử danh sách khách sạn là một mảng hotels
    const roomsPerPage = 5;
    const totalRooms = rooms.length;
    const totalPages = Math.ceil(totalRooms / roomsPerPage);

    // Hàm xử lý để lấy danh sách khách sạn cho trang hiện tại
    const getRoomsForPage = (pageNumber) => {
        const startIndex = (pageNumber - 1) * roomsPerPage;
        const endIndex = startIndex + roomsPerPage;
        return rooms.slice(startIndex, endIndex);
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
                    <RoomTable hotel_id={hotel_id} handleDelete={handleDelete} getRoomsForPage={getRoomsForPage} currentPage={currentPage}/>
                    <Pagination handlePageChange={handlePageChange} totalPages={totalPages}/>
                </div>
            </div>
        </>
    )
} export default ListRoom;