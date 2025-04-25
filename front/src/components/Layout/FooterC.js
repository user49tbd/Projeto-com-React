import React from "react";
import Styles from "./css/FooterC.module.css"
export default function FooterC() {
    return (
        <footer className={Styles.footerC}>
            <div className={Styles.content1}>
                <h4>Agilidade na Saúde</h4>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat eum
                    temporibus dignissimos commodi tempore. Veritatis eum quos minus sequi
                    accusantium exercitationem magni sed quisquam illo, et alias. Veritatis,
                    inventore atque.
                </p>
                <div className={Styles.imgs}>
                    <img src="/assets/icons/facebook.png" />
                    <img src="/assets/icons/social.png" />
                    <img src="/assets/icons/twitter.png" />
                </div>
                <p>&copy;example&trade;</p>
            </div>
            <div className={Styles.content2}>
                <table>
                    <thead>
                        <tr>
                            <th>Links</th><th>Data</th><th>Objects</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>link1</td><td>dataMain</td><td>obj1</td></tr>
                        <tr><td>section</td><td>main</td><td>shape</td></tr>
                        <tr><td>other</td><td>database</td><td>format</td></tr>
                        <tr><td>search</td><td>topics</td><td>size</td></tr>
                        <tr><td>info</td><td>data</td><td>obj</td></tr>
                    </tbody>
                </table>
            </div>
        </footer>
    );
}