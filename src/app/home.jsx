"use client";

import React, { createContext } from "react";
import { Layout, theme } from "antd";
import MainLayout from "./components/layout";
import Search from "./components/search/search";
import Card from "./components/card/card";

const { Content } = Layout;

export const HomeContext = createContext({});

export default function Home({ posts, communitys }) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const contextValue = {
    communitys,
  };


  return (
    <MainLayout>
      <HomeContext.Provider value={contextValue}>
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
      </HomeContext.Provider>
    </MainLayout>
  );
}
