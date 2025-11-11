import classes from "./About.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';

export const About = () => {
    return (
        <div className={classes.aboutContainer}>
            <div className={classes.aboutSection1}>
                <div className={classes.textContainer}>
                    <h2 className={classes.title}>OUR MISSON</h2>
                    <p className={classes.text}>
                        Our platform is dedicated to helping fitness enthusiasts take full control of their training journey.
                        We provide tools to plan personalized workouts, track daily exercises, and analyze progress through clear,
                        interactive charts. Our goal is to empower users to stay motivated, measure improvements, and achieve their
                        fitness goals efficiently and safely.
                    </p>
                </div>
                <div className={classes.imgContainer}>
                    <img src="/public/img1.png" className={classes.imgAbout}/>
                </div>
            </div>
            <div className={classes.aboutSection2}>
                <div className={classes.imgContainer}>
                    <img src="/public/student.png" className={classes.imgAbout}/>
                </div>
                <div className={classes.textContainer}>
                    <h2 className={classes.title}>OUR STORY</h2>
                    <p className={classes.text}>
                        This website is developed as part of a Software Engineering project by a student, combining a passion for fitness
                        with a love for technology. From planning workouts to logging daily routines and reviewing progress, every feature
                        is designed to make the training process smarter and more engaging. We aim to create a practical and intuitive
                        tool that not only supports personal fitness growth but also showcases the power of thoughtful software design.
                    </p>
                </div>
            </div> 
            <div className={classes.aboutSection3}>
                <div className={classes.aboutData}>
                    <h3 className={classes.title2}>Users</h3>
                    <p className={classes.text2}><FontAwesomeIcon icon={faUsers} /> 422</p>
                </div>
                <div className={classes.aboutData}>
                    <h3 className={classes.title2}>Lifted Weight</h3>
                    <p className={classes.text2}><FontAwesomeIcon icon={faDumbbell} />  323 323 kg</p>
                </div>
                <div className={classes.aboutData}>
                    <h3 className={classes.title2}>Database exercises</h3>
                    <p className={classes.text2}><FontAwesomeIcon icon={faDatabase} />  156</p>
                </div>
            </div> 
        </div>
    );
}