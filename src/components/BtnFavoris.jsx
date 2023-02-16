import React from 'react';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

const BtnFavoris = () => {
    return(
        <Link to={`/favoris`} className='link'>
          <Button icon="pi pi-heart-fill" className="p-button-rounded" iconPos="right" label='Voir les favoris' />
        </Link>
    );
}

export default BtnFavoris;