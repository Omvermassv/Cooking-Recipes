import React from "react";
import useGlobalContext from "../Context";

function Favourites() {

    const { favourites, removeFromFavourites } = useGlobalContext();

    return (
        <section className="favourites">
            <div className="favourites-content">
                <h5>Favorites</h5>
                <div className='favourites-container'>
                    {favourites.map((item) => {
                        const { strMealThumb: image, strMeal: title, idMeal } = item;
                        return (<div key={idMeal} className='favourite-item'>
                            <p className='favourite-content' >{title}</p>
                            <img className='favourites-img img' src={image} alt={title}></img>
                            <button className='btn remove-btn' onClick={() => removeFromFavourites(idMeal)}>Remove</button>
                        </div>);
                    })}
                </div>
            </div>
        </section>
    );
}

export default Favourites;