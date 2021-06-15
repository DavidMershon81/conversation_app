import useLogin from  '../hooks/useLogin';
import LoginForm from './LoginForm';
import { LoadingBox } from './MiscControls';
import { useContext } from 'react'
import { AppContext } from '../contexts/AppContext';
import { Redirect } from 'react-router-dom';

const LoginView = () => {
    const { loggedInUser, setLoggedInUser } = useContext(AppContext);
    const { triedLogin, tryLogin, loading, error, errorMessage } = useLogin({ 
        url:'/api/login', 
        setLoggedInUser:setLoggedInUser
    });

    const submitLogin = (formData) => {
        tryLogin(formData.email, formData.password);
    };

    if(!loading && loggedInUser) {
        return <Redirect to='/' />
    }
    return (
        <section>
            <h2>Login</h2>
            { !loggedInUser && <LoginForm onSubmit={submitLogin}/> }
            { triedLogin && <LoadingBox loading={loading} error={error} errorMessage={errorMessage} /> }
            { loggedInUser && <p>logged in.</p>}
        </section>
    );
}

export default LoginView
