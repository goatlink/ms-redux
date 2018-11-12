// REDUX //
import { combineReducers } from 'redux';

// OBJECT SPREAD OPERATOR //

// DEFINITIONS //
import {
    // tile borders
    west, northWest, north, northEast, east, southEast, south, southWest, middle,

    //game states
    preGameIdle,

    // mouse states
    up,

    // actions
    SET_MENU, SET_GAME_STATE, RESET_GAME, REVEAL_TILE, SET_MOUSE_STATE, SET_FLAG, SET_BOARD_SIZE, SET_TILE_VALUE, SET_LAST_GAME_WON,
    INC_TIMER, CLEAR_TIMER,
 
    } from '../other/definitions';

// FUNCTIONS //
import { matrix } from '../other/functions';



//this file contains the reducers for general purpose variables, including the main board memory


//define all action types as integers to make the switch statements faster

const tileInit = {
        revealed: false,
        flagged: false,
        questioned: false,
        val: 0, // # of mines surrounding tiles. 9 means a bomb
        border: null, 
}

// STATES
const current_menu = (state = 0, action) => { // 0 means no menu, each menu has a corresponding id
    switch(action.type){
        case SET_MENU:
            return action.id;
        default:
            return state;
    }
}
const game_state = (state = preGameIdle, action) => {
    switch(action.type){
        case SET_GAME_STATE:
            return action.id;
        // may have this respond to other actions as well like a reset button
        default:
            return state;
    }
}
const tiles_cleared = (state = 0, action) => {
    switch(action.type){
        case RESET_GAME:
            return 0;
        case REVEAL_TILE:
            return state + 1;
        default:
            return state;
    }
}
const mouse_state = (state = up, action) => {
    switch(action.type){
        case SET_MOUSE_STATE:
            return action.val;
        default:
            return state;
    }
}
// FLAGS

const last_game_won = (state = false, action) =>{
    switch(action.type){
        case SET_LAST_GAME_WON:
        return action.val;
    default:
        return state;

    }
}

const board = ( state = matrix( 10, 10, tileInit) , action) => { // default is just an advanced board, will change this later to read from a settings file.
    switch(action.type){
        // spread operators and slice() may make this resource intensive
        case SET_FLAG:

        case REVEAL_TILE:
            return [
                ...state.slice(0, action.y),
                [
                    ...state[action.y].slice(0, action.x),
                    {
                        ...state[action.y][action.x],
                        revealed: true,
                    },

                    ...state[action.y].slice(action.x + 1)
                ],
                ...state.slice( action.y + 1)
            ];
        case SET_TILE_VALUE:
            return [
                ...state.slice(0, action.y),
                [
                    ...state[action.y].slice(0, action.x),
                   {
                        ...state[action.y][action.x],
                        val: action.val
                   },
                    ...state[action.y].slice(action.x + 1)
                ],
                ...state.slice( action.y + 1)
            ];
        case SET_BOARD_SIZE:
            return matrix(action.height, action.width, tileInit)
        default:
            return state;
    }
}
const timer = (state = 0, action) => { 
    switch(action.type){
        case INC_TIMER:
            return state + 1;
        case CLEAR_TIMER:
            return 0;
        default:
            return state;
    }
}
const move_array = (state = [], action) => {
    switch(action.type){
        case 'RECORD_MOVE':
            return state.concat([action.move]);
        case 'CLEAR_REPLAY':
            return [];
        default:
            return state;
    }
}



// CREATE ROOT REDUCERS
export default combineReducers({ //creates the root reducer, its imported and used by the store

    current_menu,
    game_state,
    mouse_state,

    board,
    timer,
    tiles_cleared,
    last_game_won,

});