"use client";
import React, { useState } from "react";
import { Card, Checkbox, Skeleton } from "@nextui-org/react";

function TrainItemSkeleton() {
  return (
    <Card className="w-full h-[76px] px-4 py-2.5 bg-zinc-900 justify-between items-center flex flex-row" radius="lg">
      <div className="h-full justify-start items-center gap-2.5 flex">
        <div className="justify-start items-center gap-2.5 flex">
          <div className="justify-center items-center flex">
            <Checkbox isSelected={false} size="sm" defaultSelected></Checkbox>
          </div>
          <Skeleton className=" rounded-md">
            <div className="h-6 w-[200px] rounded-md bg-secondary-200"></div>
          </Skeleton>
        </div>
        <Skeleton className="rounded-md h-6 w-[240px]">
        </Skeleton>
      </div>
      
      <div className="flex flex-row gap-2">
        <Skeleton className="rounded-lg w-[100px] h-[40px]">
        </Skeleton>
        <Skeleton className="rounded-lg w-[100px] h-[40px]">
        </Skeleton>
      </div >
    </Card>
  );
}

export default TrainItemSkeleton;
