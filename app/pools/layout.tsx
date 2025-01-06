import PoolsContent from "./pools-content";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-0 flex w-full px-4 md:mx-auto md:min-w-[1440px] md:max-w-[1920px] md:px-0">
      <PoolsContent />
      {children}
    </div>
  );
}
