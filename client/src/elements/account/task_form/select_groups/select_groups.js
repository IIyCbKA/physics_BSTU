import './styles/styles_select_group.css'
import { Select } from 'antd';
import {useSelector} from "react-redux";
import {getGroupsOptions} from "../../../../actions/journal";

export default function SelectGroups(props){
    const handleChange = (value) => {
        props.setSelectedGroups(value)
    };

    const groups = useSelector(state => state.journal.groups);
    const options = getGroupsOptions(groups);

    return(
        <div className='select-form-wrap'>
            <div className='select-form'>
                <span className='select-text'>
                    Для кого
                </span>
                <div className='select-wrap'>
                    <Select
                        mode="tags"
                        style={{
                            width: '100%',
                        }}
                        onChange={handleChange}
                        tokenSeparators={[',']}
                        options={options}
                    />
                </div>
            </div>
        </div>
    )
}
