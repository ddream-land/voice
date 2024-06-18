import React from "react";
import {useCheckbox, Chip, VisuallyHidden, tv, CheckboxGroup} from "@nextui-org/react";

const checkbox = tv({
  slots: {
    base: "border-black hover:bg-gray-200 bg-white h-10 rounded-md border border-black border-opacity-20",
    content: "text-black w-[155px] text-center"
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

const CustomCheckbox = (props : any) => {
  const {
    children,
    isSelected,
    isFocusVisible,
    getBaseProps,
    getLabelProps,
    getInputProps,
  } = useCheckbox({
    ...props
  })

  const styles = checkbox({ isSelected, isFocusVisible })

  return (
    <label {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <Chip
        classNames={{
          base: styles.base(),
          content: styles.content(),
        }}
        color="primary"
        variant="faded"
        // {...getLabelProps()}
      >
        {children ? children : isSelected ? "Enabled" : "Disabled"}
      </Chip>
    </label>
  );
}


export default function NuwaCheckbox({items, value, onChange}: {
  items: {name: string, value: string}[],
  value: string[],
  onChange: (value: any) => void
}) {
  return (
    <div className="w-full">
      <CheckboxGroup
        orientation="horizontal"
        value={value}
        onChange={onChange}
        classNames={{
          wrapper: "gap-x-10 gap-y-4"
        }}
      >
        {items.map((item) => (
          <CustomCheckbox key={item.value} value={item.value}>{item.name}</CustomCheckbox>
        ))}
      </CheckboxGroup>
    </div>
  );
}

