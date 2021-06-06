import useFetchData from  '../hooks/useFetchData';
import LoginForm from './LoginForm';
import { LoadingBox } from './MiscControls';
import { useState, useContext, useEffect } from 'react'
import { AppContext } from '../contexts/AppContext';

const LoginView = () => {
    const { setAuthToken } = useContext(AppContext);
    const { data:loginData, setRequestAuth, loading, error, errorMessage } = useFetchData({ getUrl:'/api/login'});  
    const [triedLogin, setTriedLogin] = useState(false);

    const submitLogin = (formData) => {
        setRequestAuth({ "username" : formData.email, "password" : formData.password });
        setTriedLogin(true);
    };

    useEffect(() => {
        if(loginData) {
            setAuthToken(loginData.token);
        }
    },[loginData]);

    return (
        <section>
            <h2>Login</h2>
            <LoginForm onSubmit={submitLogin}/>
            { triedLogin && <LoadingBox loading={loading} error={error} errorMessage={errorMessage} /> }
            { loginData && <p>logged in.</p>}
            { loginData && <p>{loginData.token}</p>}
        </section>
    );
}

export default LoginView
