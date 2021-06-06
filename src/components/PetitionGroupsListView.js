import useFetchData from  '../hooks/useFetchData'
import AddPetitionGroupForm from './AddPetitionGroupForm';
import { LoadingBox } from './MiscControls';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

const PetitionGroupsListView = () => {
  const { authToken } = useContext(AppContext);
  const { data:groups, addData:addGroup, loading, error } = useFetchData({ getUrl:'/api/petition_groups', postUrl:'/api/petition_groups', initAuth:authToken});
  
  return (
      <section>
        <h2>Petition Groups</h2>
        <AddPetitionGroupForm onSubmit={addGroup}/>
        <LoadingBox loading={loading} error={error} />
        <ul className='petition_groups_list_group'>
        {groups && groups.map((petitionGroup) => 
          <li className='petition_groups_list_item' key={petitionGroup['id']}>
            <Link className='petition_groups_list_btn' to={`/petition_group/${petitionGroup['id']}`}>View</Link>
            <span>id:{petitionGroup['id']}</span>
            <span>{petitionGroup['group_name']}</span>
          </li>)}
        </ul>
      </section>
  );
}

export default PetitionGroupsListView
