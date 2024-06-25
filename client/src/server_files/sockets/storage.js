import { socket } from "./socket_client";
import { setFiles } from "../../reducers/file_reducer";
import { store } from "../../reducers";

socket.onMessage("getFilesName", (data) => {
    store.dispatch(setFiles(data.files));
  });