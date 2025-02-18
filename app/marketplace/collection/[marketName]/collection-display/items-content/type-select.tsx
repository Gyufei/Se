import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils/common";
import { INFT } from "@/lib/api/use-market-nfts";
import { removeQueryParams } from "@/lib/utils/url";
import { compact } from "lodash";

export interface IFilterOption {
  label: string;
  value: INFT["status"];
}

const filterOptions: Array<IFilterOption> = [
  {
    label: "Free",
    value: "PERSON",
  },
  {
    label: "Listed",
    value: "LISTED",
  },
  {
    label: "Vaulted",
    value: "VAULTED",
  },
];

export default function FilterTypeSelect({
  filterTypes,
  setFilterTypes,
}: {
  filterTypes: Array<INFT["status"] | null>;
  setFilterTypes: (filterTypes: Array<INFT["status"] | null>) => void;
}) {
  const [open, setOpen] = useState(false);

  const isAllChecked = useMemo(() => {
    return !filterTypes.length || filterTypes.length === filterOptions.length;
  }, [filterTypes]);

  const currentLabel = useMemo(() => {
    if (isAllChecked) return "All";

    const labels = filterTypes.map((type) => filterOptions.find((option) => option.value === type)?.label);

    if (labels.length > 1) {
      return `${labels[0]} (+${labels.length - 1})`;
    }

    return labels[0];
  }, [filterTypes, isAllChecked]);

  function handleAllChecked() {
    if (isAllChecked) {
      return;
    }

    if (!isAllChecked) {
      setFilterTypes([]);
      setOpen(false);
      removeQueryParams(["type"]);
    }
  }

  function handleFilterTypeChange(option: IFilterOption) {
    let newFilterTypes = [...filterTypes];

    if (newFilterTypes.includes(option.value)) {
      newFilterTypes = newFilterTypes.filter((type) => type !== option.value);
    } else {
      newFilterTypes.push(option.value);
    }

    if (newFilterTypes.length === filterOptions.length) {
      handleAllChecked();
      return;
    }

    setFilterTypes(newFilterTypes);
    setOpen(false);

    const typeLabel = newFilterTypes.map((type) => filterOptions.find((option) => option.value === type)?.label);
    changeCurrentSearchParams("type", typeLabel.join(","));
  }

  function changeCurrentSearchParams(key: string, value: string) {
    const searchParams = new URLSearchParams(window.location.search);

    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }

    window.history.pushState({}, "", window.location.pathname + "?" + searchParams.toString());
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const typeLabel = searchParams.get("type");
    if (!typeLabel) return;

    const types = typeLabel?.split(",");
    const fValue = compact((types || [])?.map((type) => filterOptions.find((option) => option.label === type)?.value));

    if (fValue.length) {
      setFilterTypes(fValue as any[]);
    }
  }, [setFilterTypes]);

  return (
    <Popover open={open} onOpenChange={(o) => setOpen(o)}>
      <PopoverTrigger asChild>
        <div className="flex h-12 flex-1 cursor-pointer items-center space-x-[5px] bg-[#281A31] px-5 md:w-[155px]">
          <div className="w-fit break-keep">{currentLabel}</div>
          <Image src="/icons/bracket-up.svg" width={16} height={16} alt="arrow" className={cn(!open && "rotate-180")} />
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="flex w-[155px] flex-col items-stretch space-y-[5px] rounded-none border-0 bg-[#382743] p-[5px]"
      >
        <div
          className="flex h-10 cursor-pointer items-center justify-between rounded-none px-4 text-sm text-white hover:bg-[#281A31]"
          onClick={() => handleAllChecked()}
        >
          <span>All</span>
          {isAllChecked && <Image src="/icons/green-check.svg" width={16} height={16} alt="check" />}
        </div>
        {filterOptions.map((option) => (
          <div
            key={option.value}
            className="flex h-10 cursor-pointer items-center justify-between rounded-none px-4 text-sm text-white hover:bg-[#281A31]"
            onClick={() => handleFilterTypeChange(option)}
          >
            <span>{option.label}</span>
            {filterTypes.includes(option.value) && (
              <Image src="/icons/green-check.svg" width={16} height={16} alt="check" />
            )}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
