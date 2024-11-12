import HeaderBar from "./header-bar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <HeaderBar />
      {children}
    </main>
  );
}
