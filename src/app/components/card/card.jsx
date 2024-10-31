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
export default function Card({ posts, isOurBlog }) {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  return (
    <>
      <Row
        gutter={[8, 8]}
        style={{
          background: "#FFFFFF",
          padding: "0px 10px",
          borderRadius: "12px",
          minHeight: 270,
          height: "100%",
          overflowY: "auto",
          alignContent: "space-between",
        }}
      >
        <Col span={24}>
          {posts?.data?.length &&
            posts?.data.map((e) => {
              return (
                <Col key={e.id} span={24}>
                  <Col
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <Col
                      span={12}
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div
                        className={styles.circle}
                        style={{ marginRight: "4px" }}
                      >
                        <Image
                          src="/images/1.jpeg"
                          alt="Circle Image"
                          width={31}
                          height={31}
                          className={styles.circleImage}
                        />
                      </div>
                      <Text style={{ color: "#939494" }}>
                        {e.user.userName}
                      </Text>
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
                        <Col>
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
                        </Col>
                      )}
                    </Col>
                  </Col>
                  <Col
                    span={24}
                    style={{
                      marginBottom: "5px",
                    }}
                  >
                    <Tag>{e.community.name}</Tag>
                  </Col>
                  <Col span={24}>
                    <Title level={5}>{e.title}</Title>
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
                      {e.description}
                    </Paragraph>
                  </Col>
                  <Col
                    span={24}
                    style={{
                      cursor: "pointer",
                      borderBottom: "1px solid #BBC2C0",
                      paddingBottom: "15px",
                    }}
                    onClick={() => router.push(`/post-detail/${1}`)}
                  >
                    <CommentOutlined
                      style={{ fontSize: "18px", marginRight: "4px" }}
                    />
                    <Text>{e.commentCount} Comments</Text>
                    <Text style={{ color: "blue" }}> Click! </Text>
                  </Col>
                </Col>
              );
            })}
        </Col>
        <Col style={{ width: "100%", justifyItems: "end" }}>
          <Pagination defaultCurrent={1} total={100} />
        </Col>
      </Row>

      <UpdatePost
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
      />
      <DeletePost
        isModalDeleteOpen={isModalDeleteOpen}
        setIsModalDeleteOpen={setIsModalDeleteOpen}
      />
    </>
  );
}
