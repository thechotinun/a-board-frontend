"use client";

import { Layout, theme } from "antd";
import MainLayout from "./components/layout";
import Search from "./components/search/search";
import Card from "./components/card/card";

const { Content } = Layout;

export default function Home({ posts }) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <MainLayout>
      <Search />
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Card posts={posts} />
      </Content>
    </MainLayout>
  );
}
