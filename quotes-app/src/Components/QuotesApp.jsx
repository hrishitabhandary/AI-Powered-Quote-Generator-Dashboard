import { useState, useEffect } from "react";
import { getRandom } from "@divyanshu013/inspirational-quotes";

const QuotesApp = () => {
    const [quote, setQuote] = useState({
        text: "Ask not what your country can do for you, but what you can do for your country",
        author: "John Kennedy"
    });

    const [favorites, setFavorites] = useState(() => {
        const stored = localStorage.getItem("favorites");
        return stored ? JSON.parse(stored) : [];
    });

    const [showFavourites, setShowFavorites] = useState(false);

    const fetchNewQuote = () => {
        const quoteObj = getRandom();
        setQuote({
            text: quoteObj.quote,
            author: quoteObj.author,
        });
    };

    const toggleFavorites = () => {
        setShowFavorites(!showFavourites);
    };

    const addToFavorites = () => {
        const isAlreadyInFavorites = favorites.some(
            (fav) => fav.text === quote.text && fav.author === quote.author
        );
        if (!isAlreadyInFavorites) {
            const updatedFavorites = [...favorites, quote];
            setFavorites(updatedFavorites);
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // ✅ Save to localStorage
        }
    };

    const removeFromFavorites = (index) => {
        const updatedFavorites = favorites.filter((_, i) => i !== index);
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // ✅ Update localStorage
    };

    return (
        <div className="container">
            <div className="quotes-app">
                <h1 className="app-heading">Quote.</h1>
                <i className="bx bxs-heart fav-icon" onClick={toggleFavorites}  title="Show Favorites" ></i>
            
                <div className="quote">
                    <i className="bx bxs-quote-alt-left left-quote"></i>
                    <p className="quote-text">{quote.text}</p>
                    <p className="quote-author">{quote.author}</p>
                    <i className="bx bxs-quote-alt-right right-quote"></i>
                </div>

                <div className="circles">
                    <div className="circle-1"></div>
                    <div className="circle-2"></div>
                    <div className="circle-3"></div>
                    <div className="circle-4"></div>
                </div>

                <div className="buttons">
                    <button className="btn btn-new" onClick={fetchNewQuote}>New Quote</button>
                    <button className="btn btn-fav" onClick={addToFavorites}>Add to Favourites</button>
                </div>

                {showFavourites && (
                    <div className="favorites">
                        <button className="btn-close" onClick={toggleFavorites}>
                            <i className="bx bx-x"></i>
                        </button>
                        {favorites.map((favQuote, index) => (
                            <div className="fav-quote" key={index}>
                                <div className="fav-quote-delete">
                                    <i className="bx bx-x-circle" onClick={() => removeFromFavorites(index)}></i>
                                </div>
                                <div className="fav-quote-content">
                                    <div className="fav-quote-text">{favQuote.text}</div>
                                    <div className="fav-quote-author">{favQuote.author}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuotesApp;
