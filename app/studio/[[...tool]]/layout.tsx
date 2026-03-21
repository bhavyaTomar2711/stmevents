export const metadata = {
  title: "STM Events CMS",
  description: "Content management for STM Events",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div style={{ height: "100vh" }}>{children}</div>;
}
