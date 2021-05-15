import { useForm } from 'react-hook-form';
import { useState } from 'react';

const FormErrorMessage = ({ name, visibleName, errors }) => {
    const errorPresent = errors[name] != null;
    const requiredError = errorPresent && errors[name].type === 'required';
    return requiredError ? (<span className='form_error_message'>{visibleName} required!</span>) : (<span></span>);
};

const FormTextInput = ({ register, name, visibleName, type, errors }) => {
    const isTextArea = type === 'textarea';
    const formParams = { required: true};
    return (
        <>
            { isTextArea ? <textarea rows='10' className="form_text_area" placeholder={visibleName} {...register(name, formParams)} /> :
            <input className="form_text_input" placeholder={visibleName} type={type} {...register(name, formParams)} />}
            <FormErrorMessage name={name} visibleName={visibleName} errors={errors} />
        </>
    );
};

const TestReactHookForm = () => {
    const { register, unregister, handleSubmit, formState: { errors }, watch } = useForm();
    const onSubmit = data => console.log(data);
    const selectedRadioBtn = watch("email_notification_type");
    const [customEmails, setCustomEmails] = useState([]);

    const addCustomEmail = () => {
        const nextIndex = `custom_email_${customEmails.length}`;
        setCustomEmails([...customEmails, nextIndex]);
    };

    const toggleEmailType = () => {
        if(selectedRadioBtn === 'listserv' && customEmails.length > 0) {
            unregister(customEmails);
            setCustomEmails([]);
        }
        else if(selectedRadioBtn === 'custom_emails' && customEmails.length < 1) {
            unregister(['mailing_list_email', 'total_petitioners']);
            addCustomEmail();
        }
    };

    toggleEmailType();

    return (
        <form className="input_form" onSubmit={handleSubmit(onSubmit)}>
            <FormTextInput register={register} errors={errors} type='text' name='group_name' visibleName='group name' />
            <FormTextInput register={register} errors={errors} type='textarea' name='petition_text' visibleName='petition text' />
            <FormTextInput register={register} errors={errors} type='email' name='username' visibleName='username' />
            <FormTextInput register={register} errors={errors} type='password' name='password' visibleName='password' />
            
            <fieldset className="form_radio_button_set">
                <label className="form_checkbox_container">
                    <input {...register("email_notification_type", { required: true })} type="radio" value="listserv"/>Send petition to a single mailing list
                    <span className="checkmark"></span>
                </label>
                <label className="form_checkbox_container">
                    <input {...register("email_notification_type", { required: true })} type="radio" value="custom_emails" />Send petition to a list of email addresses
                    <span className="checkmark"></span>
                </label>
            </fieldset>
            {errors['email_notification_type']?.type === 'required' && <span className='form_error_message'>Select an email notification type!</span>}
            
            {
                selectedRadioBtn === 'custom_emails' &&
                (
                    <fieldset className='notification_emails_section'>
                    { customEmails.map((ce) => (<FormTextInput key={ce} register={register} errors={errors} type='email' name={ce} visibleName={ce} />)) }
                    <input className="add_email_button" type="button" onClick={addCustomEmail} value="Add Another Email"/>
                    </fieldset>
                )
            }
            {
                selectedRadioBtn === 'listserv' &&
                (
                    <fieldset className='notification_emails_section'>
                        <input className="form_text_input" type="email" placeholder={"mailing list email"} {...register("mailing_list_email", { required: true})} />
                        <input className="form_text_input" type="number" placeholder={"maximum number of petition signers"} {...register("total_petitioners", { required: true})} />
                    </fieldset>
                    
                )
            }

            <input className="form_submit_btn" type="submit" value="Create New Petition"/>
        </form>
    );
}

export default TestReactHookForm;
