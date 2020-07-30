import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import {Switch,Route,Redirect} from 'react-router-dom';
import DishDetail from './DishdetailComponent';
import Contat from './ContactComponent';
import About from './AboutComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/Promotions';
import { LEADERS } from '../shared/leader';
class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    };
  }
  

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId});
  }

  render() {
    const HomePage=()=>{
      return(<Home 
        dish={this.state.dishes.filter((dish) => dish.featured)[0]}
        promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
        leader={this.state.leaders.filter((leader) => leader.featured)[0]}
    />)
    }
    const DishWithId= ({match}) => {
      return(
          <DishDetail dish={this.state.dishes.filter(dish => dish.id === parseInt(match.params.dishId, 10))[0]} 
              comments={this.state.comments.filter(comment => comment.dishId === parseInt(match.params.dishId, 10))}
              />
      );
  };
    return (
     
      <div>
       <Header/>
       <Switch>
         <Route path='/home' component={HomePage}/>
         <Route path='/menu' component={()=><Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)}/>}/>
          <Route path='/contactus' component={()=><Contat/>}/>
          <Route path="/menu/:dishId" component={DishWithId} />
         <Route path='/aboutus' component={()=><About leaders={this.state.leaders}/>}/>
           <Redirect to='/home'/> 
       </Switch>
      
        {/* <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
        <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} /> */}
        <Footer/>
      </div>
    );
  }
}

export default Main;