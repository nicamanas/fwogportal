import React from 'react';
import RoleListingForm from '../../components/RoleListings/RoleListingForm';

function CreateRoleListing() {

    return (
        <div sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <RoleListingForm />
        </div>
    );
}

export default CreateRoleListing;
