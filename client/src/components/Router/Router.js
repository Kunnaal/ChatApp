import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import Room from '../Room/Room';
import Login from '../Authentication/Login';
import Register from '../Authentication/Register';

const RouterApp = () => {
    return(
        <Router>
            <Routes>
                <Route exact path='/' element={<Home/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<Register/>} />
                {/*Keep at last cause this is the work case to encounter*/}
                <Route path={'/:code'} element={<Room/>} />
            </Routes>
        </Router>
    );
}

export default RouterApp;
