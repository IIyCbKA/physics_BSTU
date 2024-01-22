import 'bootstrap/dist/css/bootstrap.min.css'
import Header from "../Components/Header";
import {Helmet} from 'react-helmet';
import Counter from "../feathures/counter/Counter";

function Home() {
    return (
        <div>
            <Helmet>
                <title>Физика</title>
            </Helmet>
            <Header/>
            <Counter/>
        </div>
    );
}

export default Home;
