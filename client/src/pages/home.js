import 'bootstrap/dist/css/bootstrap.min.css'
import Header from "../components/header";
import {Helmet} from 'react-helmet';
import {uploadFile} from '../actions/files'


function Home() {
    function fileUploadHandler(event) {
        const files = [...event.target.files]
        files.forEach(file => uploadFile(file, '/'))

    }

    return (
        <div>
            <Helmet>
                <title>Физика</title>
            </Helmet>
            <Header/>
            <input
                onInput={fileUploadHandler}
                multiple={true}
                type="file"
                id="disk_upload_input"
                className="disk_upload_input">
            </input>
        </div>
    );
}

export default Home;
