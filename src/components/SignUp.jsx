import React, { useState } from "react";
import { PiDotsNineLight } from "react-icons/pi";
import { PiChatSlashBold } from "react-icons/pi";



const SignUp = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//   });


    return (
      <div className="flex">
        <form className="flex flex-col relative  gap-6 border rounded-xl border-gray-200 m-auto shadow shadow-lg  mt-[5%]">
          <div className="flex flex-col">
            <div className="flex flex-row-reverse">
              <PiDotsNineLight className="text-right text-5xl text-[#6e80a4] right-0" />
            </div>

            <div className="flex items-center m-auto gap-1">
              <PiChatSlashBold className="text-3xl" />
              <h2 className="text-center text-3xl">Chat</h2>
            </div>
          </div>

          <div className="flex flex-col gap-6 p-4">
            <div className="">
              <input
                type="text"
                name="name"
                //   value={formData.name}
                placeholder="Name"
                className="border rounded-md border-gray-300 p-2 text-sm text-gray-500 w-[20rem]"
                required
              />
            </div>

            <div className="">
              <input
                type="email"
                name="email"
                //   value={formData.email}
                placeholder="Email"
                className="border rounded-md border-gray-300 p-2 text-sm text-gray-500 w-[20rem]"
                required
              />
            </div>

            <div className="relative">
              <input
                type="phone"
                name="phone"
                //   value={formData.mobile}
                placeholder="Phonee Number"
                className="border rounded-md border-gray-300 p-2 text-sm text-gray-500 w-[20rem]"
                required
              />
            </div>

            <button
              type="sign up"
              className="border rounded-md border-gray-300 p-2 text-sm text-white w-[20rem] bg-[#6e80a4]
]"
            >
              Sign Up
            </button>
          </div>
          <PiDotsNineLight className="text-5xl text-[#6e80a4] " />
        </form>
      </div>
    );
};

export default SignUp;
