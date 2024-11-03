"use client";

import React, { createContext } from "react";
import { Layout, theme, Col, Pagination } from "antd";
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
            padding: "15px 24px",
            margin: 0,
            minHeight: 210,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Card posts={posts} />
          <Col style={{ width: "100%", justifyItems: "end", height: "10%", alignContent: "end" }}>
            <Pagination align="end" defaultCurrent={1} total={100} showSizeChanger={false}/>
          </Col>
        </Content>
      </HomeContext.Provider>
    </MainLayout>
  );
}
