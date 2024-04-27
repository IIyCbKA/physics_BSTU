import './styles/style_task.css'
import {BookOutlined} from "@ant-design/icons";
import {styles} from './styles/style_task'

export default function Task(props){
    const rootStyle = () => {
        if (props.isActive){
            return {boxShadow: '0 1px 2px 0 rgba(60,64,67,.3), ' +
                        '0 2px 6px 2px rgba(60,64,67,.15)',
                    borderTopLeftRadius: '0px',
                    borderTopRightRadius: '0px'
            }
        }
    }

    const mainStyle = () =>{
        if (props.isActive){
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

        if (props.isActive){
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

    const handleTaskClick = () => {
        if (props.isActive){
            props.setActiveID(null)
        } else {
            props.setActiveID(props.id)
        }
    }

    return(
        <div className='task-root'
             style={rootStyle()}
        >
            <div className='task-main'
                 style={mainStyle()}
                 onClick={handleTaskClick}
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