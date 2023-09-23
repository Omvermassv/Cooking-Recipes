import React from "react";
import useGlobalContext from "../Context";

function Modal() {

    const { selectedMeal, closeModal } = useGlobalContext();

    // console.log(selectedMeal);
    const { strMealThumb: image, strMeal: title, strInstructions: instructions, strSource: source } = selectedMeal;


    return (
        <aside className='modal-overlay'>
            <div className='modal-container' >
                <img
                    className='modal-img'
                    src={image}
                    alt={title} />
                <div className='modal-content'>
                    <h4>{title}</h4>
                    <p>Cooking Instructions</p>
                    <p>{instructions}</p>
                    <a href={source} target='_blank' rel="noreferrer">Original Source</a>
                    <button type="button" className='btn btn-hipster close-btn' onClick={closeModal}>Close</button>
                </div>
            </div>
        </aside>);
}

export default Modal;