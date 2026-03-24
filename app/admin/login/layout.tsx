// Login page has its own layout to bypass admin auth check
export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
