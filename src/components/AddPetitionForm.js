import { useForm } from 'react-hook-form';
import { FormTextInput } from './FormControls';
import { FormContext } from '../contexts/FormContext';

const AddPetitionForm = ({ onSubmit, petition_group_id }) => {
    const { register, unregister, handleSubmit, formState: { errors }, watch } = useForm();
    const onSubmitClick = (data) => {
        console.log(data);
        onSubmit({...data, petition_group_id: petition_group_id});
    };

    return (
        <form className="input_form" onSubmit={handleSubmit(onSubmitClick)}>
            <FormContext.Provider value={{ register, unregister, watch, errors }}>
                <FormTextInput type='textarea' varName='petition_text' visibleName='petition text' />
            </FormContext.Provider>
            <input className="form_submit_btn" type="submit" value="Add New Petition"/>
        </form>
    );
}

export default AddPetitionForm;
