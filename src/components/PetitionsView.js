import useFetchData from  '../hooks/useFetchData'
import AddPetitionForm from './AddPetitionForm';
 
const PetitionsView = () => {
  const [ petitions, addPetition, loading, error ] = useFetchData('/api/get_petitions', '/api/add_petition');

  return (
      <section>
        <h2>Petitions</h2>
        <AddPetitionForm onSubmit={addPetition}/>
        <div className="loading_box">
          {loading && <p>Loading...</p>}
          {error && <p>error: can't connect to server.</p>}
        </div>

        <ul>
        {petitions && petitions.map((petition) => 
          <li 
              key={petition['id']}>
              <strong>id:</strong> {petition['id']}<br/>
              <strong>group_name:</strong> {petition['group_name']}<br/>
              <strong>listserv_email:</strong> {petition['listserv_email']}<br/>
              <strong>petition_text:</strong> {petition['petition_text']}
          </li>)}
        </ul>
      </section>
  );
}

export default PetitionsView
