import * as React from "react"
import { useState } from "react"
import { useLocation } from "react-router-dom"
import logo from '../assets/logo.png';

import {
  Box,
  Button,
  Card,
  CardActions,
  CircularProgress,
  Checkbox, 
  FormControlLabel,
} from "@mui/material"
import {
  Form,
  required,
  TextInput,
  /*useTranslate,*/
  useLogin,
  useNotify,
  ReferenceInput,
  SelectInput,
  PasswordInput,
} from "react-admin"

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState(localStorage.getItem("remember_me") ? localStorage.getItem("username") || "" : "");
  const [company, setCompany] = useState(localStorage.getItem("remember_me") ? parseInt(localStorage.getItem("company")) || "" : "");
  const [rememberMe, setRememberMe] = useState(!!localStorage.getItem("remember_me"));
  // const translate = useTranslate()

  const notify = useNotify()
  const login = useLogin()
  const location = useLocation()

  const handleSubmit = auth => {
    setLoading(true)
    login(auth, location.state ? location.state.nextPathname : "/").catch(
      error => {
        setLoading(false)
        notify(
          typeof error === "string"
            ? error
            : typeof error === "undefined" || !error.message
            ? "ra.auth.sign_in_error"
            : error.message,
          {
            type: "error",
            messageArgs: {
              _:
                typeof error === "string"
                  ? error
                  : error && error.message
                  ? error.message
                  : undefined
            }
          }
        )
      }
    )

    if (rememberMe) {
      localStorage.setItem("remember_me", "true");
      localStorage.setItem("username", auth.account);
      localStorage.setItem("company", auth.company_id);
    } else {
      localStorage.removeItem("remember_me");
      localStorage.removeItem("username");
      localStorage.removeItem("company");
    }
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "flex-start",
          // background: "url(https://source.unsplash.com/featured/1600x900)",
          // backgroundRepeat: "no-repeat",
          // backgroundSize: "cover"
        }}
      >
        <Card sx={{ minWidth: 300, marginTop: "6em" }}>
          {/* <Box
            sx={{
              marginTop: "1em",
              display: "flex",
              justifyContent: "center",
              color: "#000000",
              fontSize: "2rem" // 這裡設置了字體大小
            }}
          >
            INKSLAP
          </Box> */}
          <Box
            component="img"
            src={logo}// 設定 logo 路徑
            alt="logo"
            sx={{ 
              height: 36, 
              width: 'auto', 
              marginTop: "1em",
              display: 'block', // 設定為區塊級元素，便於置中
              marginLeft: 'auto', // 左側自動間距
              marginRight: 'auto', // 右側自動間距
            }} // 調整 logo 的大小
          />
          <Box sx={{ padding: "0 1em 1em 1em" }}>
            <Box sx={{ marginTop: "1em" }}>
              <TextInput
                autoFocus
                source="account"
                // label={translate("ra.auth.username")}
                label="帳號"
                disabled={loading}
                validate={required()}
                defaultValue={username}
                onChange={e => setUsername(e.target.value)}
              />
            </Box>
            <Box sx={{ marginTop: "1em" }}>
              <PasswordInput
                source="password"
                // label={translate("ra.auth.password")}
                label="密碼"
                disabled={loading}
                validate={required()}
              />
            </Box>
            <Box sx={{ marginTop: "1em" }}>
              <ReferenceInput 
                source="company_id" 
                reference="companies"
              >
                <SelectInput 
                  optionText="name" 
                  label="公司別" 
                  disabled={loading}
                  validate={required()}
                  defaultValue={company}
                  onChange={e => setCompany(e.target.value)}
                />
              </ReferenceInput>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                  />
                }
                label="記住我"
              />
            </Box>
          </Box>
          <CardActions sx={{ padding: "0 1em 1em 1em" }}>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              disabled={loading}
              fullWidth
            >
              {loading && <CircularProgress size={25} thickness={2} />}
              {/* {translate("ra.auth.sign_in")} */}
              {"登入"}
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Form>
  )
}

export default Login