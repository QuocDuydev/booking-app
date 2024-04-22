import React from "react";
import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";

function CardRightBooking({ booking, rooms, handleChange, handleCreate }) {
      return (
        <div className=" max-w-full px-3 rounded-lg mt-2 " >
        {rooms.map((item) => (
          <div className=" border-2 px-3 py-3 rounded-md"key={item.room_id}>
            <Typography
              variant="h5"
              color="blue-gray"
              className="mb-3 text-sm md:text-md lg:text-lg xl:text-lg"
            >
              Your rooms details
            </Typography>

            <div className="flex">
              <Typography
                variant="h5"
                color="blue-gray"
                className="mb-2 text-blue-700 text-sm md:text-md lg:text-lg xl:text-xl"
              >
                Rooms Name:
              </Typography>
              <Typography
                variant="h5"
                color="blue-gray"
                className="mb-2  ml-2 text-sm md:text-md lg:text-lg xl:text-xl "
              >
                {item.roomname}
              </Typography>
            </div>

            <div className=" flex ">
              <Typography
                variant="h5"
                color="blue-gray"
                className="mb-2 text-blue-700 text-sm md:text-md lg:text-lg xl:text-xl"
              >
                Descriptions:
              </Typography>
              <Typography
                variant="h5"
                color="blue-gray"
                className="mb-2  ml-2 font-normal text-justify text-sm md:text-md lg:text-lg xl:text-lg"
              >
                {typeof item.descriptions === 'string' ? item.descriptions.split(' ').slice(0, 25).join(' ') : ''}
              </Typography>
            </div>
            <div className="border-b mb-2"></div>
            <div className=" flex">
              <Typography
                variant="h5"
                color="blue-gray"
                className="mb-2 text-blue-700 text-sm md:text-md lg:text-lg xl:text-xl"
              >
                Room Type:
              </Typography>
              <Typography
                variant="h5"
                color="blue-gray"
                className="mb-2  ml-2 text-sm md:text-md lg:text-lg xl:text-xl"
              >
                <span className="mx-auto px-2 py-1 text-center leading-tight text-orange-700 bg-orange-100 rounded-full text-sm md:text-md lg:text-lg xl:text-xl">{item.room_type} </span>
              </Typography>
            </div>

            <Typography
              variant="h5"
              color="blue-gray"
              className=" mt-2 text-red-600 text-sm md:text-md lg:text-lg xl:text-xl"

            >
              Price room/nights: {item.roomprice}$
            </Typography>


          </div>
        ))}
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
                    Full Name
                  </Typography>

                  <Input
                    type="text"
                    size="lg"
                    name="name"
                    value={booking?.name || ''}
                    onChange={handleChange}
                    placeholder="Enter  username..."
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-sm md:text-md lg:text-lg xl:text-lg"     
                  />

                </div>
                <div>
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="mb-2 mt-4 text-sm md:text-md lg:text-lg xl:text-lg"
                  >
                    Email
                  </Typography>

                  <Input
                    type="email"
                    multiple
                    size="lg"
                    name="email"
                    value={booking?.email || ''}
                    onChange={handleChange}
                    placeholder="Enter email..."
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-700 text-sm md:text-md lg:text-lg xl:text-lg"

                  />
                </div>

              </div>
              <div className="mb-1 w-1/2 p-4 ">
                <div>
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="mb-2 text-sm md:text-md lg:text-lg xl:text-lg"
                  >
                    Phone number
                  </Typography>

                  <Input
                    type="tel"
                    multiple
                    size="lg"
                    name="phonenumber"
                    value={booking?.phonenumber || ''}
                    onChange={handleChange}
                    placeholder="Enter Phone number..."
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-sm md:text-md lg:text-lg xl:text-lg"

                  />
                </div>
                <div>
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="mb-2 mt-4 text-sm md:text-md lg:text-lg xl:text-lg"
                  >
                    Address
                  </Typography>

                  <Input
                    type="text"
                    multiple
                    size="lg"
                    name="address"
                    value={booking?.address || ''}
                    onChange={handleChange}
                    placeholder="Enter your Address..."
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-sm md:text-md lg:text-lg xl:text-lg"

                  />
                </div>
              </div>
            </div>
            <Button
              onClick={handleCreate}
              className="mx-auto w-2/4 bg-red-600 uppercase text-sm" fullWidth>
              Book nows
            </Button>

          </form>
        </Card>
      </div>
    );
}
export default CardRightBooking;