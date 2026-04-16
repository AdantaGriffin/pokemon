import styles from './header.module.scss';
import React from 'react';
import { Link } from 'react-router-dom';

function Header(){
    return(
        <>
            <Link to="/">
                <header className={styles.header}>
                    <img alt="pikachu" src={'./Images/pikachu.png'}/>
                    
                    <div className={styles.headerTitle}>
                        
                    </div>

                    <img alt="ivysaur" src={'./Images/ivysaur.png'}/>
                </header>
            </Link>
        </>
    )
};

export default Header;