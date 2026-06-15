/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Car, Clock, Layers2, MapPin, Search } from "lucide-react";
import React, { useEffect, useState } from "react";

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
  status: string;
}

const page = () => {
  const [Orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
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

  const handleStatusUpdate = async (id: number, status: string) => {
    setLoading(true);
    const { error } = await supabase
      .from("Salvage")
      .update({ status })
      .eq("id", id);

    FetchOrders();

    console.log("error:", error);
  };
  useEffect(() => {
    FetchOrders();
  }, []);

  const [viewDetails, setViewDetails] = useState(false);

  const [filter, setFilter] = useState("All");

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

        <main className=" mt-8 rounded-md shadow-sm border-2 border-input bg-white p-10">
          <div className=" flex flex-row justify-between w-full">
            <div className=" shadow-sm py-1.5 gap-2.5.5 rounded-md flex items-center w-2/5 pr-2 pl-2.5 border border-input bg-transparent text-black text-sm ">
              <Search className="w-5 h-5  text-gray-400 " />
              <input
                type="text"
                placeholder="Search by name , Ville... "
                className=" outline-0 text-gray-700 font-medium w-full "
              />
            </div>
            <div className=" flex flex-row gap-6 ">
              <button
                onClick={() => setFilter("All")}
                className={` cursor-pointer py-2 px-6 rounded-lg text-sm font-medium border-[1.5px] transition-all hover:border-sky-500 ${
                  filter === "All" && "bg-sky-300 border-none  "
                } `}
              >
                All
              </button>
              <button
                onClick={() => setFilter("Completed")}
                className={` cursor-pointer py-2 px-6 rounded-lg text-sm font-medium border-[1.5px] transition-all hover:border-emerald-500 ${
                  filter === "Completed" && "bg-emerald-300 border-none "
                } `}
              >
                Completed
              </button>
              <button
                onClick={() => setFilter("Pending")}
                className={` cursor-pointer py-2 px-6 rounded-lg text-sm font-medium border-[1.5px] transition-all hover:border-amber-500 ${
                  filter === "Pending" && "bg-amber-300 border-none "
                } `}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter("Rejected")}
                className={` cursor-pointer py-2 px-6 rounded-lg text-sm font-medium border-[1.5px] transition-all hover:border-red-500 ${
                  filter === "Rejected" && "bg-red-300 border-none "
                } `}
              >
                Rejected
              </button>
            </div>
          </div>

          <main className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 ">
            {Orders.map((order, index) => (
              <div
                key={index}
                className=" bg-white relative rounded-3xl py-3 px-4 border-[2.5px] border-sky-100"
              >
                {viewDetails === false ? (
                  <button
                    onClick={() => setViewDetails(true)}
                    className=" cursor-pointer absolute top-[-1.5px] right-[-1.5px] rounded-tr-3xl bg-sky-300 px-4 py-3 text-center text-xs font-bold text-gray-900 uppercase transition hover:bg-sky-400"
                  >
                    View details
                  </button>
                ) : (
                  <button
                    onClick={() => setViewDetails(false)}
                    className=" cursor-pointer absolute top-[-1.5px] right-[-1.5px] rounded-tr-3xl bg-sky-300 px-4 py-3 text-center text-xs font-bold text-gray-900 uppercase transition hover:bg-sky-400"
                  >
                    Retour
                  </button>
                )}
                <h2 className=" text-lg mt-2 mb-6 font-semibold">
                  {order.full_name}
                </h2>
                {viewDetails === false ? (
                  <main>
                    <div className=" flex items-center gap-3 py-2  ">
                      <Clock className="w-4 h-4 text-sky-500" />
                      <span className="text-sm font-medium text-slate-700">
                        {order.date} • {order.heure}
                      </span>
                    </div>
                    <div className=" flex items-center gap-3 py-2  ">
                      <MapPin className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm font-medium text-slate-700">
                        {order.ville}
                      </span>
                    </div>
                    <div className=" flex items-center gap-3 py-2  ">
                      <Layers2 className="w-4 h-4 text-violet-500" />
                      <span className="text-sm font-medium text-slate-700">
                        {order.category}
                      </span>
                    </div>
                    <div className=" flex items-center gap-3 py-2  ">
                      <Car className="w-4 h-4 text-orange-500" />
                      <span className="text-sm font-medium text-slate-700">
                        {order.brand}
                      </span>
                    </div>
                    {/* devider */}
                    <div className="border-t border-dashed border-gray-300 my-4" />
                    <div className=" flex flex-row justify-between">
                      <h2 className=" text-lg font-bold ">Order </h2>
                      <p className=" text-sky-500 font-semibold ">
                        {order.service}
                      </p>
                    </div>
                    <div className="mt-4 mb-2">
                      {order.status === "Pending" && (
                        <div className="flex items-center justify-between gap-4">
                          <span className=" animate-pulse bg-amber-100 text-amber-600 px-3 py-1 rounded-full text-sm font-medium">
                            Pending
                          </span>

                          <button
                            onClick={() =>
                              handleStatusUpdate(order.id, "Complete")
                            }
                            className="bg-green-100 text-green-700 px-4 py-2 rounded-md font-medium hover:bg-green-200 transition"
                          >
                            Mark Complete
                          </button>
                        </div>
                      )}

                      {order.status === "Complete" && (
                        <div className="flex items-center justify-between">
                          <span className=" animate-pulse bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                            Completed
                          </span>
                        </div>
                      )}

                      {order.status === "Rejected" && (
                        <div className="flex items-center justify-between">
                          <span className=" animate-pulse bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                            Rejected
                          </span>
                        </div>
                      )}

                      {!["Pending", "Complete", "Rejected"].includes(
                        order.status
                      ) && (
                        <div className="flex gap-4">
                          <button
                            onClick={() =>
                              handleStatusUpdate(order.id, "Pending")
                            }
                            className="flex-1 bg-green-100 text-green-700 py-2 rounded-md font-medium hover:bg-green-200 transition"
                          >
                            Confirm
                          </button>

                          <button
                            onClick={() =>
                              handleStatusUpdate(order.id, "Rejected")
                            }
                            className="flex-1 bg-red-100 text-red-600 py-2 rounded-md font-medium hover:bg-red-200 transition"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </main>
                ) : (
                  <main>
                    <div className="space-y-2.5">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                          Phone Number
                        </span>
                        <span className="text-slate-800 font-medium text-sm bg-slate-50 px-3 py-2 rounded-md border border-slate-100">
                          0{order.phone_number}
                        </span>
                      </div>

                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                          Address
                        </span>
                        <span className="text-slate-800 font-medium text-sm bg-slate-50 px-3 py-2 rounded-md border border-slate-100">
                          {order.address}
                        </span>
                      </div>
                    </div>
                    {/* devider */}
                    <div className="border-t border-dashed border-gray-300 my-4" />
                    <div className=" flex flex-row justify-between">
                      <h2 className=" text-lg font-bold ">Total</h2>
                      <p className=" text-emerald-500 font-medium">220 MAD</p>
                    </div>
                    <button className=" hover:opacity-80 cursor-pointer w-full bg-red-500 mt-4 mb-2 rounded-md py-2 text-white font-medium  ">
                      Remove Demand
                    </button>
                  </main>
                )}
              </div>
            ))}
          </main>
        </main>
      </main>
    </section>
  );
};

export default page;
