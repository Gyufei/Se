import { useMemo } from "react";
import { WithCDN, WithApiHost } from "@/lib/api/api-paths";

export function useEndPoint() {
  const apiEndPoint = useMemo(() => WithApiHost(""), []);
  const cdnEndPoint = useMemo(() => WithCDN(""), []);

  return {
    apiEndPoint,
    cdnEndPoint,
  };
}
