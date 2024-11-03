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

export default function Card({ posts, isOurBlog }) {
  const router = useRouter();
  const [postId, setPostId] = useState();
  const [expanded, setExpanded] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  return (
    <>
      <Row
        gutter={[8, 8]}
        style={{
          background: "#FFFFFF",
          padding: "5px 10px 10px 10px",
          borderRadius: "12px",
          height: "90%",
          overflowY: "auto",
          // alignContent: "space-between",
        }}
      >
        <Col span={24}>
          {posts?.data?.length ? (
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
                        {e.user.userName === "admin" ||
                        e.user.userName === "test" ? (
                          <Image
                            src={`/images/${e.user.userName}.jpeg`}
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
                      </div>
                      <Text style={{ color: "#939494", fontWeight: "bold" }}>
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
                              setPostId(e.id);
                              setIsModalUpdateOpen(!isModalUpdateOpen);
                            }}
                          />
                          <DeleteOutlined
                            style={{ fontSize: "18px", color: "red" }}
                            onClick={() => {
                              setPostId(e.id);
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
                      }}
                    >
                      {e.description}
                    </Paragraph>
                  </Col>
                  <Col
                    span={24}
                    style={{
                      borderBottom: "1px solid #BBC2C0",
                      paddingBottom: "15px",
                    }}
                  >
                    <CommentOutlined
                      style={{ fontSize: "18px", marginRight: "4px" }}
                    />
                    <Text style={{ color: "#939494" }}>
                      {e.commentCount} Comments
                    </Text>
                    <Text
                      style={{ color: "blue", cursor: "pointer" }}
                      onClick={() => router.push(`/post/${e.id}`)}
                    >
                      {" "}
                      Click!{" "}
                    </Text>
                  </Col>
                </Col>
              );
            })
          ) : (
            <>
              <Col>
                <Text style={{ color: "#939494" }}>
                  No Post
                </Text>
              </Col>
            </>
          )}
        </Col>
      </Row>

      <UpdatePost
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        postId={postId}
        setPostId={setPostId}
      />
      <DeletePost
        isModalDeleteOpen={isModalDeleteOpen}
        setIsModalDeleteOpen={setIsModalDeleteOpen}
        postId={postId}
        setPostId={setPostId}
      />
    </>
  );
}
