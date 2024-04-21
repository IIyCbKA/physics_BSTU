import './styles/styles_form_informations.css'
import TitleInputLine from "./input_lines/title/title_input_line";
import DescriptionInputLine
    from "./input_lines/description/description_input_line";

export default function Information(){
    return(
        <div className='information-form-wrap'>
            <div className='information-form'>
                <TitleInputLine/>
                <DescriptionInputLine/>
            </div>
        </div>
    )
}