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
  const [expanded, setExpanded] = useState(false);

  return (
    <Row
      gutter={[8, 8]}
      style={{
        background: "#FFFFFF",
        padding: "15px 10px",
        borderRadius: "12px",
        // maxHeight: "50%",
        // maxHeight: "calc(65vh - 150px)",
        // overflowY: "auto",
      }}
    >
      {data?.length &&
        data.map((e) => {
          return (
            <React.Fragment key={e.id}>
              <Col span={24} style={{ display: "flex", alignItems: "center" }}>
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
                <Text style={{ marginLeft: "5px" ,color: "#000000" }}>
                  {e?.user?.userName}{" "}
                  <Text style={{ color: "#939494" }}>
                    {" "}
                    {dayjs(data?.createdDate).fromNow()}{" "}
                  </Text>
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
                  {e?.text}
                </Paragraph>
              </Col>
            </React.Fragment>
          );
        })}
    </Row>
  );
}
