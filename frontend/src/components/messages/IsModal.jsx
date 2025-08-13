import React from "react";
import {IoCloseOutline} from "react-icons/io5";
import { LiaUserCircle } from "react-icons/lia";


function IsModal({isModelOpen, setIsModelOpen}) {
  return (
    <div
      className={`w-full h-full bg-slate-300 absolute z-10transition-all duration-500 ease-in-out ${
        isModelOpen
          ? "top-0 left-0 translate-x-0 opacity-100"
          : "top-0 -left-full -translate-x-full opacity-0"
      }`}
    >
      <div className="w-full flex justify-end py-4 px-2">
        <span
          className="p-2 bg-slate-200 rounded-full hover:bg-white cursor-pointer"
          onClick={() => setIsModelOpen(false)}
        >
          <IoCloseOutline size={20} />
        </span>
      </div>

      <div className="flex p-4 flex-col gap-y-4" >
        {
            ['shubham ganraj', 'vishal ganraj', 'shekhar laghane', 'akash khajekar'].map((name, idx) => {
                return (
                    <div key={idx} className="py-2 px-4 flex gap-x-2 items-center bg-slate-100 rounded-lg hover:bg-white">
                        <div><LiaUserCircle size={25} /></div>
                        <div className="font-semibold capitalize">{name}</div>

                    </div>
                )
            })
        }
      </div>
    </div>
  );
}

export default IsModal;
