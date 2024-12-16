import { useState, useEffect } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { replaceTimeUnitToSingleChar } from "@/lib/utils/time";

export function DurationDisplay({ time }: { time: number }) {
  const [duration, setDuration] = useState("");

  useEffect(() => {
    function calcDuration() {
      const du = formatDistanceToNowStrict(Number(time));
      const duStr = replaceTimeUnitToSingleChar(du);
      setDuration(duStr);
    }

    calcDuration();

    const now = new Date().getTime();
    const offset = now - time;

    let inter;
    if (offset < 60 * 1000) {
      inter = setInterval(calcDuration, 1000);
      return;
    }

    if (offset > 60 * 1000 && offset < 60 * 60 * 1000) {
      inter = setInterval(calcDuration, 1000 * 60);
      return;
    }

    if (offset > 60 * 60 * 1000 && offset < 24 * 60 * 60 * 1000) {
      inter = setInterval(calcDuration, 1000 * 60 * 60);
      return;
    }

    if (offset > 24 * 60 * 60 * 1000) {
      return;
    }

    inter = setInterval(calcDuration, 1000 * 60 * 60);

    return () => clearInterval(inter);
  }, [time]);

  return <>{duration}</>;
}
