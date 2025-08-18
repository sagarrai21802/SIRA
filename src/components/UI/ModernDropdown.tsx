import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";

interface ModernDropdownProps<T> {
  label?: string;
  options: T[];
  selected: T;
  onChange: (value: T) => void;
  displayKey?: keyof T;
}

export function ModernDropdown<
  T extends string | Record<string, any>
>({
  label,
  options,
  selected,
  onChange,
  displayKey,
}: ModernDropdownProps<T>) {
  return (
    <div className="w-64">
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      <Listbox value={selected} onChange={onChange}>
        <div className="relative mt-1">
          {/* Dropdown Button */}
          <Listbox.Button className="relative w-full cursor-pointer rounded-xl bg-white/30 dark:bg-gray-800/60 backdrop-blur-md py-3 pl-4 pr-10 text-left shadow-lg text-gray-800 dark:text-white border border-gray-300/30 hover:border-indigo-400 transition-all duration-300 focus:ring-2 focus:ring-indigo-400/60 focus:scale-[1.02]">
            <span className="block truncate font-medium">
              {typeof selected === "string"
                ? selected
                : displayKey
                ? String(selected[displayKey])
                : ""}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-300 transition-transform duration-300 group-data-[headlessui-state=open]:rotate-180" />
            </span>
          </Listbox.Button>

          {/* Dropdown Options */}
          <Transition
            as={Fragment}
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-95 -translate-y-2"
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 scale-95 -translate-y-2"
            enterTo="opacity-100 scale-100 translate-y-0"
          >
            <Listbox.Options className="absolute mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg py-2 shadow-2xl ring-1 ring-black/10 focus:outline-none z-50 animate-fadeIn">
              {options.map((option, idx) => (
                <Listbox.Option
                  key={idx}
                  value={option}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 rounded-lg mx-1 transition-all duration-200 ${
                      active
                        ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-600 dark:text-indigo-400 scale-[1.02] shadow-md"
                        : "text-gray-800 dark:text-gray-200"
                    }`
                  }
                >
                  {({ selected: isSelected }) => (
                    <>
                      <span
                        className={`block truncate transition-colors ${
                          isSelected
                            ? "font-semibold text-indigo-600 dark:text-indigo-400"
                            : "font-normal"
                        }`}
                      >
                        {typeof option === "string"
                          ? option
                          : displayKey
                          ? String(option[displayKey])
                          : ""}
                      </span>
                      {isSelected ? (
                        <span className="absolute inset-y-0 left-2 flex items-center text-indigo-500 dark:text-indigo-400 animate-bounce">
                          <Check className="h-5 w-5" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
