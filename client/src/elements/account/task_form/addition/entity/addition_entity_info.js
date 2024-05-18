import {FileFilled, LinkOutlined} from "@ant-design/icons";
import {styles} from "./styles/style_addition_entity";
import './styles/style_addition_entity.css'

export default function AdditionEntityInfo(props){
    const linkTitle = 'Ссылка'
    const styleAdditionTitle = () => {
        if (props.type === 'link' && props.isHover){
            return styles.titleAdditionLinkHover
        } else{
            return styles.titleAdditionDefault
        }
    }

    return (
        <div className='addition-entity-info-wrap'>
            <div className='addition-entity-icon-wrap'>
                {props.type === 'link' && <LinkOutlined style={styles.icon}/>}
                {props.type === 'file' && <FileFilled style={styles.icon}/>}
            </div>
            <div className='addition-entity-root'>
                <div className='addition-title-root' style={styleAdditionTitle()}>
                    {props.type === 'link' && linkTitle}
                    {props.type === 'file' && props.name}
                </div>
                <div className='addition-text-root'>
                    {props.type === 'link' && props.name}
                    {props.type === 'file' && props.content.fileType.toUpperCase()}
                </div>
            </div>
        </div>
    )
}