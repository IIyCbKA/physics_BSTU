import 'bootstrap/dist/css/bootstrap.min.css'
import Header from "../Components/Header";
import { Helmet } from 'react-helmet';
import HomeHeader from "../Components/HomeHeader";
import Form from "../Components/Form"

function Home() {
    return (
        <div>
            <Helmet>
                <title>Физика</title>
            </Helmet>
            <HomeHeader />
        </div>
    );
}

export default Home;
