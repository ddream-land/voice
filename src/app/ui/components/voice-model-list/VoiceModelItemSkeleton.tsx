"use client";
import React, { useState } from "react";
import { Card, Skeleton } from "@nextui-org/react";

function VoiceModelItemSkeleton() {
  return (
    <Card className="w-full space-y-5 p-4" radius="lg">
      <Skeleton className="rounded-lg">
        <div className="h-0 pb-[56.25%] rounded-lg bg-secondary"></div>
      </Skeleton>
      <div className="self-stretch p-3 flex-col justify-start items-start gap-1.5 flex">
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-full rounded-lg bg-secondary-300"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-full rounded-lg bg-secondary-200"></div>
        </Skeleton>
      </div>

    </Card>
  );
}

export default VoiceModelItemSkeleton;
