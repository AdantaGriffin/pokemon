import styles from './header.module.scss';
import React from 'react';

function Header(){
    return(
        <>
            <header className={styles.header}>
                <img src={'./Images/pikachu.png'}/>
                {/*<svg viewBox="0 0 200 30">
                <path id="curve" d="M 24,80 A 80,80 0 0,1 180,80" fill="transparent" />
                <text width="200" stroke="blue" stroke-width="1">
                  <textPath href="#curve" startOffset="50%" text-anchor="middle">
                    Pokemon
                  </textPath>
                </text>
              </svg>*/}
                <div className={styles.headerTitle}>
                    {/*<p className={styles.h1}>Pokemon</p>
                    <p className={styles.h2}>Gotta Catch 'Em All!</p>*/}
                </div>
                <img src={'./Images/ivysaur.png'}/>
            </header>
        </>
    )
};

export default Header;