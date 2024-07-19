"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { financeExchange, getFinanceSales } from "@/app/lib/finance.api";
import { FinanceProductType } from "@/app/lib/definitions.finance";
import WholeNoteIcon from "@/app/icons/WholeNoteIcon";
import BlackWholeNoteIcon from "@/app/icons/BlackWholeNoteIcon";
import { Button, Skeleton } from "@nextui-org/react";
import ExchangeItem from "./ExchangeItem";
import { useExchangeDispatch } from "./ExchangeContextProvider";
import { useAmDispatch } from "../alter-message/AlterMessageContextProvider";


export type ExchangeListProps = {
  locale?: 'en' | 'zh-CN'
  onSuccess?: () => void
}

function ExchangeList({
  locale = 'en',
  onSuccess,
}: ExchangeListProps) {
  
  const exchangeDispatch = useExchangeDispatch();

  const [isGetFinanceSalesing, setIsGetFianceSalesing] = useState(false)
  const [productList, setProductList] = useState<Array<FinanceProductType>>([])
  const [selectedProduct, setSelectedProduct] = useState<FinanceProductType | null>(null);
  const amDispatch = useAmDispatch();

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


  const [exchangeing, setExchangeing] = useState<boolean>(false)
  const financeExchangeApi = financeExchange()
  const financeExchangeServer = async () => {
    if (exchangeing) return
    setExchangeing(true)
    const res = await financeExchangeApi.send({
      package_id: selectedProduct?.package_id
    });
    if (res && res.code === 0) {
      amDispatch({
        type: "add",
        payload: {
          message: 'exchange success',
          type: "success"
        },
      })
      onSuccess && onSuccess();
    }

    setExchangeing(false)
  }

  const onSubmitHandler = () => {
    financeExchangeServer();
  }
  
  return (
    <div className="px-[96px]">
      <div className="py-[70px] flex flex-row items-end justify-center">
        <WholeNoteIcon className="w-[35px] h-[35px]" /><span className="text-white text-2xl font-normal leading-normal">兑换后，音符+{selectedProduct && selectedProduct?.product_num + selectedProduct?.free}</span>
      </div>
      <div className="flex flex-row gap-5 relative justify-center">
        {productList.map((product) => (
          <ExchangeItem
            key={product.package_id}
            value={product}
            isSelected={selectedProduct?.package_id === product.package_id}
            onValueChange={(newSelected) => {
              if (newSelected.package_id === selectedProduct?.package_id) {
                setSelectedProduct(null)
              } else {
                setSelectedProduct(newSelected)
              }
            }}
          />
        ))}
        
        {productList.length === 0 && (
          <>
            <div className="h-[296px]">
              <Skeleton className="rounded-2xl w-[180px] h-[238px]">
                <div className="w-full h-full rounded-2xl bg-secondary"></div>
              </Skeleton>
            </div>
            <div className="h-[296px]">
              <Skeleton className="rounded-2xl w-[180px] h-[238px]">
                <div className="w-full h-full rounded-2xl bg-secondary"></div>
              </Skeleton>
            </div>
            <div className="h-[296px]">
              <Skeleton className="rounded-2xl w-[180px] h-[238px]">
                <div className="w-full h-full rounded-2xl bg-secondary"></div>
              </Skeleton>
            </div>
            <div className="h-[296px]">
              <Skeleton className="rounded-2xl w-[180px] h-[238px]">
                <div className="w-full h-full rounded-2xl bg-secondary"></div>
              </Skeleton>
            </div>
            <div className="h-[296px]">
              <Skeleton className="rounded-2xl w-[180px] h-[238px]">
                <div className="w-full h-full rounded-2xl bg-secondary"></div>
              </Skeleton>
            </div>
          </>
        )}
      </div>

      <div className="w-full flex flex-row items-center justify-center mt-[52px] mb-[42px]">
        <Button
          isDisabled={selectedProduct === null}
          color="primary"
          variant="solid"
          className="w-[313px] h-[62px] bg-gradient-to-r from-lime-300 to-cyan-400 rounded-2xl flex flex-row items-center justify-center cursor-pointer text-black text-2xl"
          onPress={() => {
            if (selectedProduct != null) {
              onSubmitHandler();
            }
          }}
        >
          兑换
        </Button>
      </div>
      
    </div>
  );
}

export default ExchangeList;
