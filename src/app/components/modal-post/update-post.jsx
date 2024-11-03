"use client";

import "./css/modal-post.css";
import React, { useEffect, useCallback, useContext } from "react";
import { Row, Col, Input, Modal, Button, Select, Form, Spin } from "antd";
import axios from "axios";
import { OurBlogContext } from "@/app/ourblog/ourblog";

const { TextArea } = Input;

export default function UpdatePost({
  isModalUpdateOpen,
  setIsModalUpdateOpen,
  postId,
  setPostId,
}) {
  const [formComment] = Form.useForm();
  const { communitys, fetchingPosts } = useContext(OurBlogContext);

  const handleCancel = async (e) => {
    formComment.resetFields();
    setIsModalUpdateOpen(!isModalUpdateOpen);
    setPostId();
  };

  const handleSubmit = async (values) => {
    const data = formComment.getFieldsValue();

    try {
      const response = await axios.patch(`/api/post/${postId}`, data);

      formComment.resetFields();
      setPostId();
      setIsModalUpdateOpen(!isModalUpdateOpen);
      fetchingPosts(1);
    } catch (error) {
      console.error("Error update post data:", error);
    }
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const fetchPostData = useCallback(
    async (id) => {
      try {
        const { data } = await axios.get(`/api/post/${id}`);

        if (data.status.code === 200) {
          formComment.setFieldsValue({
            communityId: data.data.community.id,
            title: data.data.title,
            description: data.data.description,
          });
        }
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    },
    [formComment]
  );

  useEffect(() => {
    if (isModalUpdateOpen && postId) {
      fetchPostData(postId);
    }
  }, [isModalUpdateOpen, postId, fetchPostData]);

  return (
    <Modal
      title={`Edit Post`}
      open={isModalUpdateOpen}
      onCancel={handleCancel}
      maskClosable={false}
      centered
      footer={null}
    >
      <Form form={formComment} onFinish={handleSubmit}>
        <Spin spinning={false}>
          <Row gutter={8}>
            <Col xs={24} sm={24} md={10} lg={10}>
              <Form.Item
                name={"communityId"}
                rules={[
                  { required: true, message: "Please choose a community!" },
                ]}
              >
                <Select
                  placeholder="Choose a community"
                  optionFilterProp="label"
                  onChange={onChange}
                  style={{
                    width: "100%",
                    height: "40px",
                  }}
                  className="customSelect"
                  options={
                    communitys?.data?.length
                      ? communitys.data.map((e) => ({
                          value: e.id,
                          label: e.name,
                        }))
                      : []
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24}>
              <Form.Item
                name={"title"}
                rules={[{ required: true, message: "Please enter a title!" }]}
              >
                <Input
                  placeholder="Title"
                  style={{
                    height: "44px",
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24}>
              <Form.Item
                name={"description"}
                rules={[
                  { required: true, message: "Please enter a description!" },
                ]}
              >
                <TextArea placeholder="Description" rows={6} />
              </Form.Item>
            </Col>
          </Row>
        </Spin>
      </Form>
      <Row gutter={[8, 8]} style={{ justifyContent: "flex-end" }}>
        <Col xs={24} sm={24} md={5} lg={5}>
          <Button
            style={{
              width: "100%",
              color: "#49A569",
              height: "40px",
              borderRadius: "8px",
              borderColor: "#49A569",
              marginRight: "10px",
            }}
            onClick={() => {
              handleCancel();
            }}
          >
            Cancel
          </Button>
        </Col>
        <Col xs={24} sm={24} md={5} lg={5}>
          <Button
            type="primary"
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
            style={{
              width: "100%",
              color: "#FFFFFF",
              //   maxWidth: "105px",
              height: "40px",
              borderRadius: "8px",
              borderColor: "#49A569",
              backgroundColor: "#49A569",
            }}
          >
            Post
          </Button>
        </Col>
      </Row>
    </Modal>
  );
}
