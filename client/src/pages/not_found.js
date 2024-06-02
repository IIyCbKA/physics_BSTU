import React from 'react';
import { Button, Result } from 'antd';

const MAIN_TEXT = 'К сожалению, страницы, которую вы посетили, не существует.'
const BTN_TEXT = 'На главную'

export default function NotFound () {
    return (
        <div>
            <Result
                status="404"
                title="404"
                subTitle={MAIN_TEXT}
                extra={<Button type="primary" href="/disk/">{BTN_TEXT}</Button>}
            />
        </div>
    );
}
