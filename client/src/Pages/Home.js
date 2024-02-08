import 'bootstrap/dist/css/bootstrap.min.css'
import Header from "../Components/Header";
import {Helmet} from 'react-helmet';
import Filelist from "../Components/Filelist";

function Home() {
    return (
        <div>
            <Helmet>
                <title>Физика</title>
            </Helmet>
            <Header/>
            <Filelist/>
        </div>
    );
}

export default Home;
