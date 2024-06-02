import './styles/style_disk.css'
import {minimizeStr, minimizeStrPortrait} from "../../actions/strings";
import {useDispatch, useSelector} from "react-redux";
import {icons} from "./file_icons";
import {styles} from "./styles/style_disk";
import {selectedFile} from "../../reducers/file_reducer";
import {isMobile} from "react-device-detect";
import {useLayoutEffect, useRef, useState} from "react";
import {
    FILE_TYPE_FOLDER,
    FILE_TYPE_OTHER,
    PORTRAIT_ORIENTATION
} from "../../constants";

const MARGINS_PORTRAIT_ORIENTATION_WINDOW = 78
const DEFAULT_LANDSCAPE_SYMBOLS = 20
const DEFAULT_LANDSCAPE_AFTER_POINT_SYMBOLS = 2

export default function File(props){
    const width = useSelector(state => state.app.width)
    const path = useSelector(state => state.file.path)
    const orientation = useSelector(state => state.app.orientation)
    const selected_id = useSelector(state => state.file.selected_id)
    const dispatch = useDispatch()
    const infoZone = useRef(null)
    const nameFieldRef = useRef(null);
    const [nameWidthPortrait, setNameWidthPortrait] = useState(
        width - MARGINS_PORTRAIT_ORIENTATION_WINDOW)
    let folderTimer = null;
    let timer = null;
    let startTime = null;
    let touchStartX = null;
    let touchStartY = null;

    useLayoutEffect(() => {
        if (orientation === PORTRAIT_ORIENTATION) {
            setNameWidthPortrait(infoZone.current.offsetWidth);
        }
    }, [width, orientation])

    useLayoutEffect(() => {
        if (orientation === PORTRAIT_ORIENTATION){
            minimizeStrPortrait(props.name, nameWidthPortrait,
                nameFieldRef.current)
        } else {
            nameFieldRef.current.textContent = minimizeStr(props.name,
            DEFAULT_LANDSCAPE_SYMBOLS, DEFAULT_LANDSCAPE_AFTER_POINT_SYMBOLS);
        }

    }, [nameWidthPortrait, nameFieldRef, orientation, props.name])

    const handleFileClick = (event) => {
        event.stopPropagation();
        if (!isMobile){
            if (props.type === FILE_TYPE_FOLDER){
                folderTimer = setTimeout(() => {
                    dispatch(selectedFile(props.id, props.name, props.type))
                }, 300)
            } else if (selected_id !== props.id){
                dispatch(selectedFile(props.id, props.name, props.type))
            }
        }
    }

    const handleDoubleClick = (event) => {
        event.preventDefault()
        if (props.type === FILE_TYPE_FOLDER && !isMobile){
            clearTimeout(folderTimer);
            window.location.href = path + props.name + '\\'
        }
    }

    const handleTouchStart = (event) => {
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
        startTime = Date.now();

        timer = setTimeout(() => {
            event.stopPropagation();
            dispatch(selectedFile(props.id, props.name, props.type))
        }, 300);
    }

    const handleTouchEnd = (event) => {
        const endTime = Date.now();
        const touchEndX = event.changedTouches[0].clientX;
        const touchEndY = event.changedTouches[0].clientY;

        const isNotMove = Math.abs(touchEndX - touchStartX) < 5 &&
                          Math.abs(touchEndY - touchStartY) < 5

        if (isNotMove && endTime - startTime < 300 &&
            props.type === FILE_TYPE_FOLDER){
                window.location.href = path + props.name + '\\'
        }

        clearTimeout(timer);
        touchStartX = null;
        touchStartY = null;
    }

    const handleTouchMove = (event) => {
        const touchMoveX = event.touches[0].clientX;
        const touchMoveY = event.touches[0].clientY;

        const diffX = Math.abs(touchMoveX - touchStartX);
        const diffY = Math.abs(touchMoveY - touchStartY);
        if (diffX > 10 || diffY > 10) {
            clearTimeout(timer);
        }
    }

    const handleFileContextMenu = (event) => {
        event.preventDefault()
    }

    const iconStyle = () => {
        if (orientation === PORTRAIT_ORIENTATION){
            return styles.iconMobile
        } else{
            return styles.iconPC
        }
    }

    return(
        <div className={`file-area${selected_id === props.id ? ' selected' : ''}`}
             onClick={handleFileClick}
             onDoubleClick={handleDoubleClick}
             onContextMenu={handleFileContextMenu}
             onTouchStart={handleTouchStart}
             onTouchEnd={handleTouchEnd}
             onTouchMove={handleTouchMove}
        >
            <div className="item-icon">
                <div className="icon-wrapper">
                    <span
                        style={iconStyle()}
                        className='file-icon file-icon-size icon-contain'
                    >
                        {props.type in icons ?
                            icons[props.type] :
                            icons[FILE_TYPE_OTHER]}
                    </span>
                </div>
            </div>
            <div className="item-info">
                <div className="item-title" ref={infoZone}>
                    <span
                        className="clamped-text"
                        aria-hidden={true}
                        title={props.name}
                        ref={nameFieldRef}
                    ></span>
                </div>
            </div>
        </div>
    )
}
