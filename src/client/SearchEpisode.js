import React, { Component } from 'react';
import Axios from 'axios';
import './app.css';

export default class SearchEpisode extends Component {
  /* state stuff */
  state = { searchString: "" };
  changeSearch = (newSearchString) => {
    this.setState({ searchString: newSearchString });
  }
  /* end state stuff */

  resetEpisodes = () => {
    document.getElementsByClassName('resultsWrapper')[0].innerHTML = "";
  }
  
  searchForEpisode = () => {
    //console.log(this.state.searchString);
    Axios.get(`http://localhost:8080/episode?title=${this.state.searchString}`).then(response => {
        this.resetEpisodes();
        console.log(response);
        for(let i=0; response.data.length > 0; i++) {
          let resultText = document.createTextNode(`${response.data[i].title} S${response.data[i].season}, EP${response.data[i].episode}`);
          let result = document.createElement("div");

          if(i%2 == 0) {
            result.classList.add("resultLight");
          } else {
            result.classList.add("resultDark");
          }

          //create modal component and add it in

          result.appendChild(resultText);
          document.getElementsByClassName('resultsWrapper')[0].append(result);
        }
    });
  }
  
  render() {
    return (
      <React.Fragment>
      <div className="searchWrapper">
        <div className="example">
          <input type="text" placeholder="Search..." onChange={(event) => {
              this.changeSearch(event.target.value);
            }}></input>
          <button type="submit" onClick={this.searchForEpisode}><i className="fa fa-search"></i></button>
        </div>
        <div className="sortWrapper">
            Sort by <span className="sortFunction">Relevance</span>
            <i className="fa fa-chevron-down" aria-hidden="true"></i>
        </div>
      </div>
      </React.Fragment>
    )
  }
}
