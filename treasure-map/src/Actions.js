import React, { Component } from 'react';
import axios from 'axios';

import Player from './Player';
import Inventory from './Inventory';
import CurrentRoom from './CurrentRoom';
import './SASS/Actions.sass';


class Actions extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            playerToken : '',
            player : {},
            inventory: []
        }
        this.inputChangeHandler = this.inputChangeHandler.bind(this)
        this.getStatus = this.getStatus.bind(this)
    }
    inputChangeHandler = (e) => {
        this.setState({[e.target.name] : e.target.value})
    }

    getStatus = (e) => {
        e.preventDefault()
        const playerToken = this.state.playerToken
        console.log("player token", playerToken)
        const config = {
            method: 'post',
            url: 'https://lambda-treasure-hunt.herokuapp.com/api/adv/status/',
            headers: {
              Authorization: `Token ${playerToken}`
            }
          };
        axios(config)
            .then(res => {
                console.log(Object.values(res.data.inventory))
            this.setState({player:res.data, inventory: Object.values(res.data.inventory)})

            })
            .catch(err => console.log('GetDataError: ', err))

    }    

    render() {
        let player = this.state.player
        delete player.inventory
        return (
            <div className='actions'>
                <div>
                <form className='road'>
                    <select className='road-selection' onChange={this.getValue} onClick={this.getValue}>
                        <option value='Examine'>Examine</option>
                        <option value='Take'>Take</option>
                        <option value='Drop'>Drop</option>
                        <option value='Wear'>Wear</option>
                    </select>
                    <input className='road-input'></input>
                    <h4 className='road-submit'>Submit</h4>
                    <h5 className='road-status'> Status: </h5>
                </form>
                <button className='isle-buttons road-b'>On the Road</button>
                </div>

                <div>
                <form className='shop'>
                    <select className='shop-selection' onChange={this.getValue} onClick={this.getValue}>
                            <option value='Sell'>Sell</option>
                            <option value='Confirm'>Confirm Sale Of</option>
                    </select>                    
                    <input className ='shop-input'></input>
                    <h4 className='shop-submit'>Submit</h4>
                    <h5 className='shop-status'> Status: </h5>
                </form>
                <button className='isle-buttons shop-b'>Shop</button>
                </div>

                <div>
                <form className='new-name'>
                    <select className='name-selection' onChange={this.getValue} onClick={this.getValue}>
                        <option value='New'>New Name</option>
                        <option value='Confirm'>Confirm Sale Of</option>
                    </select>                      
                    <input className='name-input'></input>
                    <h4 className='name-submit'>Submit</h4>
                    <h5 className='name-status'> Status: </h5>
                </form>
                <button className='isle-buttons name-b'>Change Name</button>
                </div>

                <div>
                <form className='mine'>
                    <h3 className='mining'>Mining...</h3>
                </form>
                <button className='isle-buttons mine-b'>Mine</button>
                </div>

                <div>
                <form className='pray'>
                    <h3 className='praying'>Praying...</h3>
                </form>
                <button className='isle-buttons pray-b'>Pray</button>
                </div>

                <div>
                <form className='abilities'>
                    <select className='abilities-selection' onChange={this.getValue} onClick={this.getValue}>
                        <option value='Dash'>Dash</option>
                        <option value='Fly'>Fly</option>
                        <option value='Carry'>Carry</option>
                        <option value='Receive'>Receive</option>
                    </select>                      
                    <input className='abilities-input'></input>
                    <h4 className='abilities-submit'>Submit</h4>
                    <h5 className='abilities-status'> Status: </h5>
                </form>
                <button className='isle-buttons abilities-b'>Abilities</button>
                </div>

                <div>
                <form className='transmorgify'>
                    <h4>Transform</h4>
                    <input></input>
                    <h4>Submit</h4>
                </form>
                <button className='isle-buttons transmorgify-b'>Transmorgify</button>
                </div>

            </div>
        )
    }
}

export default Actions