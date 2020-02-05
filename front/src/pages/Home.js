import React, { Component } from "react";
import Card from "../components/CardComponent";

export default class Home extends Component {
  state = {
    title: "Levent",
    posts: []
  };

  async componentDidMount() {}

  render() {
    return (
      <div id="homepage">
        <section className="banner-home">
          <div className="content">
            <h1>Découvrez toutes les activitées près de chez vous</h1>
            <p>
              En vous inscrivant vous pourrez participer à pleins d'activitées
              près de chez vous !
            </p>
            <div className="container-button">
              <button className="btn-rounded-100 btn-violet">
                Inscrivez-vous
              </button>
            </div>
          </div>

          <div className="illustration">
            <div className="display-card position-top">
              <Card />
            </div>
            <div className="display-card">
              <Card />
              <Card />
            </div>
            <div className="display-card position-bottom">
              <Card />
            </div>
          </div>
        </section>
      </div>
    );
  }
}
