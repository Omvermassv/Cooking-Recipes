import React, { useContext, useEffect, useState, createContext } from "react";
import axios from "axios";

const AppContext = createContext();

const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

const AppProvider = ({ children }) => {

    const [loading, setLoading] = useState(false);
    const [meals, setMeals] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [favourites, setFavourites] = useState(JSON.parse(localStorage.getItem('favourites')) || []);

    function addToFavourites(idMeal) {
        // if meal is already in favourites then we don't do anything
        const isAlreadyFavourite = favourites.find((meal) => (meal.idMeal === idMeal));
        if (isAlreadyFavourite) return;

        const mealToAdd = meals.find((meal) => (meal.idMeal === idMeal));
        setFavourites([...favourites, mealToAdd]);
    }

    function removeFromFavourites(idMeal) {
        const updatedFavourites = favourites.filter((meal) => (meal.idMeal !== idMeal));
        setFavourites(updatedFavourites);
    }

    function selectMeal(idMeal, favouriteMeal) {
        let meal = meals.find((singleMeal) => (singleMeal.idMeal === idMeal));

        setSelectedMeal(meal);
        setShowModal(true);
    }

    const fetchMeals = async (url) => {
        setLoading(true);
        try {
            const { data } = await axios(url);
            // if(data.meals){
            setMeals(data.meals);
            // }else{
            //     setMeals([]);
            // }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    const fetchRandomMeals = () => {
        fetchMeals(randomMealUrl);
    }

    useEffect(() => {
        fetchMeals(allMealsUrl);
    }, []);

    useEffect(() => {
        if (!searchTerm) return;
        fetchMeals(`${allMealsUrl}${searchTerm}`);
    }, [searchTerm]);

    useEffect(() => {
        localStorage.setItem('favourites', JSON.stringify(favourites));
    }, [favourites]);

    function closeModal() {
        setShowModal(false);
    }

    return (<AppContext.Provider value={{ loading, meals, setSearchTerm, fetchRandomMeals, showModal, closeModal, selectMeal, selectedMeal, favourites, addToFavourites, removeFromFavourites }}>
        {children}
    </AppContext.Provider>)
}

function useGlobalContext() {
    return (useContext(AppContext));
}

export default useGlobalContext;
export { AppContext, AppProvider };