import './styles/styles_form_informations.css'
import TitleInputLine from "./input_lines/title/title_input_line";
import DescriptionInputLine
    from "./input_lines/description/description_input_line";
import AdditionEntity from "../addition/entity/addition_entity";


export default function Information(props){
    return(
        <div className='information-form-wrap'>
            <div className='information-form'>
                <TitleInputLine setTitle={props.setTitle}/>
                <DescriptionInputLine setDescription={props.setDescription}/>
                {props.files.map(file => (
                    <AdditionEntity name={file.name} type={'file'}/>
                ))}
                {props.links.map(link => (
                    <AdditionEntity name={link} type={'link'}/>
                ))}
            </div>
        </div>
    )
}