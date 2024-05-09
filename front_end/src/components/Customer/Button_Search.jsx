import React from "react";
import { Input, Button } from "@material-tailwind/react";

function ButtonSearch({ setSearchTerm, searchTerm }) {
	return (
		<div className=" mt-4 mb-4">
			<form className="max-w-lg mx-auto">
				<div className="relative w-full">
					<Input
						type="search"
						placeholder="Tìm kiếm phòng..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						label="Tìm kiếm phòng"
					/>
					<Button
						size="sm"
						color={searchTerm ? "gray" : "blue-gray"}
						disabled={!searchTerm}
						className="!absolute right-1 top-1 rounded"
					>
						Tìm kiếm
					</Button>
				</div>
			</form>
		</div>
	);
}
export default ButtonSearch;
