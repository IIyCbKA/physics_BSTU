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
                {props.additions.map(addition => (
                    <AdditionEntity {...addition}
                                    key={addition.id}
                                    setAdditions={props.setAdditions}
                    />
                ))}
            </div>
        </div>
    )
}