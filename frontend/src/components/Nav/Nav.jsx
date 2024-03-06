import * as React from "react";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Drawer from "@mui/joy/Drawer";
import List from "@mui/joy/List";
import ListItemButton from "@mui/joy/ListItemButton";
import Typography from "@mui/joy/Typography";
import ModalClose from "@mui/joy/ModalClose";
import Menu from "@mui/icons-material/Menu";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const navIcons = [
  { link: "business", name: "나의 지원사업" },
  { link: "chatbot", name: "지원사업 ChatBot" },
  { link: "recommend", name: "지원사업 조회" },
  { link: "myfund", name: "나의 지원금" },
  { link: "mypage", name: "마이 페이지" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation().pathname.slice(1);
  const movepage = (link) => {
    navigate(`/${link}`);
  };
  const logout = () => {
    window.alert("로그아웃 되었습니다.");
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <IconButton
        variant="outlined"
        color="neutral"
        onClick={() => setOpen(true)}
      >
        <Menu />
      </IconButton>
      <Drawer
        size="sm"
        anchor={"right"}
        open={open}
        sx={{ fontFamily: "surround", zIndex: "9999" }}
        onClose={() => setOpen(false)}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            ml: "auto",
            mt: 1,
            mr: 1,
          }}
        >
          <Typography
            component="label"
            htmlFor="close-icon"
            fontSize="sm"
            fontWeight="lg"
            sx={{ cursor: "pointer" }}
          >
            close
          </Typography>
          <ModalClose id="close-icon" sx={{ position: "initial" }} />
        </Box>
        <List
          size="lg"
          // component="nav"
          sx={{
            flex: "none",
            mt: 5,
            mb: 5,
            justifyContent: "center",
          }}
        >
          {navIcons.map((navIcon, index) => (
            <ListItemButton
              key={index}
              background="none"
              onClick={() => movepage(navIcon.link)}
              sx={{
                fontFamily: "surround",
                justifyContent: "center",
                color: navIcon.link === location ? "blue" : "inherit",
              }}
            >
              {navIcon.name}
            </ListItemButton>
          ))}
          <ListItemButton
            background="none"
            onClick={logout}
            sx={{
              fontFamily: "surround",
              justifyContent: "center",
              color: "red",
            }}
          >
            로그아웃
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
}
