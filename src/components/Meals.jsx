import React from "react";
import useGlobalContex from '../Context';
import { BsHandThumbsUp } from 'react-icons/bs';

function Meals() {

    const { loading, meals, selectMeal, addToFavourites } = useGlobalContex();

    if (loading) {
        return (
            <section className="section">
                <h4>Loading...</h4>
            </section>
        );
    }

    // if(meals.length < 1){
    if (meals === null) {
        return (
            <section className="section">
                <h4>No meals matched your search. Please try Again.</h4>
            </section>
        );
    }

    return (
        <section className="section-center">
            {
                meals.map((singleMeal) => {
                    const { idMeal, strMeal: title, strMealThumb: image } = singleMeal
                    return (
                        <article
                            key={idMeal}
                            id={idMeal}
                            className="single-meal">
                            <img
                                src={image}
                                alt={title}
                                className="img"
                                onClick={() => { selectMeal(idMeal) }} />
                            <footer>
                                <h5>{title}</h5>
                                <button className='like-btn' onClick={()=>addToFavourites(idMeal)}><BsHandThumbsUp /></button>
                            </footer>
                        </article>
                    );
                })
            }
        </section>
    );
}

export default Meals;