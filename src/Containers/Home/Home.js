import React, { useState } from 'react';
import styles from './Home.module.css';
import NavBar from '../../Components/NavBar/NavBar';
import { ReactComponent as Enter } from "../../Resources/image/enter.svg";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import Cart from '../../Components/Cart/Cart';

const Home = props => {
  const {
    shownGames,
    cartAmount,
    cart,
    cartDisplayed,
    handleOpenCart,
    handleCloseCart,
    clearCart,
    handleRemoveFromCart,
    hoverState,
    setHoverState,
    overlap,
    setOverlap,
    openGamePage
  } = props;

  const [browsing, setBrowsing] = useState(false);
  const [landingPage, setLandingPage] = useState(true);

  const navigate = useNavigate();

  const handleHover = (e) => {
    let newHoverState = hoverState[e.target.id];
    newHoverState.hovered = !newHoverState.hovered;

    setHoverState([
        ...hoverState, hoverState[e.target.id] = newHoverState
    ]);
  }

  const handleBrowse = () => {
    setOverlap(true);
    setTimeout(() => {
      setBrowsing(true);
      navigate('/react-ecommerce-store/browse');
    }, 1500);
  }

  const handleHome = () => {
    setBrowsing(false);
    navigate('/');
  }

  const handleNavGamePage = () => {
    setHoverState([...hoverState, hoverState[21].hovered = false]);
    navigate('/react-ecommerce-store/games/riseofthetombraider');
  }
  
  const handleNavNotFoundPage = () => {
    navigate('/react-ecommerce-store/this-page');
  }
  
  const handleNavNotFoundQuery = () => {
    navigate('/react-ecommerce-store/games/404');
  }
  


  const variants = {
    hidden: { opacity: 1, x: -150 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 150 },
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 900 },
    visible: { opacity: 1, y: 0, transition: {  y: { type: "tween", duration: 1.5, bounce: 0.3 }} },
  }

  return (
    <div className={styles.main}>
      {overlap ? 
          <motion.div 
            className={styles.overlap}
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
          >
    
          </motion.div> 
      : null}

      {cartDisplayed ? <Cart 
              cartDisplayed={cartDisplayed} 
              handleOpenCart={handleOpenCart}
              handleCloseCart={handleCloseCart}
              cart={cart}
              cartAmount={cartAmount}
              handleHover={handleHover}
              hoverState={hoverState}
              clearCart={clearCart}
              handleRemoveFromCart={handleRemoveFromCart}
              openGamePage={openGamePage}
      /> : null}
        <div className={styles.home}>

                <video autoPlay muted loop className={styles.video}>
                  <source src={require("../../Resources/image/pyke.mp4")} type="video/mp4" />
                </video>

                <NavBar 
                  handleHover={handleHover} 
                  hoverState={hoverState}
                  browsing={browsing}
                  handleBrowse={handleBrowse}
                  handleHome={handleHome}
                  landingPage={landingPage}
                  cartAmount={cartAmount}
                  handleOpenCart={handleOpenCart}
                  handleCloseCart={handleCloseCart}
                />
                <div className={styles.container}>
                    <div className={styles.left}>
                        <div className={styles.splash}>
                          <h1 className='Welcometext'>Welcome Gamers</h1>
                          <p className={styles.intro}>Unlock endless adventures and epic rewards at the ultimate hub for gamers – join the action at Game store today!</p>
                        </div>
    
                        <div className={styles.buttons}>
                              <button className={`${styles.cta} ${styles.browseBtn}`} onClick={handleBrowse} aria-label="Browse">
                                <Enter className={styles.ctaSVG} />
                                Browse
                              </button>
                        </div>
                    </div>
                </div>
        </div>
    </div>
  );
}

export default Home;