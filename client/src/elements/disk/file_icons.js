import {
    FileExcelFilled,
    FileFilled,
    FileImageFilled,
    FilePdfFilled,
    FilePptFilled,
    FileWordFilled,
    FileZipFilled,
    FolderFilled,
} from "@ant-design/icons";
import {styles} from "./styles/style_disk";

export const icons = {
    'folder': <FolderFilled style={styles.styleFolderIcon}/>,
    'docx': <FileWordFilled style={styles.styleDocIcon}/>,
    'doc': <FileWordFilled style={styles.styleDocIcon}/>,
    'png': <FileImageFilled style={styles.styleImageIcon}/>,
    'jpg': <FileImageFilled style={styles.styleImageIcon}/>,
    'jpeg': <FileImageFilled style={styles.styleImageIcon}/>,
    'pdf': <FilePdfFilled style={styles.stylePdfIcon}/>,
    'xls': <FileExcelFilled style={styles.styleExcelIcon}/>,
    'xlsx': <FileExcelFilled style={styles.styleExcelIcon}/>,
    'rar': <FileZipFilled style={styles.styleArchiveIcon}/>,
    'zip': <FileZipFilled style={styles.styleArchiveIcon}/>,
    'pptx': <FilePptFilled style={styles.stylePresentationIcon}/>,
    'other': <FileFilled style={styles.styleOtherIcon}/>
}