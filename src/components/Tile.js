// REACT //
import React, { Component } from 'react';

// REDUX //
import { connect } from 'react-redux';
import { generateClick } from '../actions/boardActions';

class Tile extends Component {

    render() {

        let mined = "";
        // tiles are always able to report their clicks
        //the engine will determine what to do with the click depending on the game_state
        //i.e. if its the first click of a game, or to ignore it...
        let tile = this.props.board[this.props.y][this.props.x];

        if(tile.val === 9){
            mined = " mined";
        }
        //console.log(tile);

        
        return (
            //onClick = () => this.props.generateClick(this.props.x, this.props.y)
            <div className={"tile" + mined} id={ "" + this.props.x + "-" + this.props.y}
            onClick={( x , y ) => this.props.generateClick( this.props.x , this.props.y)}
            >
            
            
            
                {/* graphics, if needed */}
            </div>
        );
    }
}


// REDUX MAPS
const mapStateToProps = (state) => {
    return {
        board: state.board,
        game_state: state.game_state,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        generateClick: (x,y) => dispatch(generateClick(x,y)),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Tile);