import useLogin from  '../hooks/useLogin';
import LoginForm from './LoginForm';
import { LoadingBox } from './MiscControls';
import { useContext } from 'react'
import { AppContext } from '../contexts/AppContext';
import { Redirect, Link } from 'react-router-dom';

const LoginView = () => {
    const { loggedInUser, setLoggedInUser } = useContext(AppContext);
    const { tryLogin, success, loading, error, errorMessage } = useLogin({ 
        url:'/api/login', 
        setLoggedInUser:setLoggedInUser
    });

    const submitLogin = (formData) => {
        tryLogin({ username:formData.email, password:formData.password });
    };

    console.log("success: " + success);
        

    if(success || loggedInUser) {
        return <Redirect to='/' />
    }
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
