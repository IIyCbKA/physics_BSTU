import './styles/style_addition_entity.css'
import {CloseOutlined} from "@ant-design/icons";
import {styles} from "./styles/style_addition_entity";
import AdditionEntityInfo from "./addition_entity_info";
import {useState} from "react";


export default function AdditionEntity(props){
    const [isHover, setHover] = useState(false)

    return (
        <div className='addition-entity-wrap'
             onMouseEnter={() => setHover(true)}
             onMouseLeave={() => setHover(false)}
        >
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
            <div className='addition-entity-delete'>
                <div className='delete-zone'>
                    <CloseOutlined style={styles.iconClose}/>
                </div>
            </div>
        </div>
    )
}