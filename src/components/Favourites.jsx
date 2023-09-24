import React from "react";
import useGlobalContext from "../Context";

function Favourites() {

    const { favourites, removeFromFavourites, selectMeal } = useGlobalContext();

    return (
        <section className="favourites">
            <div className="favourites-content">
                <h5>Favourites</h5>
                <div className='favourites-container'>
                    {favourites.map((item) => {
                        const { strMealThumb: image, strMeal: title, idMeal } = item;
                        return (<div key={idMeal} className='favourite-item'>
                            <p className='favourite-content' >{title}</p>
                            <img className='favourites-img img' src={image} alt={title} onClick={()=>selectMeal(idMeal, true)}></img>
                            <button className='btn remove-btn' onClick={() => removeFromFavourites(idMeal)}>Remove</button>
                        </div>);
                    })}
                </div>
            </div>
        </section>
    );
}

export default Favourites;