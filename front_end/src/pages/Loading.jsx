import { Spinner } from "@material-tailwind/react";

export function Loading() {
    return (
        <>
            <div className="flex items-center justify-center w-full h-full">
                <div className="flex justify-center items-center space-x-1 text-sm text-gray-700">
                    <Spinner className="h-[40px] w-[40px] text-gray-900/50" />
                    <div>Waiting to Loading ...</div>
                </div>
            </div>
        </>
    );
} export default Loading;