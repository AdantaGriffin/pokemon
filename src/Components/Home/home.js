import styles from './home.module.scss';
import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useNavigate } from 'react-router-dom';

function Card({ card }) {
    const navigate = useNavigate();

    function handleClick() {
      navigate(`${card.id}`);  
    }
    const x = useMotionValue(0);
    const y = useMotionValue(0);

   
    const smoothX = useSpring(x, { stiffness: 120, damping: 20 });
    const smoothY = useSpring(y, { stiffness: 120, damping: 20 });

    function handleMovement(e) {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        
        const offsetX = (e.clientX - centerX) / (rect.width / 2);
        const offsetY = (e.clientY - centerY) / (rect.height / 2);

        
        x.set(offsetY * 20); 
        y.set(-offsetX * 20); 
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
                    onPointerMove={handleMovement}
                    onPointerLeave={mouseLeave}
                    onClick={handleClick}
                    whileTap={{ scale: 0.95 }}
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
    const [text, setText] = useState('');

    const toTop = () => window.scrollTo(0, 0);

    useEffect(() => {
        async function getData() {
            const response = await fetch(
                `https://api.pokemontcg.io/v2/cards?q=${text}`
            );
            const result = await response.json();
            setData(result.data);
            toTop();
        }

        getData();
    }, [page, text]);

    const handleTextChange = (event) => {
        setText(event.target.value.toLowerCase()); 
        
    };
    const findPokemon = (text) => (ex) =>
    ex.name.toLowerCase().startsWith(text.toLowerCase());
    console.log(data)
    return (
        <section>
            <div className={styles.home}>
                <input onChange={handleTextChange} value={text}  type="text"/>
                <div className={styles.homeHero}>
                    <h2>Bringing the world together through Pokémon</h2>
                </div>
        
                <div className={styles.cardContainer}>
                    {data && data.length > 0 ? (
                        data?.filter(findPokemon(text)).map(card => (
                            <Card key={card.id} card={card} />
                        ))
                    ) : (
                        <>
                            
                            <p className={styles.loadingStatement}>Loading cards...</p>
                        </>
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