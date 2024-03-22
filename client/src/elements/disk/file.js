import '../../styles/style.css'

export default function File(name, type){
    const typesList = ['folder', 'docx', 'doc', 'png', 'jpg', 'jpeg', 'pdf',
                       'xls', 'xlsx', 'rar', 'zip', 'pptx', 'mp4']
    const fileType = typesList.includes(type) ? type : 'other';
    const iconClass = fileType + '_icon.png'

    return(
        <div className="file-area">
            <div className="item-icon">
                <div className="icon-wrapper">
                    <span className={'file_icon ' + iconClass}>
                    </span>
                </div>
            </div>
            <div className="item-info">
                <div className="item-title">
                    <span
                        className="clamped-text"
                        aria-hidden={true}
                        title={name}
                    >{name}
                    </span>
                </div>
            </div>
        </div>
    )
}