import styles from './details.module.scss';
import {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import { motion } from 'motion/react';

function Details(){
    const {id} = useParams();
    const [details, setDetails] = useState(null);
//console.log(filteredData);
    useEffect(() => {
        async function getDetails(){
            const response = await fetch(`https://api.pokemontcg.io/v2/cards/${id}`);
            const result = await response.json();
            //console.log(result.data);
            setDetails(result.data);
        }
        getDetails()
    }, [id]);
    console.log(details)
    return (
        <>
            <section className={styles.details}>
                
                {details ? (
                    <div className={styles.detailsStyle} key={details.id}>
                        <img className={styles.detailImg} src={details.images.small} alt={details.name} />
                        <div className={styles.data}>
                            <h3>{details.name}</h3>
                            <p>Set: {details.set.name}</p>
                            <p>Rarity: {details.rarity}</p>
                            <p>Price: ${details.cardmarket ? details.cardmarket.prices.averageSellPrice : details.tcgplayer.prices.holofoil.market}</p>
                        </div>
                        <p className={styles.flavor}>
                            {details.flavorText}
                        </p>
                    </div>
                
            ) : (
                <>
                    <motion.img 
                    className={styles.imgDetail}
                    alt="ivysaur" 
                    src={'/Images/pokeball.png'} 
                    width="40px"
                    animate={{rotate:360}}
                    transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "linear"
                    }}/>
                    

                    <p className={styles.loading}>Loading card details...</p>
                </>
            )}

            </section>
        </>
    )
};

export default Details;