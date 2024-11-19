"use client";

import { useEffect } from "react";
import { useAtom } from "jotai";
import Image from "next/image";
import { GlobalMessageAtom } from "@/lib/state/global-message";

export default function GlobalMessageTip() {
  const [globalMessage, setGlobalMessage] = useAtom(GlobalMessageAtom);
  const { type, message } = globalMessage || {};

  useEffect(() => {
    if (globalMessage) {
      const d = setTimeout(() => {
        setGlobalMessage(null);
      }, 5000);
      return () => clearTimeout(d);
    }
  }, [globalMessage, setGlobalMessage]);

  const colorMap = {
    success: {
      bg: "#AAED4A40",
      border: "#AAED4A",
    },
    warning: {
      bg: "#3772FF40",
      border: "#3772FF",
    },
    error: {
      bg: "#EF466F40",
      border: "#EF466F",
    },
  };

  return (
    <>
      {message && type ? (
        <div
          className="fixed bottom-6 left-1/2 z-[1000] mt-4 flex -translate-x-1/2 items-center gap-x-2 rounded-md border px-5 py-3"
          style={{
            borderColor: colorMap[type].border,
            backgroundColor: colorMap[type].bg,
          }}
        >
          {((type) => {
            switch (type) {
              case "success":
                return (
                  <Image
                    src="/icons/success.svg"
                    width={24}
                    height={24}
                    alt="icon"
                  />
                );
              case "warning":
                return (
                  <Image
                    src="/icons/info.svg"
                    width={24}
                    height={24}
                    alt="icon"
                  />
                );
              case "error":
                return (
                  <Image
                    src="/icons/error.svg"
                    width={24}
                    height={24}
                    alt="icon"
                  />
                );
              default:
                return null;
            }
          })(type)}
          <div className="text-title-color max-w-[440px] overflow-hidden text-ellipsis whitespace-nowrap leading-6">
            {message}
          </div>
        </div>
      ) : null}
    </>
  );
}
