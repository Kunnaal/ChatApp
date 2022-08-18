import Hero from '../Hero/Hero';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ResponsiveAppBar from '../AppBar/AppBar';

const Home = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.token;

        if (!token) {
            navigate('/login');
        }

        const response = async () => {
            let payload = null;
            await fetch('/api/login/verify', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"token": token}),
            })
            .then((response) => response.json())
            .then((data) => {
                const data_payload = data.payload;
                payload = data_payload;
            });
            return payload;
        }

        response()
        .then((response) => {
            const time_diff = (Date.now()-response.iat) / (1000 * 3600 * 24);
            console.log(time_diff);

            if (time_diff > 2) {
                // If user logged in after 2 days, he will be redirected to log in.
                localStorage.removeItem('token');
                navigate('/login');
            } else {
                if (!response.username) {
                    // If user did not come with the payload
                    localStorage.removeItem('token');
                    navigate('/login');
                } else {
                    console.log("User logged in!");
                    alert("User verified!");
                }
            }
        })
    }, []);

return(<>
    <ResponsiveAppBar />
    <Hero />
</>);
};

export default Home;