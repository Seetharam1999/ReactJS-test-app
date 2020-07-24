/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
import React ,{Component} from 'react';
import {Card,CardImg,CardBody,CardText,CardTitle} from 'reactstrap';
class DishDetail extends Component{
    constructor(props){
        super(props);
       
    }
    renderDish(dish){
        return(
            <Card>
            <CardImg top src={dish.image} alt={dish.name}/>
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
          </Card> 
        )
    }
    renderComments(dish){
       const com= dish.comments.map((comment)=>{
        var d=new Date(comment.date);
        return(
        
        <ul className="list-unstyled">
         <li key={comment.id}>
          <p>{comment.comment}</p>
          <p>
            ---{comment.author},{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
          </p>
        </li>
 </ul>
  )
        }) 
        return(<div>{com}</div>) 
    }
    render(){
       if(this.props.dish!=null){
        return(
           
            <div className="container">
                <div className="row">
                     <div className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.dish)}
                      </div>
                      <div className="col-12 col-md-5 m-1">
                          <h4>Comments</h4>
                          {this.renderComments(this.props.dish)}
                       </div>
                </div>
         </div>   
        )}
        else{
            return(
            <div></div>)
        }
    }
}

export default DishDetail;