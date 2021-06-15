import useLogin from  '../hooks/useLogin';
import LoginForm from './LoginForm';
import { LoadingBox } from './MiscControls';
import { useContext } from 'react'
import { AppContext } from '../contexts/AppContext';
import { useHistory, Redirect } from 'react-router-dom';

const LoginView = () => {
    const history = useHistory();
    const onLoginConfirm = () => {
        history.push('/');
    }

    const { loggedInUser, setLoggedInUser } = useContext(AppContext);
    const { triedLogin, tryLogin, loading, error, errorMessage } = useLogin({ 
        url:'/api/login', 
        setLoggedInUser:setLoggedInUser,
        onConfirm:onLoginConfirm
    });

    const submitLogin = (formData) => {
        tryLogin(formData.email, formData.password);
    };

    if(loggedInUser) {
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
