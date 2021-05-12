import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

const TestReactHookForm = () => {
  const { register, unregister, handleSubmit, reset, formState: { errors }, watch } = useForm();
  const selectedRadioBtn = watch("email_notification_type");
  const [customEmails, setCustomEmails] = useState([]);

  const onSubmit = (data) => {
      console.log(data);
      reset();
  };

  const addEmail = () => {
      const nextIndex = `custom_email_${customEmails.length}`;
      setCustomEmails([...customEmails, nextIndex]);
  };

  useEffect(() => {
    if(selectedRadioBtn === 'listserv') {
        unregister(customEmails);
        setCustomEmails([]);
    }
    else if(selectedRadioBtn === 'individuals'){
        if(customEmails.length < 1) {
            addEmail();
            unregister('mailing_list_email');
            unregister('total_petitioners');
        }
    }
  },[selectedRadioBtn]);

  return (
    <form className="input_form" onSubmit={handleSubmit(onSubmit)}>

        <input className="form_text_input" placeholder="group name" {...register("group_name", { required: true})} />
        {errors['group_name']?.type === 'required' && <span className='form_error_message'>group name required!</span>}
        <textarea rows='10' className="form_text_area" placeholder="petition text" {...register("petition_text", { required: true})} />
        {errors['petition_text']?.type === 'required' && <span className='form_error_message'>petition text required!</span>}

        <input className="form_text_input" type="email" placeholder="username" {...register("username", { required: true})} />
        <input className="form_text_input" type="password" placeholder="password" {...register("password", { required: true})} />
        
        <fieldset className="form_radio_button_set">
            <label className="form_checkbox_container">
                <input {...register("email_notification_type", { required: true })} type="radio" value="listserv"/>Send petition to a single mailing list
                <span className="checkmark"></span>
            </label>
            <label className="form_checkbox_container">
                <input {...register("email_notification_type", { required: true })} type="radio" value="individuals" />Send petition to a list of email addresses
                <span className="checkmark"></span>
            </label>
        </fieldset>
        {errors['email_notification_type']?.type === 'required' && <span className='form_error_message'>Select an email notification type!</span>}
        
        {
            selectedRadioBtn === 'individuals' &&
            (
                <fieldset className='notification_emails_section'>
                    { customEmails.map((ce) => (<input key={ce} className="form_text_input" type="email" placeholder={ce} {...register(ce, { required: true})} />)) } 
                    <input className="add_email_button" type="button" onClick={addEmail} value="Add Another Email"/>
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
