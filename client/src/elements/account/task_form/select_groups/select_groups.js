import './styles/styles_select_group.css'
import { Select } from 'antd';

export default function SelectGroups(){
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    const options = [];

    for (let i = 10; i < 36; i++) {
        options.push({
            key: i,
            value: i.toString(36) + i
        });
    }

    return(
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
    )
}