import styles from './details.module.scss';
import {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";

function Details(){
    const {id} = useParams();
    const [details, setDetails] = useState([]);
    const filteredData = details.filter(x => x.id === id);
console.log(filteredData);
    useEffect(() => {
        async function getDetails(){
            const response = await fetch(`https://api.pokemontcg.io/v2/cards`);
            const result = await response.json();
            console.log(result.data);
            setDetails(result.data);
        }
        getDetails()
    }, [])
    return (
        <>
            <section className={styles.details}>
                {filteredData.length > 0 ? (
                filteredData.map(card => (
                    <div className={styles.detailsStyle} key={card.id}>
                        <img src={card.images.small} alt={card.name} />
                        <div className={styles.data}>
                            <h3>{card.name}</h3>
                            <p>Set: {card.set.name}</p>
                            <p>Rarity: {card.rarity}</p>
                            <p>{card.cardmarket.prices.trendPrice}</p>
                        </div>
                        <p className={styles.flavor}>
                            {card.flavorText}
                        </p>
                    </div>
                ))
            ) : (
                <p>Loading card details...</p>
            )}

            </section>
        </>
    )
};

export default Details;