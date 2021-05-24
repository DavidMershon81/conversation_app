import { useForm } from 'react-hook-form';
import { FormTextInput, FormHiddenInput } from './FormControls';
import { FormContext } from '../contexts/FormContext';

const AddTestSignatureForm = ({ onSubmit, petition, user }) => {
    const { register, unregister, handleSubmit, formState: { errors }, watch } = useForm();
    const onSubmitClick = (data) => {
        onSubmit(data);
    };

    const btnLabel = `Sign Petition as ${user['email']}`;

    return (
        <form className="input_form" onSubmit={handleSubmit(onSubmitClick)}>
            <FormContext.Provider value={{ register, unregister, watch, errors }}>
                <FormTextInput type='number' varName='reveal_threshold' visibleName='reveal threshold' />
                <FormHiddenInput varName='petition_id' varValue={petition['id']} />
                <FormHiddenInput varName='user_id' varValue={user['id']} />
            </FormContext.Provider>
            <input className="form_submit_btn" type="submit" value={btnLabel}/>
        </form>
    );
}

export default AddTestSignatureForm;
