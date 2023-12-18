'use client'

import Container from '../../general/container/container'
import QuoteForm from '../../general/quoteForm/quoteForm'
import Subtitle from '../../ui/subtitle/subtitle'
import styles from './getQuote.module.scss'

// Компонен обертку над формой заявки
const GetQuote = () => {
    return (
        <section className={styles.section}>
            <Container>
                <div className={styles.inner}>
                    <div className={styles.header}>
                        <div className={styles.subtitle}>
                            <Subtitle>Get a response within 48 h.</Subtitle>
                        </div>
                        <div className={styles.title}>Get Quote</div>
                        <div className={styles.text}>Enter product, details, quantity, country and contact</div>
                    </div>
                    <div className={styles.form}>
                        <QuoteForm />
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default GetQuote