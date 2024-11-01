"use client";

import "./css/modal-post.css";
import React, { useContext } from "react";
import { Row, Col, Input, Modal, Button, Select, Form, Spin } from "antd";
import { useRouter } from "next/navigation";
import { HomeContext } from "@/app/home";

const { TextArea } = Input;

export default function CreatePost({ isModalOpen, setIsModalOpen }) {
  const router = useRouter();
  const [formComment] = Form.useForm();
  const [modal, contextHolder] = Modal.useModal();

  const { communitys } = useContext(HomeContext);

  const handleCancel = async (e) => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = async (values) => {
    console.log(values);
    console.log(formComment.getFieldsValue());
    
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <Modal
      title={`Create Post`}
      open={isModalOpen}
      onOk={formComment.submit}
      onCancel={handleCancel}
      maskClosable={false}
      centered
      footer={null}
    >
      <Form form={formComment} onFinish={handleSubmit}>
        <Spin spinning={false}>
          <Row gutter={8}>
            <Col xs={24} sm={24} md={10} lg={10}>
              <Form.Item name={"community"}>
                <Select
                  placeholder="Choose a communityId"
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
              <Form.Item name={"title"}>
                <Input
                  placeholder="Title"
                  style={{
                    height: "44px",
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24}>
              <Form.Item name={"description"}>
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
              //   maxWidth: "105px",
              height: "40px",
              borderRadius: "8px",
              borderColor: "#49A569",
              marginRight: "10px",
            }}
            onClick={() => {
              setIsModalOpen(!isModalOpen);
            }}
          >
            Cancel
          </Button>
        </Col>
        <Col xs={24} sm={24} md={5} lg={5}>
          <Button
            type="primary"
            onClick={handleSubmit}
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
