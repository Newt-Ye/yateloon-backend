import * as React from "react"
import { Layout } from "react-admin"
import AppBar from "./AppBar"
import Menu from "./Menu"

const CustomLayout = ({ children }) => (
  <Layout appBar={AppBar} menu={Menu}>
    {children}
  </Layout>
);
  
export default CustomLayout;