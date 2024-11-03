"use client";

import React, { createContext } from "react";
import { Layout, theme, Col, Pagination } from "antd";
import MainLayout from "./components/layout";
import Search from "./components/search/search";
import Card from "./components/card/card";
import { useRouter, useSearchParams } from "next/navigation";

const { Content } = Layout;

export const HomeContext = createContext({});

export default function Home({ posts, communitys }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const contextValue = {
    communitys,
  };

  const handlePageChange = async (newPage) => {
    const title = searchParams.get("title");
    const newUrl = title
      ? `?page=${newPage}&title=${title}`
      : `?page=${newPage}`;

    try {
      router.push(newUrl);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
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
          <Col
            style={{
              width: "100%",
              justifyItems: "end",
              height: "10%",
              alignContent: "end",
            }}
          >
            {/* <Pagination align="end" defaultCurrent={1} total={100} showSizeChanger={false}/> */}
            <Pagination
              align="end"
              current={posts?.meta?.currentPage}
              total={posts?.meta?.totalItems || 0}
              pageSize={posts?.meta?.itemsPerPage || 10}
              showSizeChanger={false}
              onChange={handlePageChange}
            />
          </Col>
        </Content>
      </HomeContext.Provider>
    </MainLayout>
  );
}
