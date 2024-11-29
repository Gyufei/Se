export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-[478px] bg-[#1D0E27] pt-12 pb-10 min-h-[calc(100vh-64px)]">
      {children}
    </div>
  );
}
