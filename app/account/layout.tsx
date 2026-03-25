import AccountAuthGate from "./AccountAuthGate";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return <AccountAuthGate>{children}</AccountAuthGate>;
}
