import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils/common";
import { useRouter } from "next/navigation";

export default function PathBreadcrumb({
  paths,
  isLoadings,
  href,
  className,
}: {
  paths: string[];
  isLoadings?: boolean[];
  href?: (string | null)[];
  className?: string;
}) {
  const router = useRouter();

  function handleClick(idx: number) {
    if (!href || !href[idx]) return;

    router.push(href[idx]);
  }

  return (
    <div className="flex items-center">
      {paths.map((path, index) => {
        const isLast = index === paths.length - 1;
        const isLoading = isLoadings?.[index];

        return isLoading ? (
          <Skeleton className="w-24 h-6" />
        ) : (
          <div
            key={index}
            className={cn(
              "flex items-center text-xl text-white font-medium",
              isLast ? "opacity-100" : "opacity-60",
              href?.[index] ? "cursor-pointer" : "",
              className,
            )}
            onClick={() => handleClick(index)}
          >
            <span>{path}</span>
            {!isLast && <div className="mx-2">/</div>}
          </div>
        );
      })}
    </div>
  );
}
