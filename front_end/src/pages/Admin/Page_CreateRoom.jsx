import React, { useState, useEffect } from "react";
import Header_Admin from "../../components/Admin/Layout/Header";
import Sidebar_Admin from "../../components/Admin/Layout/SideBar";
import { useParams, useNavigate } from "react-router-dom";
import { useAccessToken } from "../../components/ultiti";
import { Alert } from "@material-tailwind/react";
import CreateRoomForm from "../../components/Admin/CreateRoom_Form";
import { getRoominHotel, postRoom } from "../../api/room_in_hotel_API";
import { getHoteldetail } from "../../api/hotel_API";

function CreateRoom() {
  // biome-ignore lint/style/useConst: <explanation>
  let token = useAccessToken()
  const { hotel_id } = useParams();
  const [room, setRoom] = useState({
    hotel: hotel_id,
    roomname: "",
    roomimage: null,
    descriptions: "",
    roomprice: "",
    roomnumber: "",
    roomoccupancy: "",
    room_type: "",
    dateadded: new Date().toISOString().split('T')[0],

  });
  const navigate = useNavigate();
  const [CreateSuccess, setCreateSuccess] = useState(false);

  const handleChange = (e) => {
   
    const { name, type } = e.target;
    let value;
  
    if (type === "file" && e.target.files) {
      // Xử lý trường hợp là file input
      value = e.target.files[0];
    } else {
      // Xử lý trường hợp là input hoặc select
      value = e.target.value;
    }
  
    setRoom({
      ...room,
      [name]: value,
    });
  };
  const handleSelectChange = (value) => {
    
    handleChange({ target: { name: "room_type", value } });
  
  };

  const handleCreate = async () => {
    try {
      // Fetch hotel detail including total room count
      const hotelDetail = await getHoteldetail(hotel_id);
      const totalRoomsAllowed = hotelDetail.totalroom;

      // Fetch current rooms in the hotel
      const roomsInHotel = await getRoominHotel(hotel_id);
      const currentRoomsCount = roomsInHotel.length;
      console.log(currentRoomsCount);

      if (totalRoomsAllowed > currentRoomsCount) {

        const RoomData = {
          hotel: room.hotel,
          roomname: room.roomname,
          roomimage: room.roomimage,
          descriptions: room.descriptions,
          roomprice: room.roomprice,
          roomnumber: room.roomnumber,
          roomoccupancy: room.roomoccupancy,
          dateadded: room.dateadded,
          room_type: room.room_type
        };
        const response = await postRoom(token, RoomData);
        console.log("Create successful:", response.data);
        setCreateSuccess(true);
        setTimeout(() => {
          setCreateSuccess(false);
          navigate(`/admin/${hotel_id}/list-rooms/`);
        }, 1000);
      } else {
        alert("Cannot add room. Maximum room limit reached!");
        // Display message indicating maximum rooms reached
        console.log("Cannot add room. Maximum room limit reached.");
      }
    } catch (error) {
      console.error('Create failed:', error);
    }
  };

  return (
    <>
      <div className=" flex h-screen overflow-hidden">

        <Sidebar_Admin />
        <div className="flex flex-col flex-1 w-full">
          <Header_Admin />
          {CreateSuccess && (
            <Alert
              className="rounded-none border-l-4 border-[#2ec946] bg-[#2ec946]/10 font-medium text-[#2ec946]"
            >
              Create successfuly !!
            </Alert>
          )}
          <CreateRoomForm room={room} handleChange={handleChange} handleSelectChange={handleSelectChange} handleCreate={handleCreate} />
        </div>
      </div>
    </>

  );
} export default CreateRoom;