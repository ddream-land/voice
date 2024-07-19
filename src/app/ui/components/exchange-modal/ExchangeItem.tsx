"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getFinanceSales } from "@/app/lib/finance.api";
import { FinanceProductType } from "@/app/lib/definitions.finance";
import WholeNoteIcon from "@/app/icons/WholeNoteIcon";
import BlackWholeNoteIcon from "@/app/icons/BlackWholeNoteIcon";
import { cn, Skeleton } from "@nextui-org/react";


export type ExchangeItemProps = {
  value: FinanceProductType
  isSelected?: boolean;
  onValueChange?: (selected: FinanceProductType) => void;
  locale?: 'en' | 'zh-CN'
  onChange?: () => void
}

function ExchangeItem({
  value,
  isSelected = false,
  onValueChange,
  locale = 'en',
  onChange,
}: ExchangeItemProps) {
  

  const [isGetFinanceSalesing, setIsGetFianceSalesing] = useState(false)
  const [valueList, setProductList] = useState<Array<FinanceProductType>>([])
  const getFinanceSalesApi = getFinanceSales()

  const getBagsApiServer = async () => {
    if (isGetFinanceSalesing) return
    setIsGetFianceSalesing(true)
    const res = await getFinanceSalesApi.send({
      value_id: '101'
    });
    if (res && res.code === 0) {
      setProductList(res.data.list)
    }

    setIsGetFianceSalesing(false)
  }

  useEffect(() => {
    getBagsApiServer();
  }, [])
  
  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <div
        onClick={() => onValueChange && onValueChange(value)}
        className={cn( isSelected ? 'border-lime-300 ' : ' border-neutral-700', 'cursor-pointer w-[180px] h-60 rounded-2xl border bg-gradient-to-tl from-black to-neutral-800 relative')}
      >
        <div className="bg-[url('/imgs/exchange-bg.png')] bg-cover w-full h-full flex flex-col-reverse items-center justify-start rounded-2xl overflow-hidden">
          <div className="text-center text-gray-200 text-[42px] font-bold  my-6">+{value.product_num}</div>
          {value.product_num > 100 && value.product_num < 600 && (
            <div className="flex flex-row justify-center items-center w-full gap-1">
              <WholeNoteIcon className="w-[58px] h-[58px]" />
              <WholeNoteIcon className="w-[58px] h-[58px]" />
            </div>
          )}
          {value.product_num < 100 && (
            <WholeNoteIcon className="w-[58px] h-[58px]" />
          )}
          {value.product_num > 600 && (
            <div className=" relative h-[92px] w-[70px] flex flex-row justify-center items-end">
              <WholeNoteIcon className="w-[60px] h-[60px]" />
              <div className="absolute right-0 top-0">
                <WholeNoteIcon className="w-[33px] h-[33px]" />
              </div>
              <div className="absolute top-4 left-0">
                <WholeNoteIcon className="w-9 h-9" />
              </div>
            </div>
          )}
        </div>

        {value.free > 0 && (
          <div className="left-0 -top-6 absolute h-7 px-3 py-1 bg-gradient-to-r from-lime-300 to-cyan-400 rounded-tl-full rounded-bl-none rounded-tr-full rounded-br-full justify-center items-center flex flex-row">
            <div className="text-center text-black text-sm font-semibold ">额外</div>
            <BlackWholeNoteIcon className="w-[15px] h-[15px] fill-black" />
            <div className="text-black text-sm font-semibold ">{value.free}</div>
          </div>
        )}
        
      </div>
      <div className="flex flex-row justify-center items-center">
        <Image
          src='/imgs/dreamTokenIcon.png'
          width={38}
          height={38}
          alt=""
          className="h-auto w-auto flex-none object-cover"
        />
        <div className="text-center text-white text-2xl font-bold ">{value.price}</div>
      </div>
    </div>
  );
}

export default ExchangeItem;
