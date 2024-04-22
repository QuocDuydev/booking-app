import {
    Card,
    CardBody,
    Typography,
    Button,
    Rating,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Utilities from "./Layout/Utilities";

function ListHotel({ filteredHotels }) {
    return (
        <div >
            {filteredHotels.map((hotel) => (
                <div key={hotel.hotel_id}>
                    <Card className=" w-full mx-auto mb-2 border-2 " >

                        <CardBody className="flex">
                            <img
                                src={hotel.hotelimage}
                                className="h-30 w-1/3 rounded-lg object-cover object-center "
                            />
                            <div className="m-3 flex flex-col justify-between w-2/3">
                                <div>
                                   
                                    <Typography variant="h5" color="blue-gray" className="mb-2 text-blue-800">
                                        {hotel.hotelname} - {hotel.location}
                                    </Typography>
                                   
                                    <Typography className="text-justify">
                                        {hotel.descriptions.slice(0, 99)}
                                    </Typography>
                                   
                                    {hotel.hotelname && (
                                        <>
                                            <Rating
                                                value={hotel.rating}
                                                unratedColor="red"
                                                ratedColor="red"
                                                readonly
                                                className="flex justify-end"
                                            />
                                        </>
                                    )}
                                </div>
                                
                                <div className="flex justify-between items-center mt-3 ">
                                    <Utilities />
                                    <span className=" hidden lg:block md:block mx-auto px-2 py-2 text-center text-lg leading-tight text-orange-700 bg-orange-100 rounded-full dark:text-white dark:bg-orange-600">{hotel.totalroom} - rooms</span>
                                </div>
                                
                                <div className="flex justify-center mt-3">
                                    <Link to={`/hotel/${hotel.hotel_id}`} >
                                        <Button className="bg-black">See availability</Button>
                                    </Link>
                                </div>
                            </div>

                        </CardBody>

                    </Card>
                </div>
            ))}
        </div>
    );
}
export default ListHotel;
