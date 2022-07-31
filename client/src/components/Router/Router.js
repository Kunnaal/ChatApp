import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import Room from '../Room/Room';

const RouterApp = () => {
    return(
        <Router>
            <Routes>
                <Route exact path='/' element={<Home/>} />

                {/*Keep at last cause this is the work case to encounter*/}
                <Route path={'/:code'} element={<Room/>} />
            </Routes>
        </Router>);
}

export default RouterApp;
