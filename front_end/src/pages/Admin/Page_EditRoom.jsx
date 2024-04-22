import React, {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import  Header_Admin  from "../../components/Admin/Layout/Header";
import  Sidebar_Admin  from "../../components/Admin/Layout/SideBar";
import { useAccessToken } from "../../components/ultiti";
import { Alert } from "@material-tailwind/react";
import EditRoomForm from "../../components/Admin/EditRoom_Form";
import { getHotel } from "../../api/hotel_API";
import { getRoomdetailinHotel, putRoom } from "../../api/room_in_hotel_API";
  
function EditRoom () {
  const token = useAccessToken()
  const {hotel_id, room_id}  = useParams();
  const [hotel, setHotel] = useState([]);
  const [room, setRooms] = useState({
    hotel: "",
    roomname: "",
    roomimage: null,
    descriptions: "",
    roomprice: "",
    roomnumber: "",
    roomoccupancy: "",
    room_type: "",
    dateadded: "",

  });
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch hotel details
    const fetchData = async () => {
        try {
            const [hotelData, roomData] = await Promise.all([
                getHotel(),
                getRoomdetailinHotel(hotel_id, room_id)
            ]);

            // Lấy ra đối tượng phòng từ mảng roomData
            const roomObject = roomData[0];
            setHotel(hotelData);
            setRooms(roomObject);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    fetchData();
}, [hotel_id, room_id]);

  const handleUpdate = async () => {
    try {
      const roomData = {
        hotel: room.hotel,
        roomname: room.roomname,
        roomimage: room.roomimage,
        descriptions:  room.descriptions,
        roomprice: room.roomprice,
        roomnumber: room.roomnumber,
        roomoccupancy: room.roomoccupancy,
        room_type: room.room_type,
        dateadded: room.dateadded
      };

      const response = await putRoom(room_id, token, roomData);
      console.log("Update successful:", response.data);
      setUpdateSuccess(true);
      setTimeout(() => {
        setUpdateSuccess(false);
        navigate(`/admin/${hotel_id}/list-rooms/`);
      }, 1000);
    } catch (error) {
      console.error('Update failed:', error);
    }
    
  };
  const handleChange = (e) => {
    
    const { name, value, files } = e.target;
  
    if (name === "roomimage" && files && files.length > 0) {
      
      const file = files[0];

      setRooms((prevRoom) => ({
        ...prevRoom,
        [name]: file,
      }));
    } else {
      setRooms((prevRoom) => ({ ...prevRoom, [name]: value }));
    };
  };
  const handleSelectChange = (value) => {

    handleChange({ target: { name: "room_type", value } });
  
  };
  const selectedHotel = hotel.find((item) => item.hotel_id === room.hotel);
  return (
      <> 
      <div className=" flex h-screen overflow-hidden">  
      
        <Sidebar_Admin/> 
          <div className="flex flex-col flex-1 w-full">
              <Header_Admin/>
        {updateSuccess && (
            <Alert
                className="rounded-none border-l-4 border-[#2ec946] bg-[#2ec946]/10 font-medium text-[#2ec946]"
              >
                Update successfuly !!
          </Alert>
        )}
             <EditRoomForm room={room} handleChange={handleChange} handleSelectChange={handleSelectChange} handleUpdate={handleUpdate} selectedHotel={selectedHotel}/>             
          </div>
      </div>
    </>
  );
} export default EditRoom;