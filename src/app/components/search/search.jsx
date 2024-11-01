"use client";

import "./css/search.css";
import React, { useState } from "react";
import { Row, Col, Input, Select, Button, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import CreatePost from "../modal-post/create-post";
import { useSession } from "next-auth/react";

export default function Search() {
  const { data: session, status } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenInpSearch, setIsOpenInpSearch] = useState(false);
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const warning = () => {
    return Modal.warning({
      title: "Please Sign In.",
      content: "You must be signin in to use this.",
      centered: true,
    });
  };

  return (
    <Row
      gutter={[16, 8]}
      style={{ alignItems: "center", marginTop: "25px", marginBottom: "25px" }}
    >
      <Col xs={10} sm={14} md={12} lg={15}>
        <Input
          style={{ background: "unset" }}
          prefix={
            <SearchOutlined
              style={{ fontSize: "18px" }}
              onClick={() => {
                setIsOpenInpSearch(!isOpenInpSearch);
              }}
            />
          }
          placeholder="Search"
          allowClear
        />
      </Col>

      <Col xs={7} sm={6} md={7} lg={5} style={{ textAlign: "right" }}>
        <Select
          placeholder="Community"
          optionFilterProp="label"
          onChange={onChange}
          style={{
            width: "100%",
            maxWidth: "128px",
          }}
          options={[
            {
              value: "jack",
              label: "Jack",
            },
            {
              value: "lucy",
              label: "Lucy",
            },
            {
              value: "tom",
              label: "Tom",
            },
          ]}
        />
      </Col>
      <Col xs={7} sm={4} md={5} lg={4} style={{ textAlign: "right" }}>
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
            if (!session) return warning();
            setIsModalOpen(!isModalOpen);
          }}
        >
          Create +
        </Button>
      </Col>
      <CreatePost isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </Row>
  );
}
