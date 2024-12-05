"use client";

import React, { useState, createContext, useEffect, useRef } from "react";
import { Layout, theme, Col, Pagination, Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import MainLayout from "./components/layout";
import Search from "./components/search/search";
import Card from "./components/card/card";
import axios from "axios";

const { Content } = Layout;

export const HomeContext = createContext({});

export default function Home({ communitys }) {
  const [posts, setPosts] = useState([]);
  const [searchTitle, setSearchTitle] = useState();
  const [searchCommunity, setSearchCommunity] = useState();
  const [tableParams, setTableParams] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const pollingInterval = useRef();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const fetchingPosts = async (newPage) => {
    try {
      setIsLoading(true);
      const {
        data: { data: data, meta: meta },
      } = await axios.get("/api/post", {
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
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch when component mounts
  useEffect(() => {
    fetchingPosts(1); // Fetch first time
  }, []);

  // Polling setup
  useEffect(() => {
    pollingInterval.current = setInterval(() => {
      fetchingPosts(tableParams?.currentPage);
    }, 30000); // Poll every 30 seconds

    return () => clearInterval(pollingInterval.current);
  }, [searchTitle, searchCommunity, tableParams?.currentPage]);

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

  const handleManualRefresh = () => {
    fetchingPosts(tableParams?.currentPage);
  }

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
      <HomeContext.Provider value={contextValue}>
        <Search
          setSearchTitle={setSearchTitle}
          setSearchCommunity={setSearchCommunity}
        />
        <Content
          style={{
            padding: "15px 24px",
            margin: 0,
            minHeight: 210,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Card posts={posts} handleManualRefresh={handleManualRefresh} isLoading={isLoading}/>
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
        </Content>
      </HomeContext.Provider>
    </MainLayout>
  );
}
