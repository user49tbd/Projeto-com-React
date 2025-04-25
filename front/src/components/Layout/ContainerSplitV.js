import React from 'react';
import styles from './css/ContainerSplitV.module.css'; // Correção no nome da importação

export default function SplitV(props) {
    return (
        <div className={styles.Container}> {/* Corrigindo a aplicação da classe */}
            {props.children}
        </div>
    );
}