import 'bootstrap/dist/css/bootstrap.min.css'
import Header from "../Components/Header";
import { Helmet } from 'react-helmet';
import Menu from "../Components/MobileMenu"

function Home() {
    return (
        <div>
            <Helmet>
                <title>Физика</title>
            </Helmet>
            <Header />
        </div>
    );
}

export default Home;
