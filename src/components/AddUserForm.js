import { useForm } from 'react-hook-form';
import { FormTextInput } from './FormControls';

const AddUserForm = ({ onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmitClick = (data) => {
        console.log(data);
        onSubmit(data);
    };

    return (
        <form className="input_form" onSubmit={handleSubmit(onSubmitClick)}>
            <FormTextInput register={register} errors={errors} type='email' varName='username' visibleName='username' />
            <FormTextInput register={register} errors={errors} type='password' varName='password' visibleName='password' />
            <input className="form_submit_btn" type="submit" value="Add New User"/>
        </form>
    );
}

export default AddUserForm;
