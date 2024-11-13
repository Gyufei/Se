import { cn } from "@/lib/utils/common";

export default function PathBreadcrumb({ paths }: { paths: string[] }) {
  return (
    <div className="flex items-center">
      {paths.map((path, index) => {
        const isLast = index === paths.length - 1;
        return (
          <div
            key={index}
            className={cn(
              "flex items-center text-xl text-white font-medium",
              isLast ? "opacity-100" : "opacity-60",
            )}
          >
            <span>{path}</span>
            {!isLast && <div className="mx-2">/</div>}
          </div>
        );
      })}
    </div>
  );
}
