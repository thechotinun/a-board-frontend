"use client";

import React, { useState } from "react";
import { Row, Col, Input, Select, Button, Typography, Tag } from "antd";
import {
  SearchOutlined,
  CommentOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./comments.module.css";

const { Paragraph, Title, Text } = Typography;

export default function Comments() {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);

  return (
    <Row
      gutter={[8, 8]}
      style={{
        background: "#FFFFFF",
        padding: "15px 10px",
        borderRadius: "12px",
      }}
    >
      <Col span={24} style={{ display: "flex", alignItems: "center" }}>
        <div
          className={styles.circle}
          style={{ marginRight: "4px", background: "#939494" }}
        >
          <UserOutlined style={{ fontSize: "20px" }} />
        </div>
        <Text style={{ color: "#000000" }}>
          Wittawat <Text style={{ color: "#939494" }}> 12h ago</Text>
        </Text>
      </Col>
      <Col offset={1} span={23}>
        <Paragraph
          ellipsis={{
            rows: 2,
            expandable: "collapsible",
            expanded,
            onExpand: (_, info) => setExpanded(info.expanded),
          }}
        >
          Lorem ipsum dolor sit amet consectetur. Purus cursus vel est a pretium
          quam imperdiet. Tristique auctor sed semper nibh odio iaculis sed
          aliquet. Amet mollis eget morbi feugiat mi risus eu. Tortor sed
          sagittis convallis auctor.
        </Paragraph>
      </Col>
    </Row>
  );
}
