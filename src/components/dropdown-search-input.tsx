import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { DataSource } from "@/types/types";

type DropdownSearchInputProps = {
  dataSource: DataSource[];
  selectedValue: string | number | boolean;
  onSelectValue: (currentValue: string | number | boolean) => void;
  placeholder: string;
};

const DropdownSearchInput = ({
  dataSource,
  onSelectValue,
  selectedValue,
  placeholder,
}: DropdownSearchInputProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {selectedValue
            ? dataSource.find((data) => data.value === selectedValue)?.label
            : placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>No data found.</CommandEmpty>
            <CommandGroup>
              {dataSource?.map((data) => (
                <CommandItem
                  key={data?.value as string}
                  value={data?.value as string}
                  onSelect={() => {
                    onSelectValue(data?.value);
                    setOpen(false);
                  }}
                >
                  {data?.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      data?.value === selectedValue
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default DropdownSearchInput;
