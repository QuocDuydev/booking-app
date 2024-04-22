
import { Typography } from "@material-tailwind/react";

function ListHistory({ historybooking }) {
    return (

        <div className=" container mb-6 text-red-500 mt-4">
            <Typography variant="h4" color="blue-gray">
                List Your History Bookings
            </Typography>
            <div className=" max-w-full px-3 rounded-lg mt-2">
                <div className="container px-6 mx-auto grid relative ">
                    <div className="w-full overflow-hidden rounded-lg shadow-xs">
                        <div className="w-full overflow-x-auto">
                            <table className="w-full whitespace-no-wrap">
                                <thead>
                                    <tr
                                        className=" border-[1px] text-xs font-semibold tracking-wide text-center text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
                                    >
                                        <th className="px-4 py-3">Your Name</th>
                                        <th className="px-4 py-3">Check in</th>
                                        <th className="px-4 py-3">Check out</th>
                                        <th className="px-4 py-3">Total amount</th>
                                        <th className="px-4 py-3">Date Bookings</th>
                                    </tr>
                                </thead>
                                <tbody
                                    className="  bg-white divide-y dark:divide-gray-700 dark:bg-gray-800 text-center"
                                >
                                    {historybooking.length > 0 ? (
                                        historybooking.map((item) => {

                                            return (
                                                <tr className="text-gray-700 bg-gray-100" key={item.booking_id} >

                                                    <td className="px-4 py-3" >
                                                        <div className="flex items-center text-sm">
                                                            <div>
                                                                <p className="font-semibold">{item.name}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 text-sm" >
                                                        {item.checkin}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm">
                                                        {item.checkout}
                                                    </td>
                                                    <td className="px-4 py-3 text-xs" >
                                                        <span
                                                            className="px-2 py-1 font-semibold leading-tight text-orange-700 bg-orange-100 rounded-full dark:text-white dark:bg-orange-600"
                                                        >
                                                            {item.total} $
                                                        </span>
                                                    </td>

                                                    <td className="px-4 py-3 text-sm" >
                                                        {item.datebooking}
                                                    </td>

                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="px-4 py-3 text-center">
                                                No bookings found.
                                            </td>
                                        </tr>)}


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default ListHistory;