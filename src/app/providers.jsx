"use client";

import { SessionProvider } from "next-auth/react";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export default function ProviderWrapper({ children }) {
  return (
    <AntdRegistry>
      <SessionProvider>{children}</SessionProvider>
    </AntdRegistry>
  );
}