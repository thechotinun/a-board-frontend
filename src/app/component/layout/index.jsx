"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import {
  HomeOutlined,
  FormOutlined,
  ArrowRightOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  theme,
  Typography,
  Grid,
  Button,
  Drawer,
  Col,
} from "antd";
import Link from "next/link";
import { Castoro } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";

const { Header, Content, Sider } = Layout;
const { useBreakpoint } = Grid;

const items = [
  {
    key: "/",
    icon: <HomeOutlined style={{ fontSize: "20px" }} />,
    label: (
      <Link href="/" style={{ fontSize: "17px" }}>
        Home
      </Link>
    ),
  },
  {
    key: "/ourblog",
    icon: <FormOutlined style={{ fontSize: "20px" }} />,
    label: (
      <Link href="/ourblog" style={{ fontSize: "17px" }}>
        Our Blog
      </Link>
    ),
  },
];

const { Title, Text, Paragraph } = Typography;
const castoro = Castoro({ subsets: ["latin"], weight: "400", style: "italic" });

export default function MainLayout({ children }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const screens = useBreakpoint();
  const [screenMD, setScreenMD] = useState("20%");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    if (!screens.md && screens.md != undefined) {
      setScreenMD("0");
    } else {
      setScreenMD("20%");
    }
  }, [screens.md]);

  return (
    <Layout style={{ height: "100%" }}>
      <Header
        className={styles.mainHeader}
        style={{
          backgroundColor: "#243831",
          padding: "0 30px",
          justifyContent: "space-between",
        }}
      >
        <Title
          level={3}
          style={{
            color: "#FFFFFF",
            fontFamily: castoro.style.fontFamily,
            marginBottom: 0,
          }}
        >
          <Link href="/" style={{ color: "#FFFFFF" }}>
            a Board
          </Link>
        </Title>
        {screens.md ? (
          <Button
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
        ) : (
          <MenuOutlined
            style={{ color: "#FFFFFF" }}
            onClick={() => {
              setOpen(!open);
            }}
          />
        )}
        <Drawer
          title={
            <Col
              style={{
                textAlign: "right",
              }}
            >
              <Button
                style={{
                  color: "#FFFFFF",
                  height: "35px",
                  borderRadius: "8px",
                  borderColor: "#49A569",
                  backgroundColor: "#49A569",
                }}
                onClick={() => router.push("/signin")}
              >
                Sign In
              </Button>
            </Col>
          }
          closeIcon={<ArrowRightOutlined style={{ color: "#FFFFFF" }} />}
          onClose={() => {
            setOpen(!open);
          }}
          open={open}
          width={280}
          style={{ backgroundColor: "#243831" }}
        >
          <Col style={{ height: "40px", cursor: "pointer" }}>
            <HomeOutlined
              style={{ color: "#FFFFFF", fontSize: "18px", marginRight: "5px" }}
            />{" "}
            <Link href="/" style={{ fontSize: "17px", color: "#FFFFFF" }}>
              Home
            </Link>
          </Col>
          <Col style={{ height: "40px", cursor: "pointer" }}>
            <FormOutlined
              style={{ color: "#BBC2C0", fontSize: "18px", marginRight: "5px" }}
            />{" "}
            <Link
              href="/ourblog"
              style={{ fontSize: "17px", color: "#FFFFFF" }}
            >
              Our Blog
            </Link>
          </Col>
        </Drawer>
      </Header>
      <Layout style={{ width: "100%", background: "#BBC2C0" }}>
        <Sider
          width={"20%"}
          breakpoint="md"
          collapsedWidth="0"
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={[pathname]}
            style={{
              height: "100%",
              borderRight: 0,
              width: "100%",
              paddingTop: "20px",
              background: "#BBC2C0",
              borderInlineEnd: "unset",
              fontSize: "16px",
            }}
            items={items}
          />
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
            marginRight: screenMD,
            background: "#BBC2C0",
          }}
        >
          {children}
        </Layout>
      </Layout>
    </Layout>
  );
}
