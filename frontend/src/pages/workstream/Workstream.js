import React from 'react'
import { Fieldset } from 'primereact/fieldset';
import { Avatar } from 'primereact/avatar';
import { AvatarGroup } from 'primereact/avatargroup';
import { useNavigate } from 'react-router-dom';


const Workstream = (props) => {
    const navigate = useNavigate()
    const {
        id,
        owner,
        created_at,
        updated_at,
        name,
        users,
        is_owner,
    } = props;
    const mystyle = {
        height: "25vh"
    };

    const legendTemplate = (
        <div className="flex align-items-center gap-2 px-2">
            <span className='pi pi-folder mr-2 text-4xl'/>
            <span className="font-bold">{name}</span>
        </div>
    );

    return (
        <Fieldset style={mystyle} className='mx-2 mt-2 text-sm' legend={legendTemplate} onClick={() => {navigate(`/workstream/${id}`)}}>
                <span className='mx-2'>Paticipants</span>
                <span className='pi pi-users' />
                <div className="card flex justify-content-start">
                <AvatarGroup>
                {users?.map((user, idx) => (
                    <Avatar image={user?.profile_avatar} shape="circle" size="medium" key={idx}/>
                ))}
                </AvatarGroup>
            </div>
        </Fieldset>
    )
}

export default Workstream
