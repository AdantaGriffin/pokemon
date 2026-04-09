import styles from './root.module.scss';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/header';

function Root(){
    return(
        <section className={styles.root}>
            <Header/>
            <main>
                <Outlet/>
            </main>
        </section>
    )
};

export default Root;