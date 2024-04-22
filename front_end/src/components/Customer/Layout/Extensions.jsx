import { Typography } from "@material-tailwind/react";

function Extensions() {
    return (
        <>
            <div className="container">
                <Typography variant="h4" className="mb-4">Most popular facilities</Typography>
                <div className=" mx-auto overflow-hidden ">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lx:grid-cols-5 gap-4  ">
                        <li className="flex items-center space-x-2 border rounded-md px-3 py-2 shadow-lg">
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span>Apartments</span>
                        </li>
                        <li className="flex items-center space-x-2 border rounded-md px-3 py-2 shadow-lg">
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span>Very good breakfast</span>
                        </li>

                        <li className="flex items-center space-x-2 border rounded-md px-3 py-2 shadow-lg">
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span>Airport shuttle</span>
                        </li>
                        <li className="flex items-center space-x-2 border rounded-md px-3 py-2 shadow-lg">
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span>Pets allowed</span>
                        </li>
                        <li className="flex items-center space-x-2 border rounded-md px-3 py-2 shadow-lg">
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span>Free WiFi</span>
                        </li>
                        <li className="flex items-center space-x-2 border rounded-md px-3 py-2 shadow-lg">
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span>Private bathroom</span>
                        </li>

                        <li className="flex items-center space-x-2 border rounded-md px-3 py-2 shadow-lg">
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span>Bath</span>
                        </li>
                        <li className="flex items-center space-x-2 border rounded-md px-3 py-2 shadow-md">
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span>Non-smoking rooms</span>
                        </li>
                    </ul>
                    <div className="border-b mb-2"></div>
                </div>
            </div>
        </>
    );
}

export default Extensions;
