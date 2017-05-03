import React, { Component } from 'react';
// importing the function getFunName from the helper.js. 

import { getFunName } from '../helpers';

class StorePicker extends Component{
    // constructor of the component. 
    // constructor(){
    //     super();
    //     // this equals to the StorePicker
    //     this.goToStore = this.goToStore.bind(this);
    // }
    goToStore(event){
        // first grab text from box
        event.preventDefault();
        // second transition from / to store/storeId
        const storeId = this.storeInput.value
        this.context.router.transitionTo(`/store/${storeId}`)

    }
    // Need to bind this on the form. {this.goToStore.bind(this)} binds it to StorePicker
    render(){
        return(
            <form className="store-selector" onSubmit={this.goToStore.bind(this)}>
                <h2>Please Enter a Store</h2>
                <input 
                type="text" 
                required 
                placeholder="Store Name" 
                defaultValue={getFunName()} 
                ref={(input) => {this.storeInput = input}}/>
                <button type="submit">Visit Store </button>
            </form>
        )
    }
}

StorePicker.contextTypes = {
    router:React.PropTypes.object
}

export default StorePicker;