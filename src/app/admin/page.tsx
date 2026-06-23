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
  total: number;
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

  const confirmOrder = async (order: Order) => {
    await fetch("/api/orders/confirm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: order.email,
        name: order.full_name,
      }),
    });
  };

  const rejectOrder = async (order: Order) => {
    await fetch("/api/orders/reject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: order.email,
        name: order.full_name,
      }),
    });
  };

  const handleStatusUpdate = async (id: number, status: string) => {
    setLoading(true);
    const { error } = await supabase
      .from("Salvage")
      .update({ status })
      .eq("id", id);

    FetchOrders();
    setLoading(false);
    console.log("error:", error);
  };
  const handleDelete = async (id: number) => {
    setLoading(true);
    const { error } = await supabase.from("Salvage").delete().eq("id", id);

    FetchOrders();
    setLoading(false);
    console.log("error:", error);
  };

  useEffect(() => {
    FetchOrders();
  }, []);

  // Track which card is open by order ID (null = none open)
  const [viewDetails, setViewDetails] = useState<number | null>(null);

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  return (
    <section className="min-h-screen py-10 px-6 bg-white">
      <main className="px-8 w-full">
        {/* header */}
        <div className="flex items-center mb-3 gap-2">
          <span className="w-2 h-2 animate-pulse rounded-full bg-sky-500 inline-block" />
          <span className=" text-sm font-semibold tracking-wide text-neutral-700 uppercase ">
            Demands
          </span>
        </div>
        <main className=" w-full flex justify-between items-center ">
          <div>
            <h2 className="font-medium text-2xl tracking-wider mb-1 text-gray-900 flex items-center">
              All Requets
            </h2>
            <p className="text-slate-500 font-medium text-sm">
              Here you can find all of your demands
            </p>
          </div>
          <div className=" flex gap-5">
            <div className=" bg-gray-50 border-2 border-sky-200 flex flex-col items-end gap-1 rounded-lg py-2 px-6 ">
              <span className="text-gray-600 font-medium text-sm tracking-wide   ">
                Pending
              </span>
              <span className="text-xl font-semibold text-amber-500">
                {Orders.filter((item) => item.status === "Pending").length}
              </span>
            </div>
            <div className=" bg-gray-50 border-2 border-sky-200 flex flex-col items-end gap-1 rounded-lg py-2 px-6 ">
              <span className="text-gray-600 font-medium text-sm tracking-wide   ">
                Completed
              </span>
              <span className="text-xl font-semibold text-emerald-500">
                {Orders.filter((item) => item.status === "Complete").length}
              </span>
            </div>
            <div className=" bg-gray-50 border-2 border-sky-200 flex flex-col items-end gap-1 rounded-lg py-2 px-6 ">
              <span className="text-gray-600 font-medium text-sm tracking-wide   ">
                Rejected
              </span>
              <span className="text-xl font-semibold text-red-500">
                {Orders.filter((item) => item.status === "Rejected").length}
              </span>
            </div>
          </div>
        </main>

        {/* table */}
        <section className="rounded-2xl border border-slate-200 bg-white pb-8  mt-10 shadow-sm overflow-hidden">
          <div className="flex flex-row items-center justify-between w-full py-5 border-b border-slate-100 bg-slate-50 px-8 ">
            <div className="shadow-sm py-2 gap-2.5 rounded-md flex items-center w-2/5 pr-2 pl-2.5 border border-input bg-transparent text-black text-sm">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name , Ville... "
                className="outline-none text-slate-700 text-sm font-medium w-full  bg-transparent placeholder:text-slate-400"
              />
            </div>
            <div className="flex flex-row gap-6">
              <button
                onClick={() => setFilter("All")}
                className={`flex-1 md:flex-initial cursor-pointer py-2 px-5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all border ${
                  filter === "All"
                    ? "bg-sky-100 text-sky-600 border-sky-200"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("Completed")}
                className={`flex-1 md:flex-initial cursor-pointer py-2 px-5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all border ${
                  filter === "Completed"
                    ? "bg-emerald-100 text-emerald-600 border-emerald-200"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                Completed
              </button>
              <button
                onClick={() => setFilter("Pending")}
                className={`flex-1 md:flex-initial cursor-pointer py-2 px-5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all border ${
                  filter === "Pending"
                    ? "bg-amber-100 text-amber-600 border-amber-200"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter("Rejected")}
                className={`flex-1 md:flex-initial cursor-pointer py-2 px-5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all border ${
                  filter === "Rejected"
                    ? "bg-red-100 text-red-600 border-red-200"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                Rejected
              </button>
            </div>
          </div>
          <main className="grid grid-cols-1 px-8 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {Orders.filter((item) => {
              const matchesSearch =
                item.full_name.toLowerCase().includes(search.toLowerCase()) ||
                item.ville.toLowerCase().includes(search.toLowerCase());

              const matchesFilter =
                filter === "All" ||
                (filter === "Completed" && item.status === "Complete") ||
                item.status === filter;

              return matchesSearch && matchesFilter;
            }).map((order, index) => (
              <div
                key={index}
                className="bg-white relative rounded-3xl py-3 px-4 border-[2.5px] border-sky-100"
              >
                {viewDetails !== order.id ? (
                  <button
                    onClick={() => setViewDetails(order.id)}
                    className="cursor-pointer absolute top-[-1.5px] right-[-1.5px] rounded-tr-3xl bg-sky-300 px-4 py-3 text-center text-xs font-bold text-gray-900 uppercase transition hover:bg-sky-400"
                  >
                    View details
                  </button>
                ) : (
                  <button
                    onClick={() => setViewDetails(null)}
                    className="cursor-pointer absolute top-[-1.5px] right-[-1.5px] rounded-tr-3xl bg-sky-300 px-4 py-3 text-center text-xs font-bold text-gray-900 uppercase transition hover:bg-sky-400"
                  >
                    Retour
                  </button>
                )}

                <h2 className="text-lg mt-2 mb-6 font-semibold">
                  {order.full_name}
                </h2>

                {viewDetails !== order.id ? (
                  <main>
                    <div className="flex items-center gap-3 py-2">
                      <Clock className="w-4 h-4 text-sky-500" />
                      <span className="text-sm font-medium text-slate-700">
                        {order.date} • {order.heure}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 py-2">
                      <MapPin className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm font-medium text-slate-700">
                        {order.ville}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 py-2">
                      <Layers2 className="w-4 h-4 text-violet-500" />
                      <span className="text-sm font-medium text-slate-700">
                        {order.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 py-2">
                      <Car className="w-4 h-4 text-orange-500" />
                      <span className="text-sm font-medium text-slate-700">
                        {order.brand}
                      </span>
                    </div>

                    {/* divider */}
                    <div className="border-t border-dashed border-gray-300 my-4" />

                    <div className="flex flex-row justify-between">
                      <h2 className="text-lg font-bold">Order</h2>
                      <p className="text-sky-500 font-semibold">
                        {order.service}
                      </p>
                    </div>

                    <div className="mt-4 mb-2">
                      {order.status === "Pending" && (
                        <div className="flex items-center justify-between gap-4">
                          <span className="animate-pulse bg-amber-100 text-amber-600 px-3 py-1 rounded-full text-sm font-medium">
                            Pending
                          </span>
                          <button
                            onClick={() =>
                              handleStatusUpdate(order.id, "Complete")
                            }
                            className="bg-green-100 text-green-700 px-4 py-2 rounded-md font-medium hover:bg-green-200 transition"
                          >
                            {loading === true ? "loading..." : " Mark Complete"}
                          </button>
                        </div>
                      )}

                      {order.status === "Complete" && (
                        <div className="flex items-center justify-between">
                          <span className="animate-pulse bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                            Completed
                          </span>
                        </div>
                      )}

                      {order.status === "Rejected" && (
                        <div className="flex items-center justify-between">
                          <span className="animate-pulse bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                            Rejected
                          </span>
                        </div>
                      )}

                      {!["Pending", "Complete", "Rejected"].includes(
                        order.status
                      ) && (
                        <div className="flex gap-4">
                          <button
                            onClick={async () => {
                              await handleStatusUpdate(order.id, "Pending");
                              await confirmOrder(order);
                            }}
                            className="flex-1 bg-green-100 text-green-700 py-2 rounded-md font-medium hover:bg-green-200 transition"
                          >
                            {loading ? "Loading..." : "Confirm"}
                          </button>

                          <button
                            onClick={async () => {
                              await handleStatusUpdate(order.id, "Rejected");
                              await rejectOrder(order);
                            }}
                            className="flex-1 bg-red-100 text-red-600 py-2 rounded-md font-medium hover:bg-red-200 transition"
                          >
                            {loading ? "Loading..." : "Reject"}
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

                    {/* divider */}
                    <div className="border-t border-dashed border-gray-300 my-4" />

                    <div className="flex flex-row justify-between">
                      <h2 className="text-lg font-bold">Total</h2>
                      <p className="text-emerald-500 font-medium">
                        {order.total}
                      </p>
                    </div>

                    <button
                      onClick={() => handleDelete(order.id)}
                      className="hover:opacity-80 cursor-pointer w-full bg-red-500 mt-4 mb-2 rounded-md py-2 text-white font-medium"
                    >
                      {loading === true ? "loading..." : "Remove Demand"}
                    </button>
                  </main>
                )}
              </div>
            ))}
          </main>
        </section>
      </main>
    </section>
  );
};

export default page;
