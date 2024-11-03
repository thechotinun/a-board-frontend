"use client";

import React, { useState, useEffect } from "react";
import { Form, Input, Button, Typography, Row, Col, Tag, Grid, Modal } from "antd";
import Image from "next/image";
import { LeftCircleOutlined, CommentOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Comments from "./comments";
import ModalAddComment from "./modalAddComment";
import styles from "./comments.module.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import axios from "axios";
import { useSession } from "next-auth/react";

const { Paragraph, Title, Text } = Typography;
const { TextArea } = Input;
const { useBreakpoint } = Grid;
dayjs.extend(relativeTime);

export default function Detail({ post, comment }) {
  const { data } = post;
  const router = useRouter();
  const [formComment] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenTextArea, setIsOpenTextArea] = useState(false);
  const screens = useBreakpoint();
  const [screenMD, setScreenMD] = useState("20%");
  const { data: session, status } = useSession();

  const warning = () => {
    return Modal.warning({
      title: "Please Sign In.",
      content: "You must be signin in to use this.",
      centered: true,
    });
  };
  

  const handleSubmit = async (values) => {
    if (!session || session?.error === "AccessTokenError") return warning();
    const dataForm = formComment.getFieldsValue();

    try {
      const response = await axios.post(
        `/api/post/${data.id}/comment`,
        dataForm
      );
      formComment.resetFields();
      router.refresh();
      if (screenMD === "0") {
        setIsModalOpen(!isModalOpen);
      } else {
        setIsOpenTextArea(!isOpenTextArea);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  useEffect(() => {
    if (!screens.md && screens.md != undefined) {
      setScreenMD("0");
    } else {
      setScreenMD("20%");
    }
  }, [screens.md]);

  return (
    <>
      <Row style={{ height: "100%", width: "100%", backgroundColor: "#FFFFFF" }}>
        <Col
          //   xs={{ push: 1, span: 22, pull: 1 }}
          //   md={{ push: 3, span: 18, pull: 3 }}
          // style={{ backgroundColor: "green" }}
          xs={{ offset: 1, span: 22 }}
          md={{ offset: 3, span: 18 }}
          style={{ height: "100%", width: "100%", backgroundColor: "FFFFFF" }}
        >
          <Row>
            <Col style={{ height: "100%", width: "100%" }}>
              <Col>
                <Col style={{ marginTop: "30px", marginBottom: "20px" }}>
                  <LeftCircleOutlined style={{ fontSize: "31px", color: "#7eb78f" }} onClick={() => router.push(`/`)} />
                </Col>
                <Col
                  span={24}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <div className="circle" style={{ marginRight: "4px" }}>
                    {data?.user?.userName === "test" ||
                    data?.user?.userName === "admin" ? (
                      <Image
                        src={`/images/${data?.user?.userName}.jpeg`}
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
                  <Text style={{ color: "#000000", marginRight: "5px", fontWeight: "bold" }}>
                    {data?.user?.userName}
                  </Text>
                  <Text style={{ color: "#939494" }}>
                    {dayjs(data?.createdDate).fromNow()}
                  </Text>
                </Col>
                <Col span={24}>
                  <Tag>{data?.community?.name}</Tag>
                </Col>
                <Col span={24}>
                  <Title level={5}>{data?.title}</Title>
                </Col>
                <Col span={24} style={{ maxHeight: 200, overflowY: "auto" }}>
                  <Paragraph>{data?.description}</Paragraph>
                </Col>
                <Col span={24} style={{ marginBottom: "15px" }}>
                  <CommentOutlined
                    style={{ fontSize: "18px", marginRight: "4px" }}
                  />
                  <Text style={{ color: "#939494" }} >{data?.commentCount} Comments</Text>
                </Col>
                {!isOpenTextArea ? (
                  <Col span={24}>
                    <Button
                      style={{
                        color: "#49A569",
                        width: "100%",
                        maxWidth: "132px",
                        height: "40px",
                        borderRadius: "8px",
                        borderColor: "#49A569",
                        // backgroundColor: "#49A569",
                        marginRight: "10px",
                      }}
                      onClick={() => {
                        if (screenMD === "0") {
                          setIsModalOpen(!isModalOpen);
                        } else {
                          setIsOpenTextArea(!isOpenTextArea);
                        }
                      }}
                    >
                      Add Comments
                    </Button>
                  </Col>
                ) : (
                  <>
                    <Col span={24}>
                      <Form form={formComment} onFinish={handleSubmit}>
                        <Form.Item
                          name={"text"}
                          rules={[
                            {
                              required: true,
                              message: "Please enter a comment!",
                            },
                          ]}
                        >
                          <TextArea
                            rows={4}
                            placeholder="What's on your mind..."
                          />
                        </Form.Item>
                      </Form>
                    </Col>
                    <Col span={24} style={{ textAlign: "right" }}>
                      <Button
                        style={{
                          color: "#49A569",
                          width: "100%",
                          maxWidth: "105px",
                          height: "40px",
                          borderRadius: "8px",
                          borderColor: "#49A569",
                          marginRight: "10px",
                        }}
                        onClick={() => {
                          formComment.resetFields();
                          setIsOpenTextArea(!isOpenTextArea);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        style={{
                          color: "#FFFFFF",
                          width: "100%",
                          maxWidth: "105px",
                          height: "40px",
                          borderRadius: "8px",
                          borderColor: "#49A569",
                          backgroundColor: "#49A569",
                        }}
                        onClick={() => {
                          formComment
                            .validateFields()
                            .then(() => {
                              formComment.submit();
                            })
                            .catch((errorInfo) => {
                              console.log("Validation Failed:", errorInfo);
                            });
                        }}
                      >
                        Post
                      </Button>
                    </Col>
                  </>
                )}
              </Col>
              <Col>
                <Comments comment={comment} />
              </Col>
              
            </Col>
          </Row>
        </Col>
      </Row>
      <ModalAddComment
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        formComment={formComment}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
