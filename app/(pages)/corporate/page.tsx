// pages/index.js

import React from 'react';
import styles from './Home.module.css';

export default function Home() {
    return (
        <div className={styles.container}>

            <div className={styles.mainContent}>
                <div className={styles.hero}>
                    <h1>Your Future Your <span className={styles.route}>Route</span></h1>
                    <p>Guiding your journey as you build a future</p>
                    <p>Discover what’s possible with your training partner, CeRRoute:</p>
                    <ul className={styles.bulletPoints}>
                        <li>Custom training programs</li>
                        <li>Comprehensive analytics</li>
                        <li>Industry-specific content</li>
                        <li>Expert guidance</li>
                    </ul>
                    <button className={styles.heroButton}>Get Started</button>
                </div>

                <form className={styles.form}>
                    <Image
                        src="/example.jpg"
                        alt="Example Image"
                        width={500}
                        height={500}
                        className={styles.image}
                    />
                <div className={styles.formRow}>
                        <input type="text" placeholder="First Name" className={styles.input} />
                        <input type="text" placeholder="Last Name" className={styles.input} />
                    </div>
                    <input type="email" placeholder="Work Email" className={styles.input} />
                    <input type="tel" placeholder="Phone Number" className={styles.input} />
                    <select className={styles.select}>
                        <option>Location </option>
                    </select>
                    <input type="text" placeholder="Company Name" className={styles.input} />
                    <div className={styles.formRow}>
                        <select className={styles.select}>
                            <option>Company Size </option>
                        </select>
                        <select className={styles.select}>
                            <option>Number of people to train </option>
                        </select>
                    </div>
                    <div className={styles.formRow}>
                        <input type="text" placeholder="Job Title" className={styles.input} />
                        <select className={styles.select}>
                            <option>Job Level </option>
                        </select>
                    </div>
                    <textarea placeholder="What are your organization's training needs? (Optional)" className={styles.textarea}></textarea>
                    <button type="submit" className={styles.submitButton}>Submit</button>
                </form>
            </div>


        </div>
    );
}
