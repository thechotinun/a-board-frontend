"use client";

import "./globals.css";
import { signIn } from "next-auth/react";
import { Form, Input, Button, Col, Row, Typography } from "antd";
import Image from "next/image";
import { Castoro } from "next/font/google";
import styles from "./page.module.css";

const { Title, Text, Paragraph, Link } = Typography;
const castoro = Castoro({ subsets: ["latin"], weight: "400", style: "italic" });

export default function Signin() {

  const onFinish = async (values) => {
    try {
      const result = await signIn("credentials", {
        userName: values.userName,
        redirect: false,
      });

      if (result?.error) {
        console.error("Login failed:", result.error);
      } else {
        console.log(result)
        // Login successful, redirect or handle success
        window.location.href = "/"; // or use next/navigation
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <Row
      style={{
        height: "100%",
        background: "#243831",
        flexWrap: "wrap-reverse",
      }}
    >
      <Col
        xs={24}
        sm={24}
        md={14}
        lg={14}
        justify="center"
        align="middle"
        className={styles.leftCol}
      >
        <Form autoComplete="off" onFinish={onFinish} style={{ maxWidth: "500px", padding: "0 10px" }}>
          <Col style={{textAlign: "left"}}>
            <Title level={2} style={{ color: "#FFFFFF" }}>
              Sign in
            </Title>
          </Col>
          <Form.Item name={"userName"}>
            <Input
              placeholder="Username"
              style={{
                height: "44px",
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: "100%",
                height: "40px",
                background: "#49A569",
              }}
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col
        xs={24}
        sm={24}
        md={10}
        lg={10}
        justify="center"
        align="middle"
        className={styles.rightCol}
      >
        <Col>
          <Image
            src="/images/loginlogo.png"
            alt="Login logo"
            width={300}
            height={230}
          />
        </Col>
        <Col>
          <Title
            level={2}
            style={{
              color: "#FFFFFF",
              fontFamily: castoro.style.fontFamily,
            }}
          >
            a Board
          </Title>
        </Col>
      </Col>
    </Row>
  );
}
