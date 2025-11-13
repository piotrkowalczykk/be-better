import { useState } from "react";
import classes from "./Contact.module.css";

export const Contact = () => {

    const [contactData, setContactData] = useState({
        fullName: "",
        email: "",
        message: ""
    });


    const handleInputChange = (e) =>{
        const {name, value} = e.target;
        setContactData({
            ...contactData,
            [name]: value
        });
    }
    
    return (
        <div className={classes.contactContainer}>
            <div className={classes.contactTextContainer}>
                <h2 className={classes.contactTitle}>LET'S TALK</h2>
                <div className={classes.contactText}>
                    Please use the form below to contact us for technical support,
                    or with any questions or comments you may have. All fields are required.
                </div>
                <div className={classes.contactInputContainer}>
                    <div className={classes.innerInputContainer1}>
                        <div className={classes.inputContainer}>
                            <label htmlFor="fullName">Full name</label>
                            <input type="text" id="fullName" name="fullName" onChange={handleInputChange} placeholder="Your name" className={classes.contactInput}/>
                        </div>
                        <div className={classes.inputContainer}>
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" name="email" onChange={handleInputChange} placeholder="Your email" className={classes.contactInput}/> 
                        </div> 
                    </div>
                    <div className={classes.innerInputContainer2}>
                        <label htmlFor="message">Message</label>
                        <textarea id="message" name="message" onChange={handleInputChange} rows="10" placeholder="Your question" className={classes.contactTextarea}/>
                    </div>
                    <button className={classes.contactBtn}>SEND MESSAGE</button>
                </div>
            </div>
            <div className={classes.contactImgContainer}>
                <img src="/public/listy.png" className={classes.contactImg}/>
            </div>
        </div>
    );
}