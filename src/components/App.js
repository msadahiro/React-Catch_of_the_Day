import React, { Component } from 'react';
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import sampleFishes from '../sample-fishes';
import Fish from './Fish'
import base from '../base'

class App extends Component{
    constructor(){
        super();
        this.addFish = this.addFish.bind(this)
        this.loadSamples = this.loadSamples.bind(this)
        this.addToOrder = this.addToOrder.bind(this)
        this.updateFish = this.updateFish.bind(this)
        this.removeFish = this.removeFish.bind(this)
        this.removeOrder = this.removeOrder.bind(this)
        // getInitialState
        this.state = {
            fishes: {},
            order: {}
        }
    }

    componentWillMount(){
        // this runs right before the app is rendered
        this.ref = base.syncState(`${this.props.params.storeId}/fishes`,{
            context:this,
            state:'fishes'
        })
        // check if there is any order in localStorange
        const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`)
        if(localStorageRef){
            // update our App component's order state
            this.setState({
                order: JSON.parse(localStorageRef)
            })
        }
    }
    componentWillUnmount(){
        base.removeBinding(this.ref);
    }

    componentWillUpdate(nextProps, nextState){
        localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order))
    }

    addFish(fish){
        // update our state
        // this.state.fishes is my existing state
        // ... this is our spread. every item from the object and spread it into this object. pretty much take a copy. 

        const fishes = {...this.state.fishes}

        // add in our new fish
        const timestamp = Date.now();
        fishes[`fish=${timestamp}`] = fish;
        
        // setState
        // this.setState({fishes: fishes})
        // since the state (fishes) has changed and here is the new updated state our variable (fishes).
        // anytime we make a change, React will find anyhwere you used that state and will update it. // {fishes:fishes} -- little redundant.. so can remove one of the fishes.  
        this.setState({fishes})
    }

    updateFish(key,updatedFish){
        const fishes = {...this.state.fishes};
        fishes[key] = updatedFish;
        this.setState({fishes})
    }

    removeFish(key){
        const fishes = {...this.state.fishes}
        fishes[key] = null;
        this.setState({fishes})
    }

    loadSamples(){
        this.setState({
            fishes: sampleFishes
        });
    }

    addToOrder(key){
        // take a copy of our state
        const order = {...this.state.order};
        // update or add the new number of fish ordered
        order[key] = order[key] + 1 || 1;
        // update our state
        this.setState({order})
    }   

    removeOrder(key){
        const order = {...this.state.order};
        delete order[key];
        this.setState({order})
    }
    render(){
        return(
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                    {/* Key is for React, Index is for me. Referring to the object */}
                    <ul className="list-of-fishes">
                        {
                            Object
                                .keys(this.state.fishes)
                                .map(key => 
                                    <Fish 
                                        key={key}
                                        index={key} 
                                        details={this.state.fishes[key]} 
                                        addToOrder={this.addToOrder}
                                    />)
                        }
                        
                    </ul>
                </div>
                <Order 
                    fishes={this.state.fishes} 
                    order={this.state.order}
                    params={this.props.params} 
                    removeOrder={this.removeOrder}
                />
                {/* this is how we pass down data to children */}
                <Inventory 
                addFish={this.addFish}
                removeFish={this.removeFish} 
                loadSamples={this.loadSamples}
                fishes={this.state.fishes}
                updateFish={this.updateFish}
                storeId={this.props.params.storeId}
                />
            </div>
        )
    }
}

App.propTypes = {
    params: React.PropTypes.object.isRequired
}

export default App;