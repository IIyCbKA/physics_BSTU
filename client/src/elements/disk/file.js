import '../../styles/style.css'

export default function File(name){
    return(
        <div className="file-area">
            <div className="item-icon">
                <div className="icon-wrapper">
                    <span className="file-icon">

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