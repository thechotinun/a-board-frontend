"use client";

import { SessionProvider } from "next-auth/react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer } = Layout;
const items = new Array(3).fill(null).map((_, index) => ({
  key: String(index + 1),
  label: `nav ${index + 1}`,
}));

export default function ProviderWrapper({ children }) {
  return (
    <AntdRegistry>
      <SessionProvider>{children}</SessionProvider>
    </AntdRegistry>
  );
}