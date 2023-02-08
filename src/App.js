import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';


import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


                                      
        

function App() {
  const [animes, setAnimes] = useState([]);
  const API_URL = 'https://kitsu.io/api/edge/anime';

  const [selectedCity, setSelectedCity] = useState(null);
  const cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
  ];


  useEffect(() => {
    axios.get(API_URL)
      .then(res => setAnimes(res.data.data))
      .catch(error => console.log(error));
  });

  return (
    <div className='container'>
      <div className="card flex flex-wrap justify-content-center gap-3">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText placeholder="Search" />
        </span>
        <span className="p-input search">
        <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" placeholder="Année" className="w-full md:w-14rem border-cyan-500" />
        </span>
        <span className="p-input dropDown">
            <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" placeholder="Age Recommandé" className="w-full md:w-14rem" />
        </span>
      </div>
      <div className="card table">
          <h3 className='title'>Catalogue</h3>
          <DataTable value={animes} responsiveLayout="scroll">
              <Column field="attributes.canonicalTitle" header="Titre" sortable></Column>
              <Column field="attributes.titles.ja_jp" header="Titre Japonais" sortable></Column>
              <Column field="attributes.ageRatingGuide" header="Age Recommendé" sortable></Column>
              <Column field="attributes.ratingRank" header="Rang" sortable></Column>
          </DataTable>
      </div>
      <div className='btnFavoris'>
        <Button icon="pi pi-heart" label="Voir les favoris" className="p-button-rounded" iconPos="right" />
      </div>
    </div>
  );
}

export default App;
