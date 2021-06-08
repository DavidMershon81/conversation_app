import useFetchData from  '../hooks/useFetchData'
import AddPetitionGroupForm from './AddPetitionGroupForm';
import { LoadingBox } from './MiscControls';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

const UserHomeView = () => {
    const { authToken } = useContext(AppContext);
    const { data:groups, addData:addGroup, loading, error, errorMessage } = useFetchData({ 
        getUrl:'/api/petition_groups', 
        postUrl:'/api/petition_groups',
        authToken:authToken
    });
    
    return (
        <section>
            <h2>User Home View</h2>
            <p>Welcome to the petition app!</p>

            <p>Here are a list of the petition groups that you're a member of</p>
            <ul className='petition_groups_list_group'>
            {groups && groups.map((petitionGroup) => 
            <li className='petition_groups_list_item' key={petitionGroup['id']}>
                <Link className='petition_groups_list_btn' to={`/petition_group/${petitionGroup['id']}`}>View</Link>
                <span>id:{petitionGroup['id']}</span>
                <span>{petitionGroup['group_name']}</span>
            </li>)}
            </ul>

            <p>Use this form to add a new petition group</p>
            <AddPetitionGroupForm onSubmit={addGroup}/>
            <LoadingBox loading={loading} error={error} errorMessage={errorMessage} />
        </section>
    );
}

export default UserHomeView
