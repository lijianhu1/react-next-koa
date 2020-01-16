import { useState, useCallback } from "react";
import { Layout, Icon, Input, Avatar } from "antd";
const { Header, Content, Footer } = Layout;
import Container from "./Container";

import Link from "next/link";

function LayoutComp({ children }) {
  const [searchVal, setSearchVal] = useState("sear");

  return (
    <div>
      <Layout>
        <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
          <Container
            renderer={
              <div
                className="header-inner"
                style={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "space-between"
                }}
              />
            }
          >
            <div className="header-left">
              <Icon
                type="github"
                theme="filled"
                style={{
                  fontSize: "30px",
                  color: "#fff",
                  marginRight: "10px"
                }}
              />
              <Input.Search
                placeholder="搜索"
                defaultValue={searchVal}
                onSearch={val => {
                  setSearchVal(val);
                }}
              />
            </div>
            <div className="header-right">
              <Avatar icon="user" size={40} />
            </div>
            <style jsx>
              {`
                .header-left {
                  display: flex;
                  align-items: center;
                }
                .header-right {
                  display: flex;
                  height: 100%;
                  align-items: center;
                }
              `}
            </style>
          </Container>
        </Header>
        <Content style={{ marginTop: 64 }}>{children}</Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </div>
  );
}

export default LayoutComp;
