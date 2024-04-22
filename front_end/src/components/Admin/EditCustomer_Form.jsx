import React from "react";
import {
    Card,
    Input,
    Button,
    Typography,
    Select,
    Option
} from "@material-tailwind/react";

function EditCustomerForm({ user, handleChange, handleSelectChange, handleUpdate }) {
    return (
        <>
            <div className=" mx-auto mt-4">
                <Typography variant="h4" color="red">
                    Edit the Users
                </Typography>
            </div>
            <div className=" max-w-full px-3 rounded-lg mt-2">

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
                                        Username
                                    </Typography>

                                    <Input
                                        type="text"
                                        size="lg"
                                        name="username"
                                        value={user.username}

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
                                        Full name
                                    </Typography>

                                    <Input
                                        type="text"
                                        multiple
                                        size="lg"
                                        name="name"
                                        value={user.name}
                                        onChange={handleChange}
                                        placeholder="Enter Full name..."
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-sm md:text-md lg:text-lg xl:text-lg"
                                    />
                                </div>

                            </div>
                            <div className="mb-1 w-1/2 p-4">
                                <div>
                                    <Typography
                                        variant="h6"
                                        color="blue-gray"
                                        className="mb-2  text-sm md:text-md lg:text-lg xl:text-lg"
                                    >
                                        Email
                                    </Typography>

                                    <Input
                                        type="email"
                                        multiple
                                        size="lg"
                                        name="email"
                                        value={user.email}

                                        onChange={handleChange}
                                        placeholder="Enter email..."
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-sm md:text-md lg:text-lg xl:text-lg"

                                    />

                                </div>
                                <div>
                                    <Typography
                                        variant="h6"
                                        color="blue-gray"
                                        className="mb-2 mt-4 text-sm md:text-md lg:text-lg xl:text-lg"
                                    >
                                        Account type
                                    </Typography>
                                    <Select
                                        name="account_type"
                                        size="lg"
                                        value={user?.account_type || ""}
                                        onChange={handleSelectChange}
                                        className="text-sm md:text-md lg:text-lg xl:text-lg"
                                    >
                                        <Option value="user">User</Option>
                                        <Option value="admin">Admin</Option>
                                        <Option value="superadmin">Super Admin</Option>

                                    </Select>
                                </div>


                            </div>
                        </div>
                        <Button
                            size="lg"
                            onClick={handleUpdate}
                            className="mx-auto w-2/4 bg-red-600 uppercase mt-5 " fullWidth>
                            Update nows
                        </Button>

                    </form>
                </Card>
            </div>
        </>
    );
}
export default EditCustomerForm;