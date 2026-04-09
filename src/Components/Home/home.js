import styles from './home.module.scss';
import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';


function Card({ card }) {
    const navigate = useNavigate();

    function handleClick() {
      navigate(`${card.id}`);  // relative to parent "/"
    }
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth springs for natural motion
    const smoothX = useSpring(x, { stiffness: 120, damping: 20 });
    const smoothY = useSpring(y, { stiffness: 120, damping: 20 });

    function handleMovement(e) {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Normalize offset to [-1, 1]
        const offsetX = (e.clientX - centerX) / (rect.width / 2);
        const offsetY = (e.clientY - centerY) / (rect.height / 2);

        // Multiply by max rotation angle
        x.set(offsetY * 15); // rotateX = forward/back
        y.set(-offsetX * 15); // rotateY = left/right (negative to invert)
    }

    function mouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <div style={{ perspective: 800 }}>
                <motion.div
                    onMouseMove={handleMovement}
                    onMouseLeave={mouseLeave}
                    onClick={handleClick}
                    style={{
                        rotateX: smoothX,
                        rotateY: smoothY,
                        transformStyle: "preserve-3d",
                        willChange: "transform",
                    }}
                    whileHover={{ cursor:'pointer' }} // optional pop effect
                >
                    <img src={card.images.small} alt={card.name}/>
                </motion.div>
        </div>
    );
}

function Home() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const pageSize = 20;

    const toTop = () => window.scrollTo(0, 0);

    useEffect(() => {
        async function getData() {
            const response = await fetch(
                `https://api.pokemontcg.io/v2/cards?pageSize=${pageSize}&page=${page}`
            );
            const result = await response.json();
            setData(result.data);
            toTop();
        }

        getData();
    }, [page]);

    return (
        <section>
            <div className={styles.home}>
                <input type="text"/>
                <button>search</button>
                <div className={styles.homeHero}>
                    <h2>Bringing the world together through Pokémon</h2>
                    <p>
                        A refined and comprehensive library of Pokémon cards, 
                        meticulously curated with their corresponding market values.
                    </p>
                </div>
        
                <div className={styles.cardContainer}>
                    {data && data.length > 0 ? (
                        data.map(card => (
                            <Card key={card.id} card={card} />
                        ))
                    ) : (
                        <p className={styles.loadingStatement}>Loading cards...</p>
                    )}
                </div>
                
                <div className={styles.pagination}>
                    <button 
                        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                    >
                        Previous
                    </button>
                
                    <span>Page {page}</span>
                
                    <button onClick={() => setPage(prev => prev + 1)}>
                        Next
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Home;