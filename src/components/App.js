import React, { Component } from 'react';
import { Provider } from './Context';
import Header  from './Header';
import Player  from './Player';
import AddPlayerForm from './AddPlayerForm';

class App extends Component {

  state = {
    players: [
      {
        name: "Andres",
        score: 0,
        id: 1
      },
      {
        name: "Adriana",
        score: 0,
        id: 2
      },
      {
        name: "John",
        score: 0,
        id: 3
      },
      {
        name: "Mary",
        score: 0,
        id: 4
      }
    ]
  };

  // Player ID Counter
  prevPlayerId = 4;

  getHighScore = () => {
    const scores = this.state.players.map( p => p.score );
    const highScore = Math.max(...scores);
    if (highScore) {
      return highScore;
    }
    return null;
  }

  handleScoreChange = (index, delta) => {
    this.setState( prevState => {
      // New player's array
      const updatedPlayers = [ ...prevState.players ];
      // Copy of the player object targeted
      const updatedPlayer = { ...updatedPlayers[index] };
      // Update the target player score
      updatedPlayer.score += delta;
      // Update players array with target player's latest score
      updatedPlayers[index] = updatedPlayer;
      // Update player state without mutating original state
      return {
        players: updatedPlayers
      };
    });
  }

  handleAddPlayer = (name) => {
    this.setState( prevState => {
      return {
        players: [
          ...prevState.players,
          {
            name,
            score: 0,
            id: this.prevPlayerId += 1
          }
        ]
      };
    });
  }

  handleRemovePlayer = (id) => {
    this.setState( prevState => {
      return {
        players: prevState.players.filter(p => p.id !== id)
      };
    });
  }

  render() {

    const highScore = this.getHighScore();

    return (
      <Provider value={ this.state.players }>
        <div className="scoreboard">
          <Header />
          {/* Players list */}
          {this.state.players.map( (player, index) =>
            <Player 
              name={player.name}
              score={player.score}
              id={player.id}
              key={player.id.toString()} 
              index={index}
              changeScore={this.handleScoreChange}
              removePlayer={this.handleRemovePlayer}     
              isHighScore={highScore === player.score}      
            />
          )}
          <AddPlayerForm addPlayer={this.handleAddPlayer} />
        </div>
      </Provider>
    );
  }

}

export default App;
