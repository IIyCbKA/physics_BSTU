import './styles/upload_file_entity.css'
import {icons} from "../../../utils/file_icons/file_icons";
import {FILE_TYPE_OTHER} from "../../../constants";
import {formatFileSize} from "../../../actions/files";

export default function UploadFileEntity(props){
  return(
    <div className='upload-file-entity-root'>
      <div className='upload-file-entity-wrap'>
        <div className='upload-file-entity-icon-zone'>
          <span className='upload-file-entity-icon-wrap'>
            {props.type in icons ? icons[props.type] : icons[FILE_TYPE_OTHER]}
          </span>
        </div>
        <div className='upload-file-entity-main-zone'>
          <div className='upload-file-entity-file-name upload-file-entity-text'>
            {props.name}
          </div>
          <div className='upload-file-entity-file-size upload-file-entity-text'>
            {formatFileSize(props.size)}
          </div>
        </div>
        <div className='upload-file-entity-right-zone'>
          <div className='upload-file-entity-result-text upload-file-entity-text'>
            Загружено
          </div>
        </div>
      </div>
    </div>
  )
}