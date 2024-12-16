"use client"

import { Check, ChevronsUpDown } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function Combobox({
  value,
  options,
  placeholder,
  onSelect,
}: {
  value: string | undefined
  options: { value: string; label: string }[]
  placeholder: string
  onSelect: (value: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [triggerWidth, setTriggerWidth] = useState<number | null>(null)

  // Filter options based on the search query
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const selectedOption = options.find((option) => option.value === value)

  const updateTriggerWidth = (triggerElement: HTMLElement | null) => {
    if (triggerElement) {
      setTriggerWidth(triggerElement.offsetWidth)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen} modal={false}>
      <PopoverTrigger asChild>
        <Button
          ref={(node) => updateTriggerWidth(node)}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between text-gray-500"
        >
          {selectedOption
            ? selectedOption.label
            : placeholder}
          <ChevronsUpDown className="text-gray-500" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0"
        style={{ width: triggerWidth || "auto" }} // Set width dynamically
      >
        <Command className="w-full">
          <CommandInput
            className="w-full"
            placeholder={`Search ${placeholder}...`}
            onValueChange={(value) => setSearchQuery(value)}
          />
          <CommandList className="w-full">
            {filteredOptions.length > 0 ? (
              <CommandGroup className="w-full">
                {filteredOptions.map((option) => (
                  <CommandItem
                    className="w-full"
                    key={option.value}
                    value={option.label}
                    onSelect={(currentValue) => {
                      console.log("currentValue", currentValue)
                      setOpen(false)
                      onSelect(options.find((option) => option.label === currentValue)?.value || "")
                    }}
                  >
                    {option.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : (
              <CommandEmpty>No {placeholder} found.</CommandEmpty>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
