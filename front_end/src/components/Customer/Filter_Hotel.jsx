import {
  Checkbox,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";

export function Filters({ handleLocationFilter, handleTotalRoomsFilter, handleRatingFilter }) {
  return (
    <div className=" gap-4 relative  col-span-1 hidden lg:block">
      <Card className=" shadow-none  mt-4">
        <Typography color="blue-gray" className="font-bold m-1 mb-3">
          Filter by:
        </Typography>
        <Typography color="blue-gray" className="font-bold m-1">
          Popular filter
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
                    onClick={() => handleLocationFilter('Da Lat')}
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: "p-0",
                    }}
                  />
                </ListItemPrefix>
                <Typography color="blue-gray" className="font-medium">
                  Da Lat
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
                    onClick={() => handleLocationFilter('Ho Chi Minh')}
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: "p-0",
                    }}
                  />
                </ListItemPrefix>
                <Typography color="blue-gray" className="font-medium">
                  Ho Chi Minh
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

                    onClick={() => handleLocationFilter('Da Nang')}
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: "p-0",
                    }}
                  />
                </ListItemPrefix>
                <Typography color="blue-gray" className="font-medium">
                  Da Nang
                </Typography>
              </label>
            </ListItem>
          </List>
        </div>

        <Typography color="blue-gray" className="font-bold m-1">
          Total Room filter
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

                    onClick={() => handleTotalRoomsFilter('1-3')}
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: "p-0",
                    }}
                  />
                </ListItemPrefix>
                <Typography color="blue-gray" className="font-medium">
                  1 - 3 rooms
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

                    onClick={() => handleTotalRoomsFilter('4-7')}
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: "p-0",
                    }}
                  />
                </ListItemPrefix>
                <Typography color="blue-gray" className="font-medium">
                  4 - 7 rooms
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

                    onClick={() => handleTotalRoomsFilter('8-10')}
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: "p-0",
                    }}
                  />
                </ListItemPrefix>
                <Typography color="blue-gray" className="font-medium">
                  8 - 10 rooms
                </Typography>
              </label>
            </ListItem>
          </List>
        </div>
        <Typography color="blue-gray" className="font-bold m-1">
          Rating filter
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
                    onClick={() => handleRatingFilter('1')}
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: "p-0",
                    }}
                  />
                </ListItemPrefix>
                <Typography color="blue-gray" className="font-medium">
                  1 - start
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
                    onClick={() => handleRatingFilter('2')}
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: "p-0",
                    }}
                  />
                </ListItemPrefix>
                <Typography color="blue-gray" className="font-medium">
                  2 - start
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
                    onClick={() => handleRatingFilter('3')}
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: "p-0",
                    }}
                  />
                </ListItemPrefix>
                <Typography color="blue-gray" className="font-medium">
                  3 - start
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
                    onClick={() => handleRatingFilter('4')}
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: "p-0",
                    }}
                  />
                </ListItemPrefix>
                <Typography color="blue-gray" className="font-medium">
                  4 - start
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
                    onClick={() => handleRatingFilter('5')}
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: "p-0",
                    }}
                  />
                </ListItemPrefix>
                <Typography color="blue-gray" className="font-medium">
                  5 - start
                </Typography>
              </label>
            </ListItem>
          </List>
        </div>
      </Card>
    </div>
  );
}
export default Filters;