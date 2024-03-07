import {Helmet} from 'react-helmet';

export default function NotFound() {
    return (
        <div>
            <Helmet>
                <title>404 Not Found</title>
            </Helmet>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <div style={{textAlign: 'center'}}>
                    <h2>Page<br/><strong>Not found</strong></h2>
                </div>
            </div>
        </div>
    );
}
