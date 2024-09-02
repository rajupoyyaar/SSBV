import React, { Suspense, useEffect, useState, lazy } from "react";
// Libraries
import { Routes, Route, useLocation } from "react-router-dom";
import retina from "retinajs";
import { AnimatePresence } from "framer-motion";
// import logo from './logo.svg';
import './App.css';

import GlobalContext from "./Context/Context";
import ScrollToTopButton from "./Components/ScrollToTop"

const LandingPage = lazy(()=> import("./Pages/Home/Ssbv"))

function App() {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customModal, setCustomModal] = useState({
    el: null,
    isOpen: false
  })
  const location = useLocation();

  // RetinaJS
  useEffect(() => {
    window.addEventListener('load', retina(document.querySelectorAll('img')));
  }, [])

  useEffect(() => {
    setTimeout(() => {
      import("./Functions/Utilities").then(module => {
        module.SetHeaderMenuPos()
        module.setDocumentFullHeight()
      })
    }, 1000);
  }, [location])

  useEffect(() => {
    if (isModalOpen === true) {
      document.querySelector("body").classList.add("overflow-hidden");
    } else {
      document.querySelector("body").classList.remove("overflow-hidden");
    }
  }, [isModalOpen]);

  // Get the current location and set the window to top
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
    setFooterHeight(0);
    setCustomModal({
      ...customModal,
      el: null,
      isOpen: false
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  return (
    <GlobalContext.Provider
      value={{
        headerHeight,
        setHeaderHeight,
        footerHeight,
        setFooterHeight,
        isModalOpen,
        setIsModalOpen,
        customModal,
        setCustomModal,
      }}
    >
      <div className="App" style={{ "--header-height": `${headerHeight}px` }}>
        {
          <main style={{ marginTop: headerHeight, marginBottom: footerHeight }}>
            <Suspense  fallback={<></>}>
             <Routes>
              <Route exact path="/" element={<LandingPage  style={{ "--base-color": "#ff7a56" }} />}  />
             </Routes>
            </Suspense>
          </main>
        }
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
