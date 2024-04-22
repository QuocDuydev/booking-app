
import { Tooltip } from "@material-tailwind/react";
import { ComputerDesktopIcon, HomeIcon, WifiIcon, FireIcon, ArrowsPointingOutIcon } from "@heroicons/react/24/solid";

function Utilities() {
    return (
        <div className="hidden lg:block md:block">
            <div className="flex group items-center gap-7 mt-4 justify-center mb-4 ">

                <Tooltip content="Free wifi">
                    <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                        <WifiIcon className="h-4 w-4" />
                    </span>
                </Tooltip>
                <Tooltip content="2 bedrooms">
                    <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                        <HomeIcon className="h-4 w-4" />
                    </span>
                </Tooltip>
                <Tooltip content={`65" HDTV`}>
                    <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                        <ComputerDesktopIcon className="h-4 w-4" />
                    </span>
                </Tooltip>
                <Tooltip content="Fire alert">
                    <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                        <FireIcon className="h-4 w-4" />
                    </span>
                </Tooltip>
                <Tooltip content="Size 40m2">
                    <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                        <ArrowsPointingOutIcon className="h-4 w-4" />
                    </span>

                </Tooltip>

            </div>
        </div>
    );
}

export default Utilities;