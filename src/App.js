import React from "react";
import styles from "./style";
import Wallet from "./Wallet";

function App() {

  return (
    
    <div className={`bg-gradient ${styles.fullScreen} ${styles.flexCenter}`}>
      <div className={`bg-gradient ${styles.fullWidthHeight} flex justify-center`}>
        <Wallet />
      </div>
    </div>
  );
}

export default App;

