"use client";
import React from "react";
import { Button, Tooltip } from "@nextui-org/react";
import CommercialStarIcon from "@/app/icons/CommercialStarIcon";

function CommercialLicenseIcon() {
  return (
    <Tooltip color="warning" showArrow={true} size="lg" content="Commercial">
      <Button
        isIconOnly
        color="default" 
        variant="light"
        className="data-[hover=true]:bg-transparent"
      >
        <CommercialStarIcon className="w-5 h-5" />
      </Button>
    </Tooltip>
  );
}

export default CommercialLicenseIcon;
