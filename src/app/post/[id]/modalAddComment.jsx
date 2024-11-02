"use client";

import React, { useState } from "react";
import { Row, Col, Input, Modal, Button, Select, Form, Spin } from "antd";
import { useRouter } from "next/navigation";

const { TextArea } = Input;

export default function ModalAddComment({
  isModalOpen,
  setIsModalOpen,
  formComment,
  handleSubmit,
}) {
  const handleCancel = async (e) => {
    formComment.resetFields();
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Modal
      title={`Add Comments`}
      open={isModalOpen}
      onOk={formComment.submit}
      onCancel={handleCancel}
      maskClosable={false}
      centered
      footer={null}
    >
      <Form form={formComment} onFinish={handleSubmit}>
        <Spin spinning={false}>
          <Form.Item
            name={"text"}
            rules={[
              {
                required: true,
                message: "Please enter a comment!",
              },
            ]}
          >
            <TextArea rows={4} placeholder="What's on your mind..." />
          </Form.Item>
        </Spin>
      </Form>
      <Row style={{ marginTop: 24 }}>
        <Col span={24} style={{ marginBottom: "5px" }}>
          <Button
            style={{
              width: "100%",
              color: "#49A569",
              width: "100%",
              //   maxWidth: "105px",
              height: "40px",
              borderRadius: "8px",
              borderColor: "#49A569",
              // backgroundColor: "#49A569",
              marginRight: "10px",
            }}
            onClick={() => {
              formComment.resetFields();
              setIsModalOpen(!isModalOpen);
            }}
          >
            Cancel
          </Button>
        </Col>
        <Col span={24}>
          <Button
            type="primary"
            style={{
              width: "100%",
              color: "#FFFFFF",
              width: "100%",
              //   maxWidth: "105px",
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
      </Row>
    </Modal>
  );
}
