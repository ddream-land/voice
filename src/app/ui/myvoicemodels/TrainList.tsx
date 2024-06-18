"use client";
import React, { useState } from "react";
import UploadFile from "../components/UploadFile";
import TrainIcon from "@/app/icons/TrainIcon";
import TrainItem from "./TrainItem";
import { Button, Input, Pagination } from "@nextui-org/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";

function TrainList() {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full h-12 justify-between items-center inline-flex">
        <Input
          classNames={{
            base: 'w-[400px]',
            // inputWrapper: 'bg-zinc-700'
          }}
          startContent={<MagnifyingGlassIcon className="w-6 h-6" />}
          type="text"
          variant="bordered"
          color="default"
          placeholder="Search"
          size="sm"
        />
        <Button color="danger" startContent={<TrashIcon className="w-5 h-5" />}>delete</Button>
      </div>
      <TrainItem name="91s Pop Punk" status="completed" />
      <TrainItem name="92s Pop Punk" status="completing" />
      <TrainItem name="93s Pop Punk" status="failed" />
      <TrainItem name="94s Pop Punk" status="completing" />
      <div className="w-full h-8 justify-between items-center inline-flex">
        <div className="text-zinc-400 text-sm font-normal font-['Inter'] leading-tight">
          1-10 of 85 items
        </div>
        <Pagination total={10} initialPage={1} />
      </div>
    </div>
  );
}

export default TrainList;
