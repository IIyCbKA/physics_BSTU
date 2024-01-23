import 'bootstrap/dist/css/bootstrap.min.css'
import Header from "../Components/Header";
import {Helmet} from 'react-helmet';
import Counter from "../feathures/counter/Counter";
import Disk from "../Components/Disk"

function Home() {
    return (
        <div>
            <Helmet>
                <title>Физика</title>
            </Helmet>
            <Header/>
            <Counter/>
            <Disk/>
        </div>
    );
}

export default Home;
