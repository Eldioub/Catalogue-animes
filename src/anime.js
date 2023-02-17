import React, { useEffect ,useState } from "react";
import { useParams } from "react-router-dom";
import BtnFavoris from "./components/BtnFavoris";
import BtnBack from "./components/BtnBack";
import { Button } from 'primereact/button';
import axios from "axios";
import './style/anime.css';


const AnimeDetail = () => {
    const {id} = useParams();
    const url = `https://kitsu.io/api/edge/anime/${id}`;
    const [anime, setAnime] = useState(null);

    useEffect(() => {
            const fetchData = async () => {
            const res = await axios.get(url);
            setAnime(res.data.data);
        };
        fetchData();   
    });

    const [favoriteAnimes, setFavoriteAnimes] = useState(() => localStorage.getItem("favoriteAnimes") || []);
    //console.log(favoriteAnimes);
    const favorisInitial = favoriteAnimes.some(f => f.id === id) ? ["Retirer aux favoris",'pi pi-heart-fill', 'p-button-rounded'] : ["Ajouter aux favoris", 'pi pi-heart','p-button-outlined'];
    const [favoris, setFavoris] = useState(favorisInitial);
    const addRemoveFavoris = () => {
        if (favoriteAnimes.some(f => f.id === id)) {
          setFavoriteAnimes((prev) => prev.filter((f) => f.id !== id));
          setFavoris(["Ajouter aux favoris",'pi pi-heart', 'p-button-outlined']);
        } else {
          setFavoriteAnimes((prev) => [...prev, anime]);
          setFavoris(["Retirer aux favoris",'pi pi-heart-fill','p-button-rounded']);
        }
        localStorage.setItem("favoriteAnimes", favoriteAnimes);
    };

    return(
        <div className="container">
            <div className="animeDetailContainer">
                <div className="centerBtn">
                    <img className="coverImage" src={anime ? anime.attributes.coverImage?.original : ''} alt={anime ? anime.attributes.canonicalTitle : 'No Iamge Found'} />
                    <BtnBack />
                </div>
                <div>
                    <img className="posterImage" src={anime ? anime.attributes.posterImage?.original : ''} alt={anime ? anime.attributes.canonicalTitle : 'No Iamge Found'} />
                </div>
                <div className="h-30">
                    <div className="titleBox">
                        <h2 className="titleAnime">{anime ? anime.attributes.canonicalTitle : 'No Title Found'}</h2>
                        <span className="rang">° Rang {anime ? anime.attributes.ratingRank : 'N/A'}</span>
                    </div>
                    <div className="addFavoris">
                        <Button type="button" label={favoris[0]} icon={favoris[1]} iconPos="right" className={favoris[2]}  onClick={addRemoveFavoris} />
                    </div>
                    <div className="synopsis">
                        <p>{anime ? anime.attributes.synopsis : ''}</p>
                    </div>
                </div>
            </div>
            <div className="btnFavoris">
                <BtnFavoris />
            </div>
        </div>
    );
}

export default AnimeDetail;