"use client";

import "./css/modal-post.css";
import React, { useState } from "react";
import { Row, Col, Input, Modal, Button, Select, Form, Spin } from "antd";
import { useRouter } from "next/navigation";

const { TextArea } = Input;

export default function DeletePost({
  isModalDeleteOpen,
  setIsModalDeleteOpen,
}) {
  const router = useRouter();
  const [formComment] = Form.useForm();
  const [modal, contextHolder] = Modal.useModal();

  const handleCancel = async (e) => {
    setIsModalDeleteOpen(!isModalDeleteOpen);
  };

  const handleSubmit = async (values) => {
    console.log(values);
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <Modal
      title={`Please confirm if you wish to delete the post`}
      open={isModalDeleteOpen}
      onOk={formComment.submit}
      onCancel={handleCancel}
      maskClosable={false}
      centered
      footer={null}
      width={343}
    >
      <Form form={formComment} onFinish={handleSubmit}>
        <Spin spinning={false}>
          <p>{`Are you sure you want to delete the post? Once deleted, it cannot be recovered.`}</p>
        </Spin>
      </Form>
      <Row gutter={[8, 8]} style={{marginTop: "10px"}}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Button
            style={{
              width: "100%",
              color: "#000000",
              height: "40px",
              borderRadius: "8px",
              borderColor: "#DADADA",
              marginRight: "10px",
            }}
            onClick={() => {
              setIsModalDeleteOpen(!isModalDeleteOpen);
            }}
          >
            Cancel
          </Button>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Button
            type="primary"
            danger
            onClick={handleSubmit}
            style={{
              width: "100%",
              color: "#FFFFFF",
              height: "40px",
              borderRadius: "8px",
            }}
          >
            Delete
          </Button>
        </Col>
      </Row>
    </Modal>
  );
}
