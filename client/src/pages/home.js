import 'bootstrap/dist/css/bootstrap.min.css'
import Header from "../components/header";
import {Helmet} from 'react-helmet';

function Home() {
    return (
        <div>
            <Helmet>
                <title>Физика</title>
            </Helmet>
            <Header/>
        </div>
    );
}

export default Home;
