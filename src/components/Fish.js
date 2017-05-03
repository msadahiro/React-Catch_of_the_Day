import React,{ Component } from 'react';
import { formatPrice } from '../helpers'
class Fish extends Component{
    render(){
        // this is destructuring
        // same as: 
        // const details = this.props.details
        // const index = this.props.index
        const {details, index} = this.props
        const isAvailable = details.status === 'available';
        const buttonText = isAvailable ? "Add to Order" : "Sold Out!";
        return(
            <li className="menu-fish">
            <img src={details.image} alt={details.name} />
            <h3 className="fish-name">
            {details.name}
            <span className="price">{formatPrice(details.price)}</span>
            </h3>
            <p>{details.desc}</p>
            <button 
            onClick={() => this.props.addToOrder(index)}
            disabled={!isAvailable}>{buttonText}</button>
            </li>
        )
    }
}

Fish.propTypes = {
    details:React.PropTypes.object.isRequired,
    index: React.PropTypes.string.isRequired,
    addToOrder: React.PropTypes.func.isRequired 
}
export default Fish;