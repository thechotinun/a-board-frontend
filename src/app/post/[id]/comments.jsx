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
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const { Paragraph, Title, Text } = Typography;
dayjs.extend(relativeTime);

export default function Comments({ comment }) {
  const { data } = comment;
  const [expandedState, setExpandedState] = useState({});

  const handleExpand = (commentId, info) => {
    setExpandedState(prev => ({
      ...prev,
      [commentId]: info.expanded
    }));
  };

  return (
    <Row
      gutter={[8, 8]}
      style={{
        background: "#FFFFFF",
        padding: "15px 10px",
        borderRadius: "12px",
      }}
    >
      {data?.length
        ? data.map((e) => {
            return (
              <React.Fragment key={e.id}>
                <Col
                  span={24}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {e?.user?.userName === "test" ||
                  e?.user?.userName === "admin" ? (
                    <Image
                      src={`/images/${e?.user?.userName}.jpeg`}
                      alt="Circle Image"
                      width={31}
                      height={31}
                      className={styles.circleImage}
                    />
                  ) : (
                    <Image
                      src="/images/default.png"
                      alt="Circle Image"
                      width={31}
                      height={31}
                      className={styles.circleImage}
                    />
                  )}
                  <Text style={{ marginLeft: "5px", color: "#000000", fontWeight: "bold" }}>
                    {e?.user?.userName}{" "}
                    <Text style={{ color: "#939494", fontWeight: "normal" }}>
                      {" "}
                      {dayjs(e?.createdDate).fromNow()}{" "}
                    </Text>
                  </Text>
                </Col>
                <Col offset={1} span={23}>
                  <Paragraph
                    ellipsis={{
                      rows: 2,
                      expandable: "collapsible",
                      expanded: expandedState[e.id] || false,
                      onExpand: (_, info) => handleExpand(e.id, info)
                    }}
                  >
                    {e?.text}
                  </Paragraph>
                </Col>
              </React.Fragment>
            );
          })
        : ""}
    </Row>
  );
}