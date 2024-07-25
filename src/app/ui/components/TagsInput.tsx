"use client";
import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { cn, Input } from "@nextui-org/react";

function TagsInput({
  value,
  onValueChange,
  placeholder = "",
}: {
  value: string[];
  onValueChange?: (value: string[]) => void;
  placeholder?: string,
}) {
  const [tags, setTags] = useState(value);

  const handleClose = (fruitToRemove: string) => {
    setTags(tags.filter(fruit => fruit !== fruitToRemove));
    // if (tags.length === 1) {
    //   setTags(initialFruits);
    // }
  };

  useEffect(() => {
    onValueChange && onValueChange(tags)
  }, [tags])

  const [newTag, setNewTag] = useState("");

  return (
    <div className="w-full min-h-[52px] px-4 py-3 rounded-xl border-2 border-zinc-700 hover:border-white justify-start items-center gap-2 inline-flex">
      <div className="grow shrink basis-0 min-h-7 justify-start items-center gap-4 flex flex-row flex-wrap">
        {tags.map((tag, index) => (
          <div
            className="w-auto h-7 px-2 py-1 bg-zinc-700 rounded-lg justify-start items-center gap-3 inline-flex"
            key={`${index}-${tag}`}
          >
            <div className="justify-start items-center gap-2 flex">
              <div className="text-white text-sm font-normal leading-tight">{tag}</div>
            </div>
            <XMarkIcon className="cursor-pointer w-4 h-4 stroke-zinc-400" onClick={() => handleClose(tag)}/>
          </div>
        ))}
        <Input
          classNames={{
            base: cn([
              "bg-transparent w-[200px] grow hrink",
            ]),
            inputWrapper: "bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent p-0 min-h-0 h-5",
            label: "text-zinc-400 text-sm font-normal leading-tight",
            // inputWrapper: 'bg-zinc-700'
          }}
          type="text"
          size="sm"
          variant="flat"
          placeholder={placeholder}
          value={newTag}
          onValueChange={setNewTag}
          onKeyDown={(e) => {
            if (e.key !== 'Enter') return;
            if (newTag.trim() === '') return;
            if (tags.includes(newTag)) return;
            let newTags = [...tags, newTag];

            // if (tags.includes(newTag))  {
            //   delete newTags[newTags.indexOf(newTag)];
            // };

            setTags(newTags)
            setNewTag('');
            e.preventDefault();
          }}
        />
      </div>
    </div>
  );
}

export default TagsInput;
