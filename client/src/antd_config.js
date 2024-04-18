import { ConfigProvider } from 'antd';
import App from "./app";

export default function AppWithAntdConfig(){
    return (
        <ConfigProvider
            theme={{
                token:{
                    fontFamily: 'YS Text, sans-serif'
                },

                components: {
                    Modal: {
                        titleFontSize: '15px'
                    }
                },
            }}
        >
            <App/>
        </ConfigProvider>
    )
};
