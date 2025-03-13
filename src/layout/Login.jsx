import * as React from "react"
import { useState } from "react"
import { useLocation } from "react-router-dom"

import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CircularProgress
} from "@mui/material"
import LockIcon from "@mui/icons-material/Lock"
import {
  Form,
  required,
  TextInput,
  useTranslate,
  useLogin,
  useNotify
} from "react-admin"

const Login = () => {
  const [loading, setLoading] = useState(false)
  const translate = useTranslate()

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
            src="/assets/logo.jpg" // 設定 logo 路徑
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
              />
            </Box>
            <Box sx={{ marginTop: "1em" }}>
              <TextInput
                source="password"
                // label={translate("ra.auth.password")}
                label="密碼"
                type="password"
                disabled={loading}
                validate={required()}
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