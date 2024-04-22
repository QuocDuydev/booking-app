import { useState, useEffect } from "react";
import { getHoteldetail } from "../../api/hotel_API";
import { useParams } from 'react-router-dom';
import { useAccessToken } from "../ultiti";
import {
  Card,
  CardBody,
  Typography,
  Rating
} from "@material-tailwind/react";
import { MapPinIcon } from "@heroicons/react/24/solid";

function HotelDetails() {
  let token = useAccessToken()
  const { hotel_id } = useParams();
  const [hotels, setHotel] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const hotelData = await getHoteldetail(hotel_id, token);
        setHotel(hotelData);
        window.scrollTo(0, 0);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

  }, [hotel_id, token]);

  return (
    <div className='container mx-auto relative'>

      <Card className=" w-full mx-auto mb-2 shadow-none mt-3">
        <CardBody className="m-3">
          <div className="m-3">
            <div className="flex">
              <Typography variant="h4" color="blue-gray" className="flex mb-2 text-blue-800">
                {hotels.hotelname} - {hotels.location}
              </Typography>

              <div className=" ml-4 mt-1">
                {hotels.rating && (
                  <Rating
                    value={hotels.rating}
                    unratedColor="red"
                    ratedColor="red"
                    readonly
                    className="flex justify-center"
                  />
                )}
              </div>
            </div>
            <div className=" flex">
              <MapPinIcon className="w-6 h-6" />
              <Typography variant="h6" color="blue-gray" className="ml-1">{hotels.roommap}, {hotels.location}</Typography>
            </div>
            <div className="grid grid-cols-6">
              <div className="grid gap-4 relative col-span-2">
                <div className=" col-1">
                  <img
                    src={hotels.hotelimage}
                    className="h-full max-w-full rounded-lg object-cover object-center mt-3"
                  />
                </div>
                <div className=" col-1 mt-2">
                  <img
                    src={hotels.hotelimage}
                    className="h-full max-w-full rounded-lg object-cover object-center"
                  />
                </div>
              </div>

              <div className="grid gap-4 relative col-span-4 ml-3 mb-3">
                <img
                  src={hotels.hotelimage}
                  className="h-full max-w-full rounded-lg object-cover object-center mt-3"
                />
              </div>
            </div>
            <div>
              <Typography variant="h4" className=" text-justify mt-3 ">
                Descriptions: <div className=" text-lg font-normal mt-2">{hotels.descriptions}</div>
              </Typography>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
} export default HotelDetails;
