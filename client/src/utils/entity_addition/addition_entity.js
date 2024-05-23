import './styles/style_addition_entity.css'
import {CloseOutlined} from "@ant-design/icons";
import {styles} from "./styles/style_addition_entity";
import AdditionEntityInfo from "./addition_entity_info";
import {useState} from "react";
import { deleteWorkFile } from '../../actions/journal';


export default function AdditionEntity(props){
    const [isHover, setHover] = useState(false)
    const deleteHidden = props.isWorkFile && props.workInfo.status === 'Сдано'

    const handleDeleteAddition = async () => {
        if (props.isTaskForm){
            props.setAdditions(prevAdditions => prevAdditions.filter(
                addition => addition.id !== props.id))
        } else if (props.isWorkFile){
            await deleteWorkFile(props.id)
        }
    }

    return (
        <div className='addition-entity-wrap'
             onMouseEnter={() => setHover(true)}
             onMouseLeave={() => setHover(false)}
        >
            <div className='addition-entity-info-root'>
                {props.type === 'link' ?
                    (<a className='addition-entity-ref-zone'
                        href={props.name}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <AdditionEntityInfo {...props}
                                            isHover={isHover}/>
                    </a>) :
                    (<AdditionEntityInfo {...props}
                                         isHover={isHover}/>)
                }
            </div>
            <div className={'addition-entity-delete' +
                (deleteHidden ? ' addition-delete-hidden' : '')}>
                <div className='delete-zone' onClick={handleDeleteAddition}>
                    <CloseOutlined style={styles.iconClose}/>
                </div>
            </div>
        </div>
    )
}