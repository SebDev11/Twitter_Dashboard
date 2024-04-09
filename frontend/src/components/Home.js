import React from "react";

//import css
import './Home.css';

//import images
import Logo from '../images/Logo.png'
import AboutUSDeco1 from '../images/AboutUSDeco_1.png'
import AboutUSDeco2 from '../images/AboutUSDeco_2.png'
import AboutUSImage from '../images/aboutUsImage.png'
import Mail from '../images/mail.png'
import Phone from '../images/phone.png'
import Feedback from '../images/feedback.png'

const Home = () => {
  return (
        <div className="homeContainer">

            {/* Home - Home sector */}
            <div className="firstSectorHome">
                <div className="firstSecOverlay">
                    <div className="firstSectorAlignDiv">
                        <div className="logoContainer">
                            <img src={Logo} />
                        </div>
                        <div className="InfoContainer">
                            <h1>Elegance in Every Espresso</h1>
                            <p>Where Every Sip is a Symphony of Flavor</p>
                            <button className="exploreBtn">Explore</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Home - About Us sector */}
            <div className="secondSectorHome">
                <div className="secondSecOverlay">
                    <div className="secondSectorAlignDiv">
                        <div className="widthContiner">
                            <div className="AboutTextContainer">
                                <img src={AboutUSDeco1} />
                                <h1>About Us</h1>
                                <img src={AboutUSDeco2} />
                            </div>
                            <div className="aboutSpanText">
                                <p>Welcome to Espresso Elegance, where the classy appeal of Marine Drive, Colombo, combines with the enchanting aroma of freshly made coffee and pastries.</p>
                            </div>
                        </div>
                        <div className="aboutUsContent">
                            <div className="aboutWidthContentContiner">
                                <p className="column">
                                    Welcome to Espresso Elegance, the brainchild of owner Thilan Manamperi, located along the vibrant Marine Drive in Colombo.<br/> <br/>
                                    Since 2023, under Thilan's guidance, we've dedicated ourselves to providing a haven where coffee aficionados and pastry lovers alike can indulge in the finest offerings.<br/> <br/>
                                    With a commitment to freshness and quality ingrained in our ethos, every cup of coffee and each pastry served reflects Thilan's passion for excellence.<br/> <br/>
                                    Join us at Espresso Elegance and experience the vision of Thilan Manamperi come to life, where every sip and every bite is a testament to our dedication to perfection.
                                </p>
                                <img src={AboutUSImage} className="column" />
                            </div>
                        </div>
                    </div>
                </div> 
            </div>


            {/* Home - Contact Us sector */}
            <div className="thirdSectorHome">
                <div className="thirdSecOverlay">
                    <div className="thirdSectorAlignDiv">
                        <div className="widthContiner">
                            <div className="ContactTextContainer">
                                <h1>Contact</h1>
                            </div>
                            <div className="ContactContent">
                                <div className="contactCard">
                                    <img src={Mail} />
                                    <h5>Email Us</h5>
                                    <p>cafeespressoelegance@gmail.com</p>
                                </div>
                                <div className="contactCard">
                                    <img src={Phone} />
                                    <h5>Call Us</h5>
                                    <p>cafeespressoelegance@gmail.com</p>
                                </div>
                                <div className="contactCard">
                                    <img src={Feedback} />
                                    <h5>Provide Feedback</h5>
                                    <p>cafeespressoelegance@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>

        </div>
  )
};

export default Home;
