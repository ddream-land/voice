import React from "react";
import {useRadio, Chip, VisuallyHidden, tv, RadioGroup} from "@nextui-org/react";

const radio = tv({
  slots: {
    // base: "border-black hover:bg-gray-200 bg-transparent h-10 rounded-md border border-black border-opacity-20",
    // content: "text-black text-center"
  },
  variants: {
    isSelected: {
      true: {
        base: "border-black bg-black hover:bg-black-500 hover:border-black-500",
        content: "text-white pl-1"
      }
    },
    isFocusVisible: {
      true: { 
        base: "outline-none ring-2 ring-focus ring-offset-2 ring-offset-background",
      }
    }
  }
})

const CustomRadio = (props : any) => {
  const {
    children,
    isSelected,
    isFocusVisible,
    getBaseProps,
    getLabelProps,
    getInputProps,
  } = useRadio({
    ...props
  })

  const styles = radio({ isSelected, isFocusVisible })

  return (
    <label {...getBaseProps()} onClick={(e) => {
      if (e.currentTarget.getAttribute('data-selected') === "true") {
        // 阻止事件冒泡
        e.stopPropagation();
   
        // 阻止事件的默认行为
        e.preventDefault();
        props.onChange();
      }
    }}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>

      <Chip
        classNames={{
          base: " cursor-pointer h-10 px-4 py-2 rounded-xl justify-center items-center inline-flex",
          content: "text-white text-base font-normal leading-norma",
        }}
        color="default"
        variant={isSelected ? "solid" : "light"}
        size="lg"
        // {...getLabelProps()}
      >
        {children ? children : isSelected ? "Enabled" : "Disabled"}
      </Chip>
    </label>
  );
}


export default function NuwaChipRadioGroup({items, value, onChange}: {
  items: {label: string, value: any}[],
  value: any,
  onChange: (e: any) => void
}) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <RadioGroup
        orientation="horizontal"
        value={value}
        onChange={(e) => {
          onChange(e)
        }}
        classNames={{
          wrapper: "gap-x-10 gap-y-4"
        }}
      >
        {items.map((item) => (
          <CustomRadio key={item.value} value={item.value} onChange={onChange}>{item.label}</CustomRadio>
        ))}
      </RadioGroup>
    </div>
  );
}

