"use client";

import { Layout, theme } from "antd";
import MainLayout from "../component/layout";
import Search from "../component/search/search";


const { Content } = Layout;

export default function OurBlog() {
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
            <span>ourblog</span>
          </Content>
    </MainLayout>
  );
}
