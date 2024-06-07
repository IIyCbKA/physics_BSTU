import DefaultHeader from "../components/header/default_header/default_header";
import FileHeader from "../components/header/file_header/file_header";
import { Helmet } from "react-helmet";
import { getFilesName } from "../actions/files";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { setPath } from "../reducers/file_reducer";
import { useDispatch, useSelector } from "react-redux";
import Storage from "../components/storage/storage";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import "./styles/style_from_pages.css";
import { socket } from "../server_files/sockets/socket_client";
import { DEFAULT_PAGES_BACKGROUND_COLOR } from "../constants";
import { notification } from "antd";

const PAGE_TITLE = "Хранилище";

function Home() {
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch();
  const selected_id = useSelector((state) => state.file.selected_id);
  const location = useLocation();
  const path = location.pathname.endsWith("/")
    ? location.pathname
    : location.pathname + "/";
  const [initSuccess, setInitSuccess] = useState(false);
  const [showFileHeader, setShowFileHeader] = useState(false);
  const headerRef = useRef(null);

  const openNotification = (type, title, text) => {
    api[type]({
      message: title,
      description: text,
    });
  };

  useEffect(() => {
    setShowFileHeader(selected_id !== null);
  }, [selected_id]);

  useEffect(() => {
    const waitFunc = async () => {
      const decode_path = decodeURIComponent(path);
      dispatch(setPath(decode_path));
      const code = await getFilesName(path)(dispatch);

      if (code === 404) {
        const diskPos = decode_path.search("/disk/");
        window.location.href = decode_path.slice(0, diskPos + "/disk/".length);
      } else {
        setInitSuccess(true);
      }
      await socket.init("files", { path: decode_path.slice(5) });
    };
    waitFunc();
  }, [dispatch, path]);

  const styleHeaderBlock = () => {
    return {
      height: "60px",
      top: 0,
      zIndex: 100,
    };
  };

  const handleEnter = () => {
    if (showFileHeader) {
      headerRef.current.style.position = "sticky";
    } else {
      headerRef.current.style.position = "relative";
    }
  };

  return (
    <div style={{ backgroundColor: DEFAULT_PAGES_BACKGROUND_COLOR }}>
      {contextHolder}
      <Helmet>
        <title>{PAGE_TITLE}</title>
      </Helmet>
      <div style={styleHeaderBlock()} ref={headerRef}>
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={showFileHeader ? "fileHeader" : "defaultHeader"}
            in={showFileHeader}
            timeout={200}
            classNames="header-transition"
            onEnter={handleEnter}
          >
            {showFileHeader ? (
              <FileHeader openNotification={openNotification} />
            ) : (
              <DefaultHeader />
            )}
          </CSSTransition>
        </SwitchTransition>
      </div>
      {initSuccess && <Storage openNotification={openNotification} />}
    </div>
  );
}

export default Home;
