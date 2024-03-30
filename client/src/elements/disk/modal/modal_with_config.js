import { ConfigProvider } from 'antd';
import ModalWindow from "./default_modal";

export default function CreateFolderModal(props){
    return (
        <ConfigProvider
            theme={{
                token:{
                    fontFamily: 'YS Text, sans-serif'
                },

                components: {
                    Modal: {
                        titleFontSize: '15px'
                    },
                },
            }}
        >
            <ModalWindow show={props.show} handleClose={props.handleClose}/>
        </ConfigProvider>
    )
};
