import React from 'react';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

const BtnBack = () => {
    return(
        <Link to={`/`} className="link cover">
          <Button icon="pi pi-undo" className="p-button-rounded" label='Retourner au catalogue' />
        </Link>
    );
}

export default BtnBack;