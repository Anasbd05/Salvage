import { BookmarkCheck, Search } from "lucide-react";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const page = () => {
  return (
    <section className="min-h-screen  py-10 bg-white ">
      <main className="px-8 w-full ">
        <div>
          <h2 className="font-bold text-3xl text-gray-900 mb-1.5 flex items-center">
            Demands list
          </h2>
          <p className="text-gray-400 font-medium ">
            Here you can find all of your demands
          </p>
        </div>
        {/* table */}

        <main className=" mt-8 rounded-md shadow-sm border border-input bg-transparent p-6">
          <div className=" flex flex-row justify-between w-full">
            <div className=" shadow-sm py-1.5 gap-2.5 rounded-md flex items-center w-2/5 pr-2 pl-2.5 border border-input bg-transparent text-black text-sm ">
              <Search className="w-5 h-5  text-gray-400 " />
              <input
                type="text"
                placeholder="Search by name , Ville "
                className=" outline-0 text-gray-700 font-medium w-full "
              />
            </div>
            <div className=" flex flex-row gap-6 ">
              <Select>
                <SelectTrigger className="w-full max-w-48">
                  <BookmarkCheck className="w-5 h-5 text-gray-400 " />
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="Complete">Complete</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Canceled">Canceled</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/* <input
                type="date"
                className="w-full rounded-md pr-2 pl-2.5 border border-input bg-transparent text-black text-sm focus:outline-none"
              /> */}
            </div>
          </div>
        </main>
      </main>
    </section>
  );
};

export default page;
