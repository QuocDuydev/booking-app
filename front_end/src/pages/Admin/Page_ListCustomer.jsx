import { useState, useEffect } from "react";
import Header_Admin from "../../components/Admin/Layout/Header";
import Sidebar_Admin from "../../components/Admin/Layout/SideBar";
import { useAccessToken } from "../../components/ultiti";
import { getUser } from "../../api/user_API";
import CustomerTable from "../../components/Admin/Customer_Table";
import { deleteUsers } from "../../api/user_API";
import Pagination from "../../components/Customer/Layout/Panination";

function ListCustomer() {
    const [users, setUser] = useState([]);
    const isConfirmed = false;
    const token = useAccessToken()

    useEffect(() => {
        const fetchData = async () => {
            try {

                const userData = await getUser(token);

                setUser(userData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [token]);


    const handleDelete = async (item) => {
        const isConfirmed = window.confirm("Are you sure you want to delete?");
        if (isConfirmed) {
            try {
                await deleteUsers(item.id, token);
                const updatedUsers = await getUser(token);
                setUser(updatedUsers);
                window.location.reload();
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        }
    };
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;
    const totalUsers = users.length;
    const totalPages = Math.ceil(totalUsers / usersPerPage);

    // Hàm xử lý để lấy danh sách khách sạn cho trang hiện tại
    const getUsersForPage = (pageNumber) => {
        const startIndex = (pageNumber - 1) * usersPerPage;
        const endIndex = startIndex + usersPerPage;
        return users.slice(startIndex, endIndex);
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
                    <CustomerTable handleDelete={handleDelete} getUsersForPage={getUsersForPage} currentPage={currentPage}/>
                    <Pagination handlePageChange={handlePageChange} totalPages={totalPages}/>
                </div>
            </div>
        </>
    )
} export default ListCustomer;