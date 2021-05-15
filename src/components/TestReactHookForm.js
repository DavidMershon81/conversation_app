import { useForm } from 'react-hook-form';
import { useState } from 'react';

const FormErrorMessage = ({ varName, visibleName, errors }) => {
    const errorPresent = errors[varName] != null;
    const requiredError = errorPresent && errors[varName].type === 'required';
    return requiredError ? (<span className='form_error_message'>{visibleName} required!</span>) : (<span></span>);
};

const FormTextInput = ({ register, varName, visibleName, type, errors }) => {
    const isTextArea = type === 'textarea';
    const formParams = { required: true};
    return (
        <>
            { isTextArea ? <textarea rows='10' className="form_text_area" placeholder={visibleName} {...register(varName, formParams)} /> :
            <input className="form_text_input" placeholder={visibleName} type={type} {...register(varName, formParams)} />}
            <FormErrorMessage varName={varName} visibleName={visibleName} errors={errors} />
        </>
    );
};

const FormRadioButton = ({ register, varName, valueName, valueText }) => {
    return (
        <label className="form_checkbox_container">
            <input {...register(varName, { required: true })} type="radio" value={valueName}/>{valueText}
            <span className="checkmark"></span>
        </label>
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
            <FormTextInput register={register} errors={errors} type='text' varName='group_name' visibleName='group name' />
            <FormTextInput register={register} errors={errors} type='textarea' varName='petition_text' visibleName='petition text' />
            <FormTextInput register={register} errors={errors} type='email' varName='username' visibleName='username' />
            <FormTextInput register={register} errors={errors} type='password' varName='password' visibleName='password' />
            
            <fieldset className="form_radio_button_set">
                <FormRadioButton register={register} varName='email_notification_type' valueName='listserv' valueText='Send petition to a single mailing list' />
                <FormRadioButton register={register} varName='email_notification_type' valueName='custom_emails' valueText='Send petition to a list of email addresses' />
                <FormErrorMessage varName='email_notification_type' visibleName='email notification type' errors={errors} />
            </fieldset>

            {
                selectedRadioBtn === 'custom_emails' &&
                (
                    <fieldset className='notification_emails_section'>
                    { customEmails.map((ce) => (<FormTextInput key={ce} register={register} errors={errors} type='email' varName={ce} visibleName={ce} />)) }
                    <input className="add_email_button" type="button" onClick={addCustomEmail} value="Add Another Email"/>
                    </fieldset>
                )
            }
            {
                selectedRadioBtn === 'listserv' &&
                (
                    <fieldset className='notification_emails_section'>
                        <FormTextInput register={register} errors={errors} type='email' varName='mailing_list_email' visibleName='mailing list email' />
                        <FormTextInput register={register} errors={errors} type='number' varName='total_petitioners' visibleName='maximum number of petition signers' />
                    </fieldset>
                )
            }

            <input className="form_submit_btn" type="submit" value="Create New Petition"/>
        </form>
    );
}

export default TestReactHookForm;
