"use client";

import React, { createContext } from "react";
import { Layout, theme, Button, Typography, Col } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import MainLayout from "../components/layout";
import Search from "../components/search/search";
import Card from "../components/card/card";
import { useSession } from "next-auth/react";

const { Title, Text, Paragraph } = Typography;
const { Content } = Layout;

export const OurBlogContext = createContext({});

export default function OurBlog({ posts, communitys }) {
  const { data: session, status } = useSession();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const contextValue = {
    communitys,
  };

  return (
    <MainLayout>
      <OurBlogContext.Provider value={contextValue}>
        <Search />
        <Content
          style={{
            padding: 24,
            margin: 0,
            //   minHeight: 280,
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
            <Card posts={posts} isOurBlog={true} />
          )}
        </Content>
      </OurBlogContext.Provider>
    </MainLayout>
  );
}
