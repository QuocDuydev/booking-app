import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAccessToken } from "../ultiti";
import Utilities from "./Layout/Utilities";
import { getRoominHotel } from "../../api/room_in_acc_API";
import { getBooking, getlistBooking } from "../../api/booking_API";
import {
    Card,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import ButtonSearch from "./Button_Search";
import FiltersRoom from "./Filter_Room";

function RoominHotel() {
    const { hotel_id } = useParams();
    const token = useAccessToken();
    const [rooms, setRooms] = useState([]);
    const [bookedRoomIds, setBookedRoomIds] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // useEffect(() => {
    //     setIsLoggedIn(!!token);
    //     const fetchData = async () => {
    //         try {
    //             // Fetch hotel and booking data
    //             const [hotelData, bookingData] = await Promise.all([getRoominHotel(hotel_id, token), getBooking(token)]);

    //             // Extract booked room ids from booking data
    //             const bookedRoomIds = bookingData.map(booking => booking.room);
    //             setBookedRoomIds(bookedRoomIds);

    //             // Filter available rooms
    //             const availableRooms = hotelData.filter(room => !bookedRoomIds.includes(room.room_id));
    //             setRooms(availableRooms);
    //             console.log(availableRooms);
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         }
    //     };

    //     fetchData();
    // }, [hotel_id, token]);

    useEffect(() => {
        setIsLoggedIn(!!token);
        const fetchData = async () => {
            try {
                // Fetch hotel and booking data
                const [roomData, bookingData] = await Promise.all([
                    getRoominHotel(hotel_id, token),
                    getlistBooking(token)
                ]);

                // Extract booked room ids from booking data
                const bookedRoomIds = bookingData.map(booking => booking.room);
                setBookedRoomIds(bookedRoomIds);

                // Filter available rooms
                const availableRooms = roomData.filter(room => {
                    // Kiểm tra xem phòng có trong danh sách phòng đã đặt không
                    const isBooked = bookedRoomIds.includes(room.room_id);
                    // Kiểm tra trạng thái của phòng
                    const isHidden = room.status === 'hide';

                    return !isBooked || isHidden;
                });
                availableRooms.sort((a, b) => a.roomprice - b.roomprice);
                setRooms(availableRooms);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [hotel_id, token]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRoomType, setSelectedRoomType] = useState('');
    const [selectedPriceMin, setSelectedPriceMin] = useState('');
    const [selectedPriceMax, setSelectedPriceMax] = useState('');

    function removeAccents(str) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    const isPriceInRange = (Prices, min, max) => {
        if (min === '' && max === '') {
            return true;
        }

        const minRange = parseInt(min) || 0;
        const maxRange = parseInt(max) || Infinity;

        return Prices >= minRange && Prices <= maxRange;
    };
    const handleRoomTypeFilter = (room_type) => {
        setSelectedRoomType((prevRoomtype) => {
            // Kiểm tra xem vị trí đã được chọn chưa
            const index = prevRoomtype.indexOf(room_type);

            // Nếu vị trí đã được chọn, loại bỏ nó khỏi danh sách
            if (index !== -1) {
                const updatedRoomtype = [...prevRoomtype];
                updatedRoomtype.splice(index, 1);
                return updatedRoomtype;
            } else {
                // Nếu vị trí chưa được chọn, thêm nó vào danh sách
                return [...prevRoomtype, room_type];
            }
        });
    };

    const handlePriceFilter = (Prices) => {
        const [min, max] = Prices.split('-');

        // Convert min and max to integers
        const minRange = parseInt(min) || 0;
        const maxRange = parseInt(max) || Infinity;

        if (
            minRange === parseInt(selectedPriceMin) &&
            maxRange === parseInt(selectedPriceMax)
        ) {
            // If the selected range is being toggled, reset to default values
            setSelectedPriceMin('');
            setSelectedPriceMax('');
        } else {
            // Set the selected range values
            setSelectedPriceMin(minRange.toString());
            setSelectedPriceMax(maxRange.toString());
        }
    };
    const filteredRooms = rooms.filter((room) => {
        const searchTermWithoutAccents = removeAccents(searchTerm.toLowerCase());
        const roomNameWithoutAccents = removeAccents(room.roomname.toLowerCase());

        const matchesSearchTerm = roomNameWithoutAccents.includes(searchTermWithoutAccents);

        // Kiểm tra xem vị trí của khách sạn có trùng khớp với vị trí được chọn hay không
        const matchesRoomType = selectedRoomType.length > 0 ? selectedRoomType.includes(room.room_type) : true;

        const matchesPrices = isPriceInRange(room.roomprice, selectedPriceMin, selectedPriceMax);


        return matchesSearchTerm && matchesRoomType && matchesPrices;
    });
    return (
        <>
            <div className='container mx-auto relative'>
                <Typography variant="h4"
                    className=" mt-[40px] font-bold mb-5">
                    Availability Room
                </Typography>

                <ButtonSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <div className="grid grid-cols-4">
                    <FiltersRoom handleRoomTypeFilter={handleRoomTypeFilter} handlePriceFilter={handlePriceFilter} />
                    <div className="grid gap-4 relative col-span-5 m-4 md:col-span-5 lg:col-span-3">
                        {isLoggedIn ? (
                            <>
                                {rooms.length > 0 ? (
                                    filteredRooms.map(rooms => (
                                        <div key={rooms.room_id} className="mb-4 ">
                                            <Card className="w-full mx-auto mb-2 border-2">
                                                <CardBody className="flex">

                                                    <img
                                                        src={rooms.roomimage}
                                                        className="h-30 w-1/3 rounded-lg object-cover object-center"
                                                    />
                                                    <div className="m-3 flex flex-col justify-between w-2/3">
                                                        <Typography variant="h5" color="blue-gray" className="mb-2 text-blue-800">
                                                            {rooms.roomname} - {rooms.hotel}
                                                        </Typography>
                                                        <Typography className="text-justify">
                                                            {rooms.descriptions.slice(0, 100)}
                                                        </Typography>
                                                        <Typography className="text-right mb-3 text-2xl font-bold text-red-500">
                                                            $ {rooms.roomprice}
                                                        </Typography>

                                                        <div className="flex justify-between items-center mt-3 ">
                                                            <Utilities />
                                                            <span className=" hidden lg:block md:block mx-auto px-2 py-2 text-center text-lg leading-tight text-orange-700 bg-orange-100 rounded-full dark:text-white dark:bg-orange-600">{rooms.room_type}</span>
                                                        </div>

                                                        <div className="flex justify-center mt-3">

                                                            <Link to={`/booking/${hotel_id}/${rooms.room_id}`}>
                                                                <Button size="lg" className=" bg-black">Booking Nows</Button>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </div>
                                    ))
                                ) : (
                                    <div>
                                        <h3 colSpan="6" className="px-4 py-3 text-center text-red-600 font-semibold">
                                            The hotel currently has no available rooms!
                                        </h3>
                                    </div>)}
                            </>
                        ) : (
                            <div>
                                <h3 className="px-4 py-3 text-center text-red-600 font-semibold">
                                    Please log in or sign up to view the list of rooms and make a booking!
                                </h3>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>

    );
}
export default RoominHotel;