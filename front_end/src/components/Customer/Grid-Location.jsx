
import { useState, useEffect } from "react";
import { getHotel } from "../../api/acc_API";
import {
  Typography,
} from "@material-tailwind/react";

export function GridLocation() {
  const [data, setData] = useState([]);
  const [locationCounts, setLocationCounts] = useState({});;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const hotelData = await getHotel();
        setData(hotelData);
        // Calculate location counts
        const counts = hotelData.reduce((acc, item) => {
          acc[item.location] = (acc[item.location] || 0) + 1;
          return acc;
        }, {});
        setLocationCounts(counts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const uniqueLocations = Array.from(new Set(data.map((item) => item.location)));
  return (
    <>
      <div className="mt-[40px] mb-4">
        <Typography variant="h4">
          Explore Vietnam
        </Typography>
        <Typography variant="h5" className=" font-normal mt-2">
          These popular destinations have a lot to offer
        </Typography>
      </div>
      <div className="grid grid-cols-3 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {uniqueLocations.map((location) => {
          const items = data.filter((item) => item.location === location);
          const item = items[0]; // Lấy một khách sạn bất kỳ trong tỉnh
          return (
            <div className="justify-center text-center" key={item.hotel_id}>
              <img
                className="h-[100px] w-full rounded-lg object-cover object-center transform transition-transform hover:scale-105 cursor-pointer"
                src={item.hotelimage}
                alt="gallery-photo"
              />
              <p className="text-black font-bold mt-2">{item.location}</p>
              <p>{`${locationCounts[item.location] || 0} properties`}</p>
            </div>
          );
        })}
      </div>
    </>
  );
} export default GridLocation;