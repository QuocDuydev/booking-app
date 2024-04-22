import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Rating
} from "@material-tailwind/react";

export function CardComments({ users, limitedRecomment }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 p-4">
      {limitedRecomment.map((item) => (
        <Card
          shadow={false}
          className="w-full max-w-[26rem] p-3 bg-gray-300"
          key={item.hotel_id}
        >
          <CardHeader
            color="transparent"
            floated={false}
            shadow={false}
            className="mx-0 flex items-center gap-4 pt-0 pb-8"
          >
            <Avatar
              size="lg"
              variant="circular"
              src="http://127.0.0.1:8000/media/room_images/avatar.jpg"
            />
            <div className="flex w-full flex-col gap-0.5">
              <div className="flex items-center justify-between">
                <Typography variant="h5" color="blue-gray">
                  {users.length > 0 && item.user &&
                    users.find(user => user.data.id === item.user)?.data.name
                  }
                </Typography>
                <div className="5 flex items-center gap-0">
                  {item.rating && (
                    <>
                      <Rating
                        value={item.rating}
                        unratedColor="red"
                        ratedColor="red"
                        readonly
                        className="flex justify-end"
                      />
                    </>
                  )}
                </div>
              </div>
              <Typography color="blue-gray">Date: {item.datecommented}</Typography>
            </div>
          </CardHeader>
          <CardBody className="mb-6 p-0 text-black text-justify">
            <Typography>
              {item.descriptions}
            </Typography>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}

export default CardComments;
