/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { BookmarkCheck, Clock, Layers2, MapPin, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createClient } from "@/utils/supabase/client";

interface Order {
  id: number;
  full_name: string;
  phone_number: number;
  email: string;
  service: string;
  category: string;
  brand: string;
  ville: string;
  city: string;
  address: string;
  date: string;
  heure: string;
}

const page = () => {
  const [Orders, setOrders] = useState<Order[]>([]);

  const supabase = createClient();

  const FetchOrders = async () => {
    try {
      const { data, error } = await supabase.from("Salvage").select("*");
      if (data) {
        setOrders(data as Order[]);
      } else {
        console.log(error.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    FetchOrders();
  }, []);
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

        <main className=" mt-8 rounded-md shadow-sm border-[1.5px] border-input bg-white p-10">
          <div className=" flex flex-row justify-between w-full">
            <div className=" shadow-sm py-1.5 gap-3.5.5 rounded-md flex items-center w-2/5 pr-2 pl-2.5 border border-input bg-transparent text-black text-sm ">
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
                    <SelectItem
                      className=" focus:bg-green-300 "
                      value="Complete"
                    >
                      Complete
                    </SelectItem>
                    <SelectItem
                      className=" focus:bg-orange-300 "
                      value="Pending"
                    >
                      Pending
                    </SelectItem>
                    <SelectItem className=" focus:bg-red-300 " value="Canceled">
                      Canceled
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/* <input
                type="date"
                className="w-full rounded-md pr-2 pl-2.5 border border-input bg-transparent text-black text-sm focus:outline-none"
              /> */}
            </div>
          </div>

          <main className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 ">
            {Orders.map((order, index) => (
              <div
                key={index}
                className=" rounded-md py-2 px-4 border-[1.5px] border-input bg-transparent "
              >
                <div className=" flex flex-row justify-between mt-4 ">
                  <h2 className=" text-lg font-semibold">{order.full_name}</h2>
                  <span className=" text-muted-foreground font-medium text-[17px]   ">
                    #{order.id}
                  </span>
                </div>
                <div className=" flex flex-row gap-3.5 mt-4 items-center  ">
                  <Clock className="w-4 h-4 font-medium " />
                  <span className=" text-muted-foreground font-medium text-[17px]   ">
                    {order.date} , {order.heure}
                  </span>
                </div>
                <div className=" flex flex-row gap-3.5 mt-4 items-center  ">
                  <MapPin className="w-4 h-4 font-medium " />
                  <span className=" text-muted-foreground font-medium text-[17px]   ">
                    {order.ville}
                  </span>
                </div>
                <div className=" flex flex-row gap-3.5 mt-4 items-center  ">
                  <Layers2 className="w-4 h-4 font-medium " />
                  <span className=" text-muted-foreground font-medium text-[17px]   ">
                    {order.category}
                  </span>
                </div>
                <div className=" flex flex-row gap-3.5 mt-4   ">
                  <span className="w-4 h-4">🚗</span>
                  <span className=" text-muted-foreground font-medium text-[17px]   ">
                    {order.brand}
                  </span>
                </div>
                {/* devider */}
                <div className="border-t border-dashed border-gray-400 my-4" />
                <div className=" flex flex-row justify-between">
                  <h2 className=" text-lg font-bold ">Order </h2>
                  <p className=" text-sky-500 font-semibold ">
                    {order.service}
                  </p>
                </div>
                {/* confirm / reject */}
                <div className=" flex flex-row w-full gap-6 mt-4 mb-2 ">
                  <button className=" hover:opacity-80 cursor-pointer w-2/4 bg-emerald-600 rounded-md py-2.5 text-white font-bold   ">
                    Confirm
                  </button>
                  <button className=" hover:opacity-80 cursor-pointer w-2/4 bg-red-600  rounded-md py-2.5 text-white font-bold  ">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </main>
        </main>
      </main>
    </section>
  );
};

export default page;
