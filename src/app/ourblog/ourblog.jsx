"use client";

import React, { createContext } from "react";
import { Layout, theme, Button, Typography, Col, Pagination } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import MainLayout from "../components/layout";
import Search from "../components/search/search";
import Card from "../components/card/card";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

const { Title, Text, Paragraph } = Typography;
const { Content } = Layout;

export const OurBlogContext = createContext({});

export default function OurBlog({ posts, communitys }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
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
      <OurBlogContext.Provider value={contextValue}>
        <Search />
        <Content
          style={{
            padding: "15px 24px",
            margin: 0,
            minHeight: 270,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {status === "loading" ? (
            <p>Loading...</p>
          ) : !session && status !== "loading" ? (
            <Col style={{ textAlign: "center", marginTop: "50px" }}>
              <Title level={3}>
                You need to be signed in to view this page.
              </Title>
            </Col>
          ) : session.error ? (
            <Col style={{ textAlign: "center", marginTop: "50px" }}>
              <Title level={3}>Please signin again.</Title>
              <Button
                icon={<LoginOutlined style={{ fontSize: "15px" }} />}
                style={{
                  color: "#FFFFFF",
                  width: "105px",
                  height: "40px",
                  borderRadius: "8px",
                  borderColor: "#49A569",
                  backgroundColor: "#49A569",
                }}
                onClick={() => router.push("/signin")}
              >
                Sign In
              </Button>
            </Col>
          ) : (
            <>
              <Card posts={posts} isOurBlog={true} />
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
            </>
          )}
        </Content>
      </OurBlogContext.Provider>
    </MainLayout>
  );
}
