"use client";

import { Layout, theme, Button, Typography, Col } from "antd";
import MainLayout from "../components/layout";
import Search from "../components/search/search";
import Card from "../components/card/card";
import { useSession } from "next-auth/react";

const { Title, Text, Paragraph } = Typography;
const { Content } = Layout;

export default function OurBlog({ posts }) {
  const { data: session, status } = useSession();
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
          //   minHeight: 280,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        {status === "loading" ? (
          <p>Loading...</p>
        ) : !session && status !== "loading" ? (
          <Col style={{ textAlign: "center", marginTop: "50px" }}>
            <Title level={3}>You need to be signed in to view this page.</Title>
          </Col>
        ) : (
          <Card posts={posts} isOurBlog={true} />
        )}
      </Content>
    </MainLayout>
  );
}
