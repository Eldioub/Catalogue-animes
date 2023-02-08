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

  const [selectedSeasonYear, setSelectedSeasonYear] = useState(null);
  const [selectedAgeRating, setSelectedAgeRating] = useState(null);
  const [seasonYearsList, setSeasonYearsList] = useState([]);
  const [ageRatingsList, setAgeRatingsList] = useState([]);
  const [ageRatingGuidsList, setAgeRatingGuidsList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(API_URL);
      setAnimes(res.data.data);
      setSeasonYearsList(Array.from(new Set(res.data.data.map((anime) => anime.attributes.startDate.slice(0, 4))) ));
      setAgeRatingsList(Array.from(new Set(res.data.data.map((anime) => anime.attributes.ageRatingGuide))));
      setAgeRatingGuidsList(Array.from(new Set(res.data.data.map((anime) => anime.attributes.ageRating))));
    };
    fetchData();
  }, []);

  const ageList = [];
  for(let i=0 ; i<ageRatingsList.length ; i++){
   ageList.push({name: ageRatingsList[i], code: ageRatingGuidsList[i]})
  }

  /*
  const fetchDataBySeasonYear = useEffect((seasonYear) => {
    const fetchData = async (seasonYear) => {
      const res = await axios.get(`${API_URL}?filter[seasonYear]=${seasonYear}`);
      setAnimes(res.data.data);
    };
    fetchData();
  }, []);
  */


  const linkTemplate = (rowData) => {
    return (
      <a href={`https://kitsu.io/anime/${rowData.id}`} target="_blank" rel="noopener noreferrer">Voir details</a>
    );
  };  

  

  return (
    <div className='container'>
      <div className="card flex flex-wrap justify-content-center gap-3">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText placeholder="Search" />
        </span>
        <span className="p-input search">
        <Dropdown value={selectedSeasonYear} onChange={(e) => setSelectedSeasonYear(e.value)} options={seasonYearsList} placeholder="Année" className="w-full md:w-14rem" />
        </span>
        <span className="p-input dropDown">
            <Dropdown value={selectedAgeRating} onChange={(e) => setSelectedAgeRating(e.value)} options={ageList} optionLabel="name" optionValue='code' placeholder="Age Recommandé" className="w-full md:w-14rem" />
        </span>
      </div>
      <div className="card table">
          <h3 className='title'>Catalogue</h3>
          <DataTable value={animes} responsiveLayout="scroll">
              <Column field="attributes.canonicalTitle" header="Titre" sortable></Column>
              <Column field="attributes.titles.ja_jp" header="Titre Japonais" sortable></Column>
              <Column field="attributes.ageRatingGuide" header="Age Recommendé" sortable></Column>
              <Column field="attributes.ratingRank" header="Rang" sortable></Column>
              <Column field="id" header="" body={linkTemplate}></Column>
          </DataTable>
      </div>
      <div className='btnFavoris'>
        <Button icon="pi pi-heart" label="Voir les favoris" className="p-button-rounded" iconPos="right" />
      </div>
    </div>
  );
}

export default App;
