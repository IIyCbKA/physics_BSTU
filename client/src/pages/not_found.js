import {Helmet} from 'react-helmet';

export function NotFound() {
    return (
        <div>
            <Helmet>
                <title>404 Not Found</title>
            </Helmet>
            <div style={{ display: 'flex', justifyContent: 'center',
                alignItems: 'center', height: '100vh' }}>
                <h2>Страница не найдена</h2>
            </div>
        </div>
    );
}
