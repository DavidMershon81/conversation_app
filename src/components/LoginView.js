import useLogin from  '../hooks/useLogin';
import LoginForm from './LoginForm';
import { LoadingBox } from './MiscControls';
import { useContext } from 'react'
import { AppContext } from '../contexts/AppContext';
import { useHistory } from 'react-router-dom';

const LoginView = () => {
    const history = useHistory();
    const onLoginConfirm = () => {
        history.push('/');
    }

    const { authToken, setAuthToken, setLoggedInUser } = useContext(AppContext);
    const { triedLogin, tryLogin, loading, error, errorMessage } = useLogin({ 
        url:'/api/login', 
        setAuthToken:setAuthToken,
        setLoggedInUser:setLoggedInUser,
        onConfirm:onLoginConfirm
    });

    const submitLogin = (formData) => {
        tryLogin(formData.email, formData.password);
    };

    return (
        <section>
            <h2>Login</h2>
            { !authToken && <LoginForm onSubmit={submitLogin}/> }
            { triedLogin && <LoadingBox loading={loading} error={error} errorMessage={errorMessage} /> }
            { authToken && <p>logged in.</p>}
        </section>
    );
}

export default LoginView
