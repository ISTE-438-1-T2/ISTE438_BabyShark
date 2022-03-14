import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import Modal from 'react-modal';
import './app.css';

Modal.setAppElement('#searchEpisode');

export default class SearchEpisode extends Component {
  state = { searchString: "" };
  changeSearch = (newSearchString) => {
    this.setState({ searchString: newSearchString });
  }

  resetEpisodes = () => {
    document.getElementsByClassName('resultsWrapper')[0].innerHTML = "";
  }

  renderDeal = (dealData, iValue, modalBool) => {
    return <Deal resetEp={this.resetEpisodes} searchForEp={this.searchForEpisode} data={dealData} i={iValue} isModalOpen={modalBool}/>;
  }

  pressEnterHandle = (e) => {
    if(e.charCode === 13){
      this.searchForEpisode();
    }
    return false;
  }

  searchForEpisode = () => {
    if(`${this.state.searchString}`.match(/^((\-?|\+?)?\d+(\.\d+)?),\s*((\-?|\+?)?\d+(\.\d+)?)$/)) {
      console.log('searching by coords');
      Axios.get(`http://localhost:8080/episode?coords=${this.state.searchString}`).then(response => {
          this.resetEpisodes();
          console.log(response);
          for(let i=0; response.data.length > i; i++) {
            //create Deal to display on screen (includes card and modal for extra data)
            let resultNode = document.createElement('div');
            resultNode.setAttribute('class', `result${i}`);
            document.getElementsByClassName("resultsWrapper")[0].appendChild(resultNode);
            ReactDOM.render(this.renderDeal(response.data[i], i, false), document.getElementsByClassName(`result${i}`)[0]);
          }
      });
    } else {
      Axios.get(`http://localhost:8080/episode?title=${this.state.searchString}`).then(response => {
          this.resetEpisodes();
          console.log(response);
          for(let i=0; response.data.length > i; i++) {
            //create Deal to display on screen (includes card and modal for extra data)
            let resultNode = document.createElement('div');
            resultNode.setAttribute('class', `result${i}`);
            document.getElementsByClassName("resultsWrapper")[0].appendChild(resultNode);
            ReactDOM.render(this.renderDeal(response.data[i], i, false), document.getElementsByClassName(`result${i}`)[0]);
          }
      });
    }
  }
  
  render() {
    return (
      <React.Fragment>
        <div className="searchWrapper">
          <div className="example">
            <input onKeyPress={this.pressEnterHandle} type="text" placeholder="Search..." onChange={(event) => {
              this.changeSearch(event.target.value);
            }}>
            </input>
            <button id="searchButton" type="submit" onClick={this.searchForEpisode}><i className="fa fa-search"></i></button>
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

class Deal extends Component {
  constructor(props) {
    super(props);
    this.state = { openModal: false, comment:"", commentIsChanged: false};
  }

  changeModal = (newOpenModal) => {
    this.setState({ openModal: newOpenModal });
    //modal was closed and comment value not same as starting value
    if(!newOpenModal && this.state.commentIsChanged) {
      this.insertCommentForEpisode();
    }
  }

  changeComment = (newComment) => {
    this.setState({ comment: newComment });
    this.setState({ commentIsChanged: true });
  }

  insertCommentForEpisode = () => {
    console.log('attempting update of comment');
    Axios.put(`http://localhost:8080/episode?comment=${this.state.comment}&id=${this.props.data._id}`)
    .then(response => {
      console.log('successfully updated a comment: ' + response);
    });
    this.props.resetEp();
    //bit hacky, but works
    setTimeout(() => {  
      this.props.searchForEp(); 
    }, 500);
  }

  render() {
    let classStyle = ""
    if(this.props.i%2 == 0) {
      classStyle = "resultLight";
    } else {
      classStyle = "resultDark";
    }

    return (
      <div className={classStyle} onClick={() => {this.changeModal(true)}}>
        {this.props.data.title} S{this.props.data.season}, EP{this.props.data.episode}
        <Modal isOpen={this.state.openModal} onRequestClose={(e) => {e.stopPropagation();this.changeModal(false);}}>
          <h2>{this.props.data.title}</h2>
          <p>S{this.props.data.season}, EP{this.props.data.episode}</p>
          <p>{this.props.data.description}</p>
          <p>{this.props.data.category}</p>
          <p>{this.props.data.website}</p>
          <p>{this.props.data.location}</p>
          <p>{this.props.data.coords.lat}, {this.props.data.coords.long}</p>
          <p>{this.props.data.entrepreneurs}</p>
          <p>{this.props.data.askedFor}</p>
          <p>{this.props.data.exchangeForStake}</p>
          <p>{this.props.data.valuation}</p>
          <ul>
            <li>{this.props.data.shark1}</li>
            <li>{this.props.data.shark2}</li>
            <li>{this.props.data.shark3}</li>
            <li>{this.props.data.shark4}</li>
            <li>{this.props.data.shark5}</li> 
          </ul>
          <p>{this.props.data.deal}</p>
          {/* we need to pull this from an image database for the project */}
          <img src={this.props.data.image} width="500" height="600"/>
          <p>Comment:</p>
          <textarea defaultValue={this.props.data.comment} onChange={(event) => {this.changeComment(event.target.value)}}></textarea>
          <hr/>
          <div>
            {<button onClick={(e) => {e.stopPropagation();this.changeModal(false);}}>Close</button>}
          </div>
        </Modal>
      </div>
    );
  }
}