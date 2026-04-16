import styles from './details.module.scss';
import {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import { motion } from 'motion/react';

function Details(){
    const {id} = useParams();
    const [details, setDetails] = useState([]);
    const filteredData = details.filter(x => x.id === id);
//console.log(filteredData);
    useEffect(() => {
        async function getDetails(){
            const response = await fetch(`https://api.pokemontcg.io/v2/cards`);
            const result = await response.json();
            //console.log(result.data);
            setDetails(result.data);
        }
        getDetails()
    }, []);
    console.log(filteredData)
    return (
        <>
            <section className={styles.details}>
                
                {filteredData.length > 0 ? (
                    <div className={styles.detailsStyle} key={filteredData[0].id}>
                        <img className={styles.detailImg} src={filteredData[0].images.small} alt={filteredData[0].name} />
                        <div className={styles.data}>
                            <h3>{filteredData[0].name}</h3>
                            <p>Set: {filteredData[0].set.name}</p>
                            <p>Rarity: {filteredData[0].rarity}</p>
                            <p>{filteredData[0].cardmarket.prices.trendPrice}</p>
                        </div>
                        <p className={styles.flavor}>
                            {filteredData[0].flavorText}
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