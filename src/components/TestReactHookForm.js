import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { FormErrorMessage, FormTextInput, FormRadioButtonGroup } from './FormControls';

const AddPetitionFormEmailSection = ({ register, unregister, watch, errors }) => {
    const [customEmails, setCustomEmails] = useState([]);
    const selectedRadioBtn = watch("email_notification_type");
    const isListserv = selectedRadioBtn === 'listserv';
    const isCustomEmails = selectedRadioBtn === 'custom_emails';

    const radioButtonsConfig = [
        { valueName: 'listserv', valueText: 'Send petition to a single mailing list' },
        { valueName: 'custom_emails', valueText: 'Send petition to a list of email addresses' }
    ];

    const addCustomEmail = () => {
        const nextIndex = `custom_email_${customEmails.length}`;
        setCustomEmails([...customEmails, nextIndex]);
    };

    const toggleEmailType = (valueName) => {
        if(valueName === 'listserv') {
            unregister(customEmails);
            setCustomEmails([]);
        }
        else if(valueName === 'custom_emails') {
            unregister(['mailing_list_email', 'total_petitioners']);
            addCustomEmail();
        }
    };

    return (
        <fieldset className='notification_emails_section'>
            <FormRadioButtonGroup 
                register={register} varName='email_notification_type' visibleName='email notification type' 
                buttonsConfig={radioButtonsConfig} onClick={toggleEmailType} errors={errors} 
            />
            { isCustomEmails && (    
            <fieldset className='notification_emails_section'>
                { customEmails.map((ce) => (<FormTextInput key={ce} register={register} errors={errors} type='email' varName={ce} visibleName={ce} />)) }
                <input className="add_email_button" type="button" onClick={addCustomEmail} value="Add Another Email"/>
            </fieldset>)}
            
            {isListserv && (
            <fieldset className='notification_emails_section'>
                <FormTextInput register={register} errors={errors} type='email' varName='mailing_list_email' visibleName='mailing list email' />
                <FormTextInput register={register} errors={errors} type='number' varName='max_users' visibleName='maximum number of petition signers' />
            </fieldset>)}
        </fieldset>
    );
};

const TestReactHookForm = () => {
    const { register, unregister, handleSubmit, formState: { errors }, watch } = useForm();
    const onSubmit = data => console.log(data);

    //const meep = watch();
    //console.log(meep);

    return (
        <form className="input_form" onSubmit={handleSubmit(onSubmit)}>
            <FormTextInput register={register} errors={errors} type='text' varName='group_name' visibleName='group name' />
            <FormTextInput register={register} errors={errors} type='textarea' varName='petition_text' visibleName='petition text' />
            <FormTextInput register={register} errors={errors} type='email' varName='username' visibleName='username' />
            <FormTextInput register={register} errors={errors} type='password' varName='password' visibleName='password' />
            <AddPetitionFormEmailSection register={register} unregister={unregister} watch={watch} errors={errors} />
            <input className="form_submit_btn" type="submit" value="Create New Petition"/>
        </form>
    );
}

export default TestReactHookForm;
