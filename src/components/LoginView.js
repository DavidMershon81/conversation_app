import useLogin from  '../hooks/useLogin';
import LoginForm from './LoginForm';
import { LoadingBox } from './MiscControls';
import { useContext } from 'react'
import { AppContext } from '../contexts/AppContext';
import { Redirect, Link } from 'react-router-dom';

const LoginView = () => {
    const { refreshAuth } = useContext(AppContext);
    const onLoginSuccess = () => {
        refreshAuth();  
    }

    const { tryLogin, success, loading, error, errorMessage } = useLogin({ 
        url:'/api/login', 
        onLoginSuccess:onLoginSuccess
    });

    const submitLogin = (formData) => {
        tryLogin({ username:formData.email, password:formData.password });
    };

    return (
        <section>
            <h2>Login</h2>
            { !success && <LoginForm onSubmit={submitLogin}/> }
            { (loading || error) && <LoadingBox loading={loading} error={error} errorMessage={errorMessage} /> }
            { success && <p>logged in.</p>}
            <p>Don't have an account yet?<Link className='inline_link' to={`/register`}>Register A New Account</Link></p>
        </section>
    );
}

export default LoginView
