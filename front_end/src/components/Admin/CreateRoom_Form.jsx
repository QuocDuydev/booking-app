import {
    Card,
    Input,
    Button,
    Typography,
    Textarea,
    Select,
    Option
} from "@material-tailwind/react";

function CreateRoomForm({ room, handleChange,handleSelectChange, handleCreate }) {
    return (
        <>
            <div className="mx-auto mt-2">
                <Typography variant="h4" color="red">
                    Create the Rooms
                </Typography>
            </div>
            <div className=" max-w-full px-3 rounded-lg mt-2 overflow-auto">

                <Card color="transparent" shadow={false}>
                    <form className=" ">
                        <div className="flex mx-auto ">
                            <div className="mb-1 w-1/2 p-4">
                                <div className=" hidden">
                                    <Typography
                                        variant="h6"
                                        color="blue-gray"
                                        className="mb-2 text-sm md:text-md lg:text-lg xl:text-lg"
                                    >
                                        Name Hotel
                                    </Typography>
                                    <Input
                                        type="text"
                                        size="lg"
                                        name="hotel"
                                        value={room.hotel} // Display hotel name
                                        placeholder="Enter name rooms..."
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-sm md:text-md lg:text-lg xl:text-lg"
                                        readOnly // Make the input readOnly
                                    />
                                </div>
                                <div>
                                    <Typography
                                        variant="h6"
                                        color="blue-gray"
                                        className="mb-2 text-sm md:text-md lg:text-lg xl:text-lg"
                                    >
                                        Name Rooms
                                    </Typography>
                                    <Input
                                        type="text"
                                        size="lg"
                                        name="roomname"
                                        value={room.roomname}
                                        onChange={handleChange}
                                        placeholder="Enter name rooms..."
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-sm md:text-md lg:text-lg xl:text-lg"

                                    />
                                </div>


                                <div>
                                    <Typography
                                        variant="h6"
                                        color="blue-gray"
                                        className="mb-2 mt-4 text-sm md:text-md lg:text-lg xl:text-lg"
                                    >
                                        Images Rooms
                                    </Typography>
                                    <Input
                                        type="file"
                                        multiple  // Cho phép người dùng chọn nhiều tệp hình ảnh
                                        size="lg"
                                        name="roomimage"
                                        onChange={handleChange} // Xử lý sự kiện khi có thay đổi trong tệp được chọn
                                        placeholder="Choose file image..."
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-sm md:text-md lg:text-md xl:text-md"
                                    />
                                </div>
                                <div>
                                    <Typography
                                        variant="h6"
                                        color="blue-gray"
                                        className="mb-2 mt-4 text-sm md:text-md lg:text-lg xl:text-lg"
                                    >
                                        Descriptions
                                    </Typography>
                                    <Textarea
                                        type="textarea"
                                        multiple
                                        size="lg"
                                        name="descriptions"
                                        value={room.descriptions}
                                        onChange={handleChange}
                                        placeholder="Enter Descriptions about Rooms..."
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-sm md:text-md lg:text-lg xl:text-lg"

                                    />
                                </div>
                                <div>
                                    <Typography
                                        variant="h6"
                                        color="blue-gray"
                                        className="mb-2 mt-4 text-sm md:text-md lg:text-lg xl:text-lg"
                                    >
                                        Room type
                                    </Typography>
                                    <Select
                                        name="room_type"
                                        size="lg"
                                        value={room.room_type}
                                        onChange={handleSelectChange}
                                        className="text-sm md:text-md lg:text-lg xl:text-lg"
                                    >
                                        <Option value="simple_room">Simple Room</Option>
                                        <Option value="double_room">Double Room</Option>
                                        <Option value="family_room">Family Room</Option>

                                    </Select>
                                </div>
                            </div>
                            <div className="mb-1 w-1/2 p-4">
                                <div>
                                    <Typography
                                        variant="h6"
                                        color="blue-gray"
                                        className="mb-2 text-sm md:text-md lg:text-lg xl:text-lg"
                                    >
                                        Price Rooms
                                    </Typography>
                                    <Input
                                        type="number"
                                        multiple
                                        size="lg"
                                        name="roomprice"
                                        value={room.roomprice}
                                        onChange={handleChange}
                                        placeholder="Enter price rooms..."
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-sm md:text-md lg:text-lg xl:text-lg"

                                    />
                                </div>
                                <div>
                                    <Typography
                                        variant="h6"
                                        color="blue-gray"
                                        className="mb-2 mt-4 text-sm md:text-md lg:text-lg xl:text-lg"
                                    >
                                        Numbers Rooms
                                    </Typography>
                                    <Input
                                        type="number"
                                        multiple
                                        size="lg"
                                        name="roomnumber"
                                        value={room.roomnumber}
                                        onChange={handleChange}
                                        placeholder="Enter Numbers rooms..."
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-sm md:text-md lg:text-lg xl:text-lg"

                                    />
                                </div>
                                <div>
                                    <Typography
                                        variant="h6"
                                        color="blue-gray"
                                        className="mb-2 mt-4 text-sm md:text-md lg:text-lg xl:text-lg"
                                    >
                                        Occupancy Rooms
                                    </Typography>
                                    <Input
                                        type="number"
                                        multiple
                                        size="lg"
                                        name="roomoccupancy"
                                        value={room.roomoccupancy}
                                        onChange={handleChange}
                                        placeholder="Enter Occupancy rooms..."
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-sm md:text-md lg:text-lg xl:text-lg"

                                    />
                                </div>
                                <div>
                                    <Typography
                                        variant="h6"
                                        color="blue-gray"
                                        className="mb-2 mt-4 text-sm md:text-md lg:text-lg xl:text-lg"
                                    >
                                        DateAdded Rooms
                                    </Typography>
                                    <Input
                                        type="date"
                                        multiple
                                        size="lg"
                                        name="dateadded"
                                        value={room.dateadded}
                                        onChange={handleChange}
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-sm md:text-md lg:text-lg xl:text-lg"
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                        <Button
                            size="lg"
                            onClick={handleCreate}
                            className="mx-auto w-2/4 bg-red-600 uppercase" fullWidth>
                            Add nows
                        </Button>
                    </form>
                </Card>
            </div>
        </>
    );
}
export default CreateRoomForm;