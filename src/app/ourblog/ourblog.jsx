"use client";

import React, { useState, createContext, useEffect } from "react";
import { Layout, theme, Button, Typography, Col, Pagination } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import MainLayout from "../components/layout";
import Search from "../components/search/search";
import Card from "../components/card/card";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

const { Title, Text, Paragraph } = Typography;
const { Content } = Layout;

export const OurBlogContext = createContext({});

export default function OurBlog({ communitys }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [searchTitle, setSearchTitle] = useState();
  const [searchCommunity, setSearchCommunity] = useState();
  const [tableParams, setTableParams] = useState();
  const { data: session, status } = useSession();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const fetchingPosts = async (newPage) => {
    try {
      const {
        data: { data: data, meta: meta },
      } = await axios.get("/api/user/post", {
        params: {
          page: newPage,
          title: searchTitle?.trim(),
          communityId:
            searchCommunity?.length === 0 ? undefined : searchCommunity,
        },
      });

      setPosts(data);
      setTableParams(meta);
    } catch (error) {
      console.error("Error fetching Posts:", error);
    }
  };

  useEffect(() => {
    fetchingPosts();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchTitle || searchCommunity) {
        fetchingPosts(1);
      } else if (searchTitle?.length === 0 || searchCommunity?.length === 0) {
        fetchingPosts(1);
      }
    }, 1000);

    return () => clearTimeout(delay);
  }, [searchTitle, searchCommunity]);

  const handlePageChange = async (newPage) => {
    try {
      await fetchingPosts(newPage);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };


  const contextValue = {
    communitys,
    fetchingPosts,
  };

  return (
    <MainLayout>
      <OurBlogContext.Provider value={contextValue}>
        <Search
          setSearchTitle={setSearchTitle}
          setSearchCommunity={setSearchCommunity}
        />
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
                <Pagination
                  align="end"
                  current={tableParams?.currentPage}
                  total={tableParams?.totalItems || 0}
                  pageSize={tableParams?.itemsPerPage || 10}
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
