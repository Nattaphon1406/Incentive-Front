import React, { useState } from "react";

import "../assets/css/Fotter.css";

function Footter() {
  return (
    <footer className="main-footer">
      <strong>
        Copyright © 2020 <a href="https://tttbrother.com/">tttbrother.com</a>.
      </strong>
      All rights reserved.
      <div className="float-right d-none d-sm-inline-block">
        <b>Version</b> 1.4.62
      </div>
    </footer>
  );
}
export default Footter;
