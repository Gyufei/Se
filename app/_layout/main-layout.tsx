import HeaderBar from "./header-bar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen overflow-hidden">
      <HeaderBar />
      <div className="h-[calc(100vh-64px)]">{children}</div>
    </div>
  );
}
