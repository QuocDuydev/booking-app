import {
    ArrowRightEndOnRectangleIcon,
    ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/solid";
import {
    MoonIcon,
    QuestionMarkCircleIcon, UserGroupIcon, UserIcon
} from "@heroicons/react/24/outline";
import {
    Timeline,
    TimelineItem,
    TimelineConnector,
    TimelineHeader,
    TimelineBody,
    Typography,
} from "@material-tailwind/react";

export function DefaultTimeline() {
    return (
        <>
            <div className="mb-4 mt-4">
                <Typography variant="h4">House rules</Typography>
            </div>
            <div className=" container p-4">
                <Timeline>
                    <TimelineItem>
                        <TimelineConnector />
                        <TimelineHeader className="">
                            <ArrowRightEndOnRectangleIcon className="h-6 w-6" />
                            <Typography variant="h6" color="blue-gray" className="leading-none">
                                Check-in
                            </Typography>
                        </TimelineHeader>
                        <TimelineBody className="pb-4 ml-8">
                            <Typography variant="small" color="gary" className="font-normal text-gray-600">
                                - From 15:00 to 00:00
                                <br />
                                - Guests are required to show a photo identification and credit card upon check-in
                                <br />
                                - You'll need to let the property know in advance what time you'll arrive.
                            </Typography>
                        </TimelineBody>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineConnector />
                        <TimelineHeader className="">
                            <ArrowRightStartOnRectangleIcon className="h-6 w-6" />
                            <Typography variant="h6" color="blue-gray" className="leading-none">
                                Check-out
                            </Typography>
                        </TimelineHeader>
                        <TimelineBody className="pb-4 ml-8">
                            <Typography variant="small" color="gary" className="font-normal text-gray-600">
                                - From 01:00 to 10:00
                            </Typography>
                        </TimelineBody>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineHeader className="">
                            <QuestionMarkCircleIcon className="h-6 w-6" />
                            <Typography variant="h6" color="blue-gray" className="leading-none">
                                Cancellation/prepayment
                            </Typography>
                        </TimelineHeader>
                        <TimelineBody className="pb-4 ml-8">
                            <Typography variant="small" color="gary" className="font-normal text-gray-600">
                                - Cancellation and prepayment policies vary according to apartment type. Please enter the dates of
                                your stay and check the conditions of your required room.
                            </Typography>
                        </TimelineBody>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineHeader className="">
                            <UserGroupIcon className="h-6 w-6" />
                            <Typography variant="h6" color="blue-gray" className="leading-none">
                                Children and beds
                            </Typography>
                        </TimelineHeader>
                        <TimelineBody className="pb-4 ml-8">
                            <Typography variant="small" color="gary" className="font-normal text-gray-600">
                                <strong className=" text-red-500">Child policies</strong>
                                <br />
                                Children of any age are welcome.
                                <br />
                                Children 4 years and above will be charged as adults at this property.
                                <br />
                                To see correct prices and occupancy information, please add the number of children in your group and their ages to your search.
                                <br />
                                <strong className=" text-red-500">Cot and extra bed policies</strong>
                                <br />
                                The number of cots allowed is dependent on the option you choose. Please check your selected option for more information.
                                <br />
                                There are no extra beds available at this property.
                                <br />
                                All cots are subject to availability.
                            </Typography>
                        </TimelineBody>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineHeader className="">
                            <UserIcon className="h-6 w-6" />
                            <Typography variant="h6" color="blue-gray" className="leading-none">
                                Age restriction
                            </Typography>
                        </TimelineHeader>
                        <TimelineBody className="pb-4 ml-8">
                            <Typography variant="small" color="gary" className="font-normal text-gray-600">
                                - The minimum age for check-in is 18.
                            </Typography>
                        </TimelineBody>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineHeader className="">
                            <MoonIcon className="h-6 w-6" />
                            <Typography variant="h6" color="blue-gray" className="leading-none">
                                Quiet hours
                            </Typography>
                        </TimelineHeader>
                        <TimelineBody className="pb-4 ml-8">
                            <Typography variant="small" color="gary" className="font-normal text-gray-600">
                                - Guests must be quiet between 22:00 and 06:00.
                            </Typography>
                        </TimelineBody>
                    </TimelineItem>
                </Timeline>
            </div>
        </>
    );
}