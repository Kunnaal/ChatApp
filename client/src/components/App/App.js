import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../Home/home';
import Room from '../Room/room';

export const App = () => {

    // const code_regex = new RegExp('[a-z]{3}\-[a-z]{3}\-[a-z]{3}');
    const code_regex = /[a-z]{3}-[a-z]{3}-[a-z]{3}/;

    return(
        <Router>
            <Routes>
                <Route exact path='/' element={<Home/>} />
                <Route path='\${Link}' element={<Room/>} />
            </Routes>
        </Router>);
}