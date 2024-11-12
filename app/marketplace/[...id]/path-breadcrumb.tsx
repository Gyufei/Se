import { cn } from "@/lib/utils/common";

export function PathBreadcrumb({ paths }: { paths: string[] }) {
  return (
    <div className="flex items-center">
      {paths.map((path, index) => {
        const isLast = index === paths.length - 1;
        return (
          <div
            key={index}
            className={cn(
              "flex items-center text-xl text-white",
              isLast ? "opacity-100" : "opacity-60",
            )}
          >
            <div>{path}</div>
            {!isLast && <div className="mx-2">/</div>}
          </div>
        );
      })}
    </div>
  );
}
