"use client";

import React, { useState } from "react";
import { Row, Col, Typography, Tag, Pagination } from "antd";
import {
  SearchOutlined,
  CommentOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import UpdatePost from "../modal-post/update-post";
import DeletePost from "../modal-post/delete-post";
import styles from "./card-post.module.css";

const { Paragraph, Title, Text } = Typography;
const item = [1, 2, 3, 4];
export default function Card({ isOurBlog }) {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  return (
    <Row
      gutter={[8, 8]}
      style={{
        background: "#FFFFFF",
        marginTop: "20px",
        padding: "15px 10px",
        borderRadius: "12px",
        minHeight: 270,
        height: "100%",
        overflowY: "auto",
      }}
    >
      {item?.length &&
        item.map((e) => {
          return (
            <React.Fragment key={e}>
              <Col span={12} style={{ display: "flex", alignItems: "center" }}>
                <div className={styles.circle} style={{ marginRight: "4px" }}>
                  <Image
                    src="/images/1.jpeg"
                    alt="Circle Image"
                    width={31}
                    height={31}
                    className={styles.circleImage}
                  />
                </div>
                <Text style={{ color: "#939494" }}>Wittawat</Text>
              </Col>
              <Col
                span={12}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                {isOurBlog && (
                  <>
                    <EditOutlined
                      style={{ marginRight: "15px", fontSize: "18px" }}
                      onClick={() => {
                        setIsModalUpdateOpen(!isModalUpdateOpen);
                      }}
                    />
                    <DeleteOutlined
                      style={{ fontSize: "18px", color: "red" }}
                      onClick={() => {
                        setIsModalDeleteOpen(!isModalDeleteOpen);
                      }}
                    />
                  </>
                )}
              </Col>
              <Col span={24}>
                <Tag>History</Tag>
              </Col>
              <Col span={24}>
                <Title level={5}>The Beginning of the End of the World</Title>
              </Col>
              <Col span={24}>
                <Paragraph
                  ellipsis={{
                    rows: 2,
                    expandable: "collapsible",
                    expanded,
                    onExpand: (_, info) => setExpanded(info.expanded),
                  }}
                >
                  The afterlife sitcom The Good Place comes to its culmination,
                  the show’s two protagonists, Eleanor and Chidi, contemplate
                  their future. Having lived thousands upon thousands of
                  lifetimes together, and having experienced virtually
                  everything this life has to offer, they are weary. It is time
                  for it all to end. The show’s solution to this perpetual
                  happiness-cum-weariness is extinction. When you have had
                  enough, when you are utterly sated by love and joy and
                  pleasure, you can walk through a passage to nothingness. And
                  Chidi has had enough.
                </Paragraph>
              </Col>
              <Col
                span={24}
                style={{ cursor: "pointer", borderBottom: "1px solid #BBC2C0" }}
                onClick={() => router.push(`/post-detail/${1}`)}
              >
                <CommentOutlined
                  style={{ fontSize: "18px", marginRight: "4px" }}
                />
                <Text>32 Comments</Text>
                <Text style={{ color: "blue" }}> Click! </Text>
              </Col>
            </React.Fragment>
          );
        })}
      <Col style={{ width: "100%", justifyItems: "end" }}>
        <Pagination defaultCurrent={1} total={100} />
      </Col>

      <UpdatePost
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
      />
      <DeletePost
        isModalDeleteOpen={isModalDeleteOpen}
        setIsModalDeleteOpen={setIsModalDeleteOpen}
      />
    </Row>
  );
}
