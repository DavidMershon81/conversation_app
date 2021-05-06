
 import TextEntryForm from './TextEntryForm'
 import useFetchData from  '../hooks/useFetchData'
 import FormFieldInfo from '../common/FormFieldInfo'

 const PetitionsView = () => {
    const [ petitions, getPetitions, addPetition, loading ] = useFetchData('/api/get_petitions', '/api/add_petition');
  
    const addUserFormFields = [
      new FormFieldInfo({name:'text'}),
      new FormFieldInfo({name:'email_domain'}),
      new FormFieldInfo({name:'max_users'})
    ];
  
    return (
        <section>
          <h2>Petitions</h2>
          <TextEntryForm formFields={addUserFormFields} submitBtnLabel='Add Petition' submitEvent={addPetition}/>
          <div className="loading_box">
            {loading && <p>Loading...</p>}
          </div>

          <ul>
          {petitions && petitions.map((petition) => 
            <li 
                key={petition['id']}>
                id: <strong>{petition['id']}</strong><br/>
                email_domain: <strong>{petition['email_domain']}</strong><br/>
                max_users: <strong>{petition['max_users']}</strong><br/>
                text: {petition['text']}
            </li>)}
          </ul>
        </section>
    );
  }

export default PetitionsView
