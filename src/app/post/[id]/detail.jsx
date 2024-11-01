"use client";

import React from "react";
import { Col, Row } from "antd";

export default function Detail({}) {
  return (
    <>
      <Row>
        <Col
          xs={{ push: 1, span: 22, pull: 1  }}
          md={{ push: 3, span: 18, pull: 3  }}
          style={{ backgroundColor: "green" }}
        >
          col-16
        </Col>
      </Row>
    </>
  );
}
