import { atomWithStorage } from "jotai/utils";

export const AccessTokenAtom = atomWithStorage<string>("uuid", "", undefined, {
  getOnInit: true,
});
