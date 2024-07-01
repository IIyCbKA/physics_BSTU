import { Drawer } from 'antd'
import {useDispatch, useSelector} from "react-redux";
import {isMobile} from "react-device-detect";
import './styles/styles_upload_drawer.css'
import { styles } from './styles/styles_upload_drawer'
import {Close} from "@mui/icons-material";
import React, {useEffect, useState} from "react";
import UploadFileEntity from "../upload_file_entity/upload_file_entity";
import { cleanUploadList } from "../../../reducers/file_reducer";

const TITLE_PROCESS_TEXT = 'Загрузка'
const TITLE_FINAL_TEXT = 'Все файлы загружены'

function UploadDrawerHeader({closeHandler, progress}){
  return(
    <div className='upload-drawer-header-wrap'>
      <div className='upload-drawer-header-left'>
        <span className='upload-drawer-header-title'>
          {
            progress < 100 ? `${TITLE_PROCESS_TEXT} ${progress}%` :
            TITLE_FINAL_TEXT
          }
        </span>
      </div>
      <div className='upload-drawer-header-close-btn' onClick={closeHandler}>
        <Close style={styles.closeIconStyle}/>
      </div>
    </div>
  )
}


export default function UploadDrawer(){
  const uploadList = useSelector((state) => state.file.upload_list)
  const windowHeight = useSelector((state) => state.app.height)
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(uploadList).length > 0){
      if (open === false){
        setOpen(true);
      }

      let actLoaded = null;
      let actTotal = null;
      for (const ind in uploadList){
        actLoaded += uploadList[ind].loaded;
        actTotal += uploadList[ind].total;
      }

      setProgress(Math.round((actLoaded / actTotal) * 100))
    }
  }, [uploadList, open]);

  const onClose = () => {
    setOpen(false);
    dispatch(cleanUploadList());
  };

  const headerStyle = () => {
    return {
      ...styles.drawerHeaderStyle,
      background: `linear-gradient(to right, #2c82e5 ${0}%, #2c82e5 ${progress}%, #383838 ${progress}%, #383838 ${100}%)`
    }
  }

  return(
    <Drawer
      rootStyle={
      isMobile ?
        styles.drawerRootStyleMobile :
        styles.drawerRootStylePC
      }
      title={<UploadDrawerHeader closeHandler={onClose} progress={progress}/>}
      placement='bottom'
      closable={false}
      onClose={onClose}
      open={open}
      key='bottom_upload'
      height={isMobile ? windowHeight : 330}
      mask={false}
      style={isMobile ? {} : styles.drawerContentStyle}
      styles={{ header: headerStyle(), body: styles.drawerBodyStyle }}
    >
      <div className='listing-upload-files'>
        {Object.keys(uploadList).map((fileName) => (
          <UploadFileEntity
            name={fileName}
            type='png'
            size={uploadList[fileName].total}
          />
        ))}
      </div>
    </Drawer>
  )
}