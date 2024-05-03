import { DropdownOption } from "@/utils/types";
import React, { useState, useEffect, useRef } from "react";

type Props = {
  options: DropdownOption[];
  selected: DropdownOption;
  onChange: (value: DropdownOption) => void;
};

const Dropdown = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="w-full border border-gray-200 bg-gray-700 relative flex items-center justify-center rounded-lg cursor-pointer"
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      <div className="px-4 py-2 relative ">{props.selected.label}</div>
      {isOpen ? (
        <div className="absolute w-full top-[calc(100%+10px)] left-0 border-gray-200 bg-gray-700 max-h-[200px] overflow-y-scroll flex flex-col gap-1 rounded-lg no-scrollbar">
          {props.options.map((option) => (
            <div
              key={option.value}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-800 cursor-pointer"
              onClick={() => props.onChange(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Dropdown;
