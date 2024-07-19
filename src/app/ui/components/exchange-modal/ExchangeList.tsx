"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getFinanceSales } from "@/app/lib/finance.api";
import { FinanceProductType } from "@/app/lib/definitions.finance";
import WholeNoteIcon from "@/app/icons/WholeNoteIcon";
import BlackWholeNoteIcon from "@/app/icons/BlackWholeNoteIcon";


export type ExchangeProps = {
  locale?: 'en' | 'zh-CN'
  onChange?: () => void
}

function ExchangeList({
  locale = 'en',
  onChange,
}: ExchangeProps) {
  

  const [isGetFinanceSalesing, setIsGetFianceSalesing] = useState(false)
  const [productList, setProductList] = useState<Array<FinanceProductType>>([])
  const getFinanceSalesApi = getFinanceSales()

  const getBagsApiServer = async () => {
    if (isGetFinanceSalesing) return
    setIsGetFianceSalesing(true)
    const res = await getFinanceSalesApi.send({
      product_id: '101'
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
    <div className="px-[96px]">
      <div className="py-[70px] flex flex-row items-end justify-center">
        <WholeNoteIcon className="w-[35px] h-[35px]" /><span className="text-white text-2xl font-normal leading-normal">兑换后，音符+42</span>
      </div>
      <div className="flex flex-row gap-5 relative">
        {productList.map((product) => (
          <div className="flex flex-col gap-2 items-center justify-center">
            <div className="w-[180px] h-60 rounded-2xl border border-lime-300 bg-gradient-to-tl from-black to-neutral-800">
              <div className="bg-[url('/imgs/exchange-bg.png')] bg-cover w-full h-full flex flex-col-reverse items-center justify-start">
                <div className="text-center text-gray-200 text-[42px] font-bold  my-6">+{product.product_num}</div>
                <WholeNoteIcon className="w-[58px] h-[58px]" />
              </div>

              <div className="left-0 -top-6 absolute h-7 px-3 py-1 bg-gradient-to-r from-lime-300 to-cyan-400 rounded-tl-full rounded-bl-none rounded-tr-full rounded-br-full justify-center items-center flex flex-row">
                <div className="text-center text-black text-sm font-semibold ">额外</div>
                <BlackWholeNoteIcon className="w-[15px] h-[15px] fill-black" />
                <div className="text-black text-sm font-semibold ">12</div>
              </div>
            </div>
            <div className="flex flex-row justify-center items-center">
              <Image
                src='/imgs/dreamTokenIcon.png'
                width={38}
                height={38}
                alt=""
                className="h-auto w-auto flex-none object-cover"
              />
              <div className="text-center text-white text-2xl font-bold ">{product.price}</div>
            </div>
          </div>
        ))}
        
      </div>

      <div className="w-full flex flex-row items-center justify-center mt-[52px] mb-[42px]">
        <div className="w-[313px] h-[62px] bg-gradient-to-r from-lime-300 to-cyan-400 rounded-2xl flex flex-row items-center justify-center cursor-pointer">
          <div className="text-black text-2xl font-semibold  leading-normal">兑换</div>
        </div>
      </div>
      
    </div>
  );
}

export default ExchangeList;
