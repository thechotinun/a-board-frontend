"use client";

import React from "react";
import { Layout, theme } from "antd";
import MainLayout from "@/app/components/layout";
import Detail from "./detail";

const { Content } = Layout;

export default function Post({post}) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <MainLayout>
      <Content
        style={{
          padding: 0,
          margin: 0,
          minHeight: 280,
          background: colorBgContainer,
        }}
      >
        <Detail post={post}/>
      </Content>
    </MainLayout>
  );
}