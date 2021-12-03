import React from "react";

const Hero = () => {
  return (
    <section className="py-5 text-center container">
      <div className="row py-lg-5">
        <div className="col-lg-6 col-md-8 mx-auto">
          <h1 className="fw-light">Stefi Commerce</h1>
          <p className="lead text-muted">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, ipsa fugiat tempora distinctio sint hic possimus corrupti aliquid dignissimos doloremque expedita rerum ea eos consectetur quam, nulla quae. Rem, est.
          </p>
          <p>
            <a href="#" className="btn btn-primary my-2">
              Main call to action
            </a>
            <a href="#" className="btn btn-secondary my-2">
              Secondary action
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
