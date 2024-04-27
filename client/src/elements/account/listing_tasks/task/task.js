import './styles/style_task.css'
import {BookOutlined} from "@ant-design/icons";
import {styles} from './styles/style_task'
import {useState} from "react";
import {useDispatch} from "react-redux";
import {addActiveTask, deleteActiveTask} from "../../../../reducers/journal_reducer";

export default function Task(props){
    const [isActive, setActive] = useState(false);
    const dispatch = useDispatch();

    const setCurrentActiveTask = (newActiveStatus) => {
        if (newActiveStatus){
            dispatch(addActiveTask({...props}))
        } else{
            if (isActive){
                dispatch(deleteActiveTask({id: props.id}));
            }
        }
        setActive(newActiveStatus);
    }

    const rootStyle = () => {
        if (isActive){
            return {boxShadow: '0 1px 2px 0 rgba(60,64,67,.3), ' +
                        '0 2px 6px 2px rgba(60,64,67,.15)',
                    borderTopLeftRadius: '0px',
                    borderTopRightRadius: '0px'
            }
        }
    }

    const mainStyle = () =>{
        if (isActive){
            return {borderBottom: 'none',
                    backgroundColor: '#E8F0FE'
            }
        } else if (!props.isLast){
            return {borderBottom: '1px solid #E0E0E0'}
        }
    }

    const infoStyle = () => {
        const defaultStyle = {
            transition: 'height .3s cubic-bezier(0.4, 0, 0.2, 1)'
        }

        if (isActive){
            return {...defaultStyle,
                    height: '300px',
                    borderTop: '1px solid #E0E0E0'
            }
        } else{
            return {...defaultStyle,
                    height: '0',
            }
        }
    }

    return(
        <div className='task-root'
             style={rootStyle()}
        >
            <div className='task-main'
                 style={mainStyle()}
                 onClick={() => setCurrentActiveTask(!isActive)}
            >
                <div className='task-icon-wrap'>
                    <BookOutlined style={styles.iconStyle}/>
                </div>
                <div className='task-title-wrap'>
                    <div className='task-title-text'>
                        {props.title}
                    </div>
                </div>
            </div>
            <div className='task-info-wrap' style={infoStyle()}>

            </div>
        </div>
    )
}