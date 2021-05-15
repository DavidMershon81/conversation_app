import { useForm } from 'react-hook-form';
import { FormTextInput } from './FormControls';
import AddPetitionFormEmailSection from './AddPetitionFormControls';

const AddPetitionForm = () => {
    const { register, unregister, handleSubmit, formState: { errors }, watch } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <form className="input_form" onSubmit={handleSubmit(onSubmit)}>
            <FormTextInput register={register} errors={errors} type='text' varName='group_name' visibleName='group name' />
            <FormTextInput register={register} errors={errors} type='textarea' varName='petition_text' visibleName='petition text' />
            <AddPetitionFormEmailSection register={register} unregister={unregister} watch={watch} errors={errors} />
            <input className="form_submit_btn" type="submit" value="Create New Petition"/>
        </form>
    );
}

export default AddPetitionForm;
