import {
  Checkbox,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";

export function FiltersRoom({ handleRoomTypeFilter, handlePriceFilter }) {
  return (
    <div className=" gap-4 relative  col-span-1 hidden lg:block">
      <Card className=" shadow-none  mt-4">
        <Typography color="blue-gray" className="font-bold m-1 mb-3">
          Filter by:
        </Typography>
        <Typography color="blue-gray" className="font-bold m-1">
          Room Type filter
        </Typography>
        <div className="border-2 rounded-md shadow-sm">
          <List>
            <ListItem className="p-0">
              <label
                htmlFor="vertical-list-react"
                className="flex w-full cursor-pointer items-center px-3 py-2"
              >
                <ListItemPrefix className="mr-3">
                  <Checkbox
                    id="vertical-list-react"
                    ripple={false}

                    onClick={() => handleRoomTypeFilter('simple_room')}
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: "p-0",
                    }}
                  />
                </ListItemPrefix>
                <Typography color="blue-gray" className="font-medium">
                  Simple Room
                </Typography>
              </label>
            </ListItem>
            <ListItem className="p-0">
              <label
                htmlFor="vertical-list-vue"
                className="flex w-full cursor-pointer items-center px-3 py-2"
              >
                <ListItemPrefix className="mr-3">
                  <Checkbox
                    id="vertical-list-vue"
                    ripple={false}


                    onClick={() => handleRoomTypeFilter('double_room')}
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: "p-0",
                    }}
                  />
                </ListItemPrefix>
                <Typography color="blue-gray" className="font-medium">
                  Double Room
                </Typography>
              </label>
            </ListItem>
            <ListItem className="p-0">
              <label
                htmlFor="vertical-list-svelte"
                className="flex w-full cursor-pointer items-center px-3 py-2"
              >
                <ListItemPrefix className="mr-3">
                  <Checkbox
                    id="vertical-list-svelte"
                    ripple={false}

                    onClick={() => handleRoomTypeFilter('family_room')}
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: "p-0",
                    }}
                  />
                </ListItemPrefix>
                <Typography color="blue-gray" className="font-medium">
                  Family Room
                </Typography>
              </label>
            </ListItem>
          </List>
        </div>

        <Typography color="blue-gray" className="font-bold m-1">
          Price filter
        </Typography>
        <div className="border-2 rounded-md shadow-sm">
          <List>
            <ListItem className="p-0">
              <label
                htmlFor="vertical-list-react"
                className="flex w-full cursor-pointer items-center px-3 py-2"
              >
                <ListItemPrefix className="mr-3">
                  <Checkbox
                    id="vertical-list-react"
                    ripple={false}

                    onClick={() => handlePriceFilter('100-300')}
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: "p-0",
                    }}
                  />
                </ListItemPrefix>
                <Typography color="blue-gray" className="font-medium">
                  100 - 300 $
                </Typography>
              </label>
            </ListItem>
            <ListItem className="p-0">
              <label
                htmlFor="vertical-list-vue"
                className="flex w-full cursor-pointer items-center px-3 py-2"
              >
                <ListItemPrefix className="mr-3">
                  <Checkbox
                    id="vertical-list-vue"
                    ripple={false}

                    onClick={() => handlePriceFilter('300-500')}
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: "p-0",
                    }}
                  />
                </ListItemPrefix>
                <Typography color="blue-gray" className="font-medium">
                  300 - 500 $
                </Typography>
              </label>
            </ListItem>
            <ListItem className="p-0">
              <label
                htmlFor="vertical-list-svelte"
                className="flex w-full cursor-pointer items-center px-3 py-2"
              >
                <ListItemPrefix className="mr-3">
                  <Checkbox
                    id="vertical-list-svelte"
                    ripple={false}

                    onClick={() => handlePriceFilter('500-1000')}
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: "p-0",
                    }}
                  />
                </ListItemPrefix>
                <Typography color="blue-gray" className="font-medium">
                  500 - 1000 $
                </Typography>
              </label>
            </ListItem>
          </List>
        </div>
      </Card>
    </div>
  );
}
export default FiltersRoom;