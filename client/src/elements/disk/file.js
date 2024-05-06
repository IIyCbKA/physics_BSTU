import './styles/style_disk.css'
import {minimizeStr, minimizeStrPortrait} from "../../actions/strings";
import {useDispatch, useSelector} from "react-redux";
import {icons} from "./file_icons";
import {styles} from "./styles/style_disk";
import {PORTRAIT_ORIENTATION} from "../../classes/OrientationListener";
import {selectedFile} from "../../reducers/file_reducer";
import {isMobile} from "react-device-detect";
import {useEffect, useRef, useState} from "react";

export default function File(props){
    const width = useSelector(state => state.app.width)
    const path = useSelector(state => state.file.path)
    const orientation = useSelector(state => state.app.orientation)
    const selected_id = useSelector(state => state.file.selected_id)
    const dispatch = useDispatch()
    const nameRef = useRef(null)
    const nameFieldRef = useRef(null);
    const [nameWidthPortrait, setNameWidthPortrait] = useState(width - 78)
    let timer = null;
    let startTime = null;
    let touchStartX = null;
    let touchStartY = null;

    useEffect(() => {
        if (nameRef.current) {
            setNameWidthPortrait(nameRef.current.offsetWidth);
        }
    }, [width])

    useEffect(() => {
        if (nameFieldRef.current){
            if (orientation === PORTRAIT_ORIENTATION){
                minimizeStrPortrait(props.name, nameWidthPortrait,
                    nameFieldRef.current)
            } else {
                nameFieldRef.current.textContent = minimizeStr(props.name,
                    20, 2);
            }
        }

    }, [nameWidthPortrait, nameFieldRef, orientation, props.name])

    const handleFileClick = (event) => {
        event.stopPropagation();
        if (!isMobile && selected_id !== props.id){
            dispatch(selectedFile(props.id, props.name, props.type))
        }
    }

    const handleDoubleClick = (event) => {
        event.preventDefault()
        if (props.type === 'folder' && !isMobile){
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

    const handleTouchEnd = () => {
        const endTime = Date.now();
        if (endTime - startTime < 300 && props.type === 'folder'){
            window.location.href = path + props.name + '\\'
        }

        clearTimeout(timer);
        touchStartX = null;
        touchStartY = null;
    }

    const handleTouchMove =  (event) => {
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
                            icons['other']}
                    </span>
                </div>
            </div>
            <div className="item-info">
                <div className="item-title" ref={nameRef}>
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
