import { useState, useCallback } from "react";
import {withRouter} from "next/router"
import { Layout, Icon, Input, Avatar,Tooltip,Menu, Dropdown } from "antd";
const { Header, Content, Footer } = Layout;
import Container from "./Container";
import { logout } from "../store/actions";
import Link from "next/link";
import getConfig from "next/config";
const {publicRuntimeConfig}  = getConfig();
import { connect } from "react-redux";
const api = require('../lib/api')
function LayoutComp({ children,user,logoutUser,router }) {
  const [searchVal, setSearchVal] = useState(router.query&&router.query.q||"");
    const handleLogout = useCallback(()=>{
        logoutUser()
    },[logoutUser]);
    const userDropDown = (<Menu><Menu.Item> <span onClick={handleLogout}>登 出</span> </Menu.Item></Menu>);
    const handleOnSearch = useCallback((val)=>{
        router.push(`/search?q=${val}`)
    },[searchVal]);
  return (
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
                onSearch={handleOnSearch}
              />
            </div>
            <div className="header-right">
                {
                    user&&user.id?
                        (<Dropdown overlay={userDropDown}>
                            <a href="/"><Avatar src={user.avatar_url} size={40} /></a></Dropdown>)
                        :
                        (<Tooltip placement="bottom" title="点击登陆"><a href={`/prepare-auth?url=${router.asPath}`}>  <Avatar icon="user" size={40} /> </a></Tooltip>)
                }
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
            <style jsx global>{`
              #__next{
                height:100%;
              }
              .ant-layout{
                height:100%
              }
            `}</style>
          </Container>
        </Header>
        <Content style={{ marginTop: 64 }}>{children}</Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
  );
}
function mapStateToprops(state) {
    return {
        user:state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logoutUser:()=>{
            dispatch(logout())
        }
    }
}
export default connect(mapStateToprops,mapDispatchToProps)(withRouter(LayoutComp));
