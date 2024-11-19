import GlobalMessageTip from "@/components/share/global-message-tip";
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

      <GlobalMessageTip />
    </main>
  );
}
