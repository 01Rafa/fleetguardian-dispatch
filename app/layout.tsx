import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FleetGuardian Dispatch Services | U.S. Truck Dispatch Support",
  description:
    "FleetGuardian Dispatch Services provides practical dispatch support for owner-operators and small fleets. We help you find stronger loads, negotiate rates, and reduce daily stress."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
