import Hero from '../Hero/Hero'
import jwt from "jsonwebtoken";
import { useEffect } from "react";;
import { JWT_SECRET } from "../../index";
import { useNavigate } from "react-router-dom";
import ResponsiveAppBar from '../AppBar/AppBar';

const Home = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.token;
        if (!token.user) {
            localStorage.removeItem('token');
            navigate('/login');
        } else {
            if (jwt.verify(token, JWT_SECRET)) {
                alert('Token verified');
            } else {
                alert('Token invalid');
                localStorage.removeItem('token');
                navigate('/login');
            }
        }
    }, [])

    return(<>
        <ResponsiveAppBar />
        <Hero />
    </>);
};

export default Home;