import React from 'react'

const Message = () => {
  return (
    <div className="flex p-2 w-full">
      <div className="flex gap-4">
        <div className="">
          <div className="rounded-full h-[3rem] w-[3rem] bg-gray-400">
            <span className="text-white">A</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-[98%]">
            <h1 className="font-semibold text-sm">Raggu</h1>
            <p className="text-gray-400 text-sm">8:30pm</p>
          </div>
          <div className="flex gap-[98%]">
            <p className="text-gray-400 text-sm">Message</p>
            <span className="rounded-full h-[1rem] w-[1rem] bg-blue-400 text-white text-xs p-[14%]">
              2
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message