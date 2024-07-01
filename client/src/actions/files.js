import { SERVER, $host } from "../server_files/server_connect";
import { addUploadProgress } from "../reducers/file_reducer";
import { saveAs } from "file-saver";
import {
  CREATE_DISK_FOLDER_URL,
  DELETE_DISK_FILE_URL,
  DOWNLOAD_DISK_FILE_PATTERN_URL,
  UPLOAD_DISK_FILE_URL,
} from "../constants";
import {store} from '../reducers/index'

export function formatFileSize(bytes) {
  if (bytes === 0) return "0 Байт";

  const sizes = ["Байт", "КБ", "МБ", "ГБ", "ТБ"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

export const getFilesName = async (path) => {
  try {
    const response = await $host.get('/api/check' + path);
    //dispatch(setFiles(response.data.files));

    return response.status;
  } catch (e) {
    console.log(e);
    return e.response.status;
  }
};

export const uploadFile = async (file, dir_path) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("path", dir_path);
    const result = await $host.post(UPLOAD_DISK_FILE_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },

      onUploadProgress: (progressEvent) => {
        store.dispatch(addUploadProgress(file.name,
          {loaded: progressEvent.loaded, total: progressEvent.total}));
      },
    });

    return result.status;
  } catch (e) {
    console.log(e);

    return 500;
  }
};

export const downloadFile = async (fileName, fileID) => {
  const url = `${SERVER}${DOWNLOAD_DISK_FILE_PATTERN_URL}${fileID}`;

  $host
    .get(url, {
      responseType: "blob",
    })
    .then((response) => {
      const blob = new Blob([response.data]);
      saveAs(blob, fileName);
    })
    .catch((e) => console.log(e));
};

export const createFolder = async (folderName, path) => {
  try {
    const result = await $host.post(CREATE_DISK_FOLDER_URL, {
      folderName,
      path,
    });

    return result.status;
  } catch (e) {
    console.log(e);

    return 500;
  }
};

export const deleteFile = async (file_id) => {
  try {
    const result = await $host.post(DELETE_DISK_FILE_URL, { fileID: file_id });

    return result.status;
  } catch (e) {
    console.log(e);

    return 500;
  }
};
