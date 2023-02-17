import React from "react";
import BtnBack from "./components/BtnBack";
import { Link } from "react-router-dom";
import './style/favoris.css';

const Favoris = () => {
    const favoriteAnimes = JSON.parse(localStorage.getItem("favoriteAnimes"));
    console.log(favoriteAnimes);
    return(
        <div className="container">
            <div className="box">
                <div>
                    <h2 className="title">Mes Favoris</h2>
                </div>
                <BtnBack />
            </div>
            <div className="favorisGrid">
                {favoriteAnimes && favoriteAnimes.length>0 ? favoriteAnimes.map((anime,i) => 
                    <div key={i}>
                        <Link to={`/anime/${anime.id}`}>
                            <img src={anime.attributes.posterImage.small} alt={anime.attributes.canonicalTitle} />
                        </Link>
                    </div>
                ) : <h2 className="title">Ajouter des animes à vos favoris</h2>}
            </div>
        </div>
    );
}

export default Favoris;