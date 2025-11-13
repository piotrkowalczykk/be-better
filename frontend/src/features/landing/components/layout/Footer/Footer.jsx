import classes from "./Footer.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram, faYoutube} from '@fortawesome/free-brands-svg-icons';

export const Footer = () => {
    return (
        <div className={classes.footerContainer}>
            <div className={classes.footerInnerContainer1}>
                <div className={classes.footerData1}>
                    <h3 className={classes.footerTitle}>About the website</h3>
                    <a href="#home" className={classes.footerLink}>Home</a>
                    <a href="#about" className={classes.footerLink}>About us</a>
                    <a href="#contact" className={classes.footerLink}>Contact</a>
                </div>
                <div className={classes.footerData2}>
                    <h3 className={classes.footerTitle}>Get in touch</h3>
                    <a href="https://github.com/piotrkowalczykk" target="_blank" className={classes.footerLink}><FontAwesomeIcon icon={faGithub} /> Github</a>
                    <a href="https://github.com/piotrkowalczykk" target="_blank" className={classes.footerLink}><FontAwesomeIcon icon={faYoutube} /> Youtube</a>
                    <a href="https://github.com/piotrkowalczykk" target="_blank" className={classes.footerLink}><FontAwesomeIcon icon={faInstagram} /> Instagram</a>
                </div>
            </div>
            <div className={classes.footerInnerContainer2}>
                <h3 className={classes.footerText}>© 2025 BeeBetter | All Rights Reserved</h3>
            </div>
        </div>
    );
}