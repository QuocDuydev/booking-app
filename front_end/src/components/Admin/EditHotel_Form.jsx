import React from "react";
import {
    Card,
    Input,
    Button,
    Typography,
    Textarea
} from "@material-tailwind/react";

function EditHotelForm({ hotel, handleChange, handleUpdate, }) {
    return (
        <>
            <div className="mx-auto mt-4">
                <Typography variant="h4" color="red">
                    Edit the Hotels
                </Typography>
            </div>
            <div className=" max-w-full px-3 rounded-lg mt-2 overflow-auto">

                <Card color="transparent" shadow={false}>
                    <form>
                        <div className="flex mx-auto ">
                            <div className="mb-1 w-1/2 p-4">
                                <div>
                                    <Typography
                                        variant="h6"
                                        color="blue-gray"
                                        className="mb-2 text-sm md:text-md lg:text-lg xl:text-lg"
                                    >
                                        Name Hotels
                                    </Typography>
                                    <Input
                                        type="text"
                                        size="lg"
                                        name="hotelname"
                                        value={hotel.hotelname}
                                        onChange={handleChange}
                                        placeholder="Enter name hotels..."
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-sm md:text-md lg:text-lg xl:text-lg"

                                    />
                                </div>
                                <div>
                                    <Typography
                                        variant="h6"
                                        color="blue-gray"
                                        className="mb-2 mt-4 text-sm md:text-md lg:text-lg xl:text-lg"
                                    >
                                        Images Hotel
                                    </Typography>
                                    <Input
                                        type="file"
                                        multiple
                                        size="lg"
                                        name="hotelimage"
                                        onChange={handleChange}
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
                                        value={hotel.descriptions}
                                        onChange={handleChange}
                                        placeholder="Enter Descriptions about Rooms..."
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-sm md:text-md lg:text-md xl:text-md"

                                    />
                                </div>
                                <div>
                                    <Typography
                                        variant="h6"
                                        color="blue-gray"
                                        className="mb-2 text-sm md:text-md lg:text-lg xl:text-lg"
                                    >
                                        Total Rooms
                                    </Typography>
                                    <Input
                                        type="number"
                                        multiple
                                        size="lg"
                                        name="totalroom"
                                        value={hotel.totalroom}
                                        onChange={handleChange}
                                        placeholder="Enter total rooms..."
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-700 text-sm md:text-md lg:text-lg xl:text-lg"

                                    />
                                </div>
                            </div>
                            <div className="mb-1 w-1/2 p-4">

                                <div>
                                    <Typography
                                        variant="h6"
                                        color="blue-gray"
                                        className="mb-2 text-sm md:text-md lg:text-lg xl:text-lg"
                                    >
                                        Rooms Maps
                                    </Typography>
                                    <Input
                                        type="text"
                                        multiple
                                        size="lg"
                                        name="roommap"
                                        value={hotel.roommap}
                                        onChange={handleChange}
                                        placeholder="Enter Room Map..."
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-sm md:text-md lg:text-lg xl:text-lg"

                                    />
                                </div>
                                <div>
                                    <Typography
                                        variant="h6"
                                        color="blue-gray"
                                        className="mb-2 mt-4 text-sm md:text-md lg:text-lg xl:text-lg"
                                    >
                                        Location
                                    </Typography>
                                    <Input
                                        type="text"
                                        multiple
                                        size="lg"
                                        name="location"
                                        value={hotel.location}
                                        onChange={handleChange}
                                        placeholder="Enter Location hotel..."
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-sm md:text-md lg:text-lg xl:text-lg"

                                    />
                                </div>
                                <div>
                                    <Typography
                                        variant="h6"
                                        color="blue-gray"
                                        className="mb-2 mt-4 text-sm md:text-md lg:text-lg xl:text-lg"
                                    >
                                        Ratings
                                    </Typography>
                                    <Input
                                        type="number"
                                        multiple
                                        size="lg"
                                        name="rating"
                                        value={hotel.rating}
                                        onChange={handleChange}
                                        placeholder="Enter rating hotel..."
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
                                        value={hotel.dateadded}
                                        onChange={handleChange}
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-sm md:text-md lg:text-lg xl:text-lg"
                                        readOnly
                                    />

                                </div>
                            </div>
                        </div>
                        <Button
                            onClick={handleUpdate}
                            className="mx-auto w-2/4 bg-red-600 uppercase text-sm" fullWidth>
                            Update nows
                        </Button>

                    </form>
                </Card>
            </div>
        </>
    );
}
export default EditHotelForm;