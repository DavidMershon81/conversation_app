import { useForm } from 'react-hook-form';
import { FormTextInput } from './FormControls';
import { FormContext } from '../contexts/FormContext';

const LoginForm = ({ onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmitClick = (data) => {
        onSubmit(data);
    };

    return (
        <form className="input_form" onSubmit={handleSubmit(onSubmitClick)}>
            <FormContext.Provider value={{ register, errors }}>
                <FormTextInput type='email' varName='email' visibleName='email' />
                <FormTextInput type='password' varName='password' visibleName='password' />
            </FormContext.Provider>
            <input className="form_submit_btn" type="submit" value="Login"/>
        </form>
    );
}

export default LoginForm;
