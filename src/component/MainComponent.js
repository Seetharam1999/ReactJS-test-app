/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import {Switch,Route,Redirect,withRouter} from 'react-router-dom';
import DishDetail from './DishdetailComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import {connect}from 'react-redux';
import {actions}from 'react-redux-form';
import{addComment,fetchDishes,fetchPromos,fetchComments}from '../redux/ActionCreators'
const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes:()=>{dispatch(fetchDishes())},
  resetFeedbackForm:()=>{dispatch(actions.reset('feedback'))},
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos())
});


class Main extends Component {

  constructor(props) {
    super(props);
    
  }
  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId});
  }

  render() {
   
  
    const HomePage=()=>{
return(
  <Home 
  dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
  dishesLoading={this.props.dishes.isLoading}
  dishErrMess={this.props.dishes.errMess}
  promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
  promoLoading={this.props.promotions.isLoading}
  promoErrMess={this.props.promotions.errMess}
  leader={this.props.leaders.filter((leader) => leader.featured)[0]}
/>
)
      //   return(<Home 
    //     dish={this.props.dishes.filter((dish) => dish.featured)[0]}
    //     promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
    //     leader={this.props.leaders.filter((leader) => leader.featured)[0]}
    // />)
    }
    const DishWithId= ({match}) => {
      return(
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
        isLoading={this.props.dishes.isLoading}
        errMess={this.props.dishes.errMess}
        comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
        commentsErrMess={this.props.comments.errMess}
        addComment={this.props.addComment}
      />
    );
      //  return(
      //     <DishDetail dish={this.props.dishes.filter(dish => dish.id === parseInt(match.params.dishId, 10))[0]} 
      //         comments={this.props.comments.filter(comment => comment.dishId === parseInt(match.params.dishId, 10))}
      //         addComment={this.props.addComment}
      //         />
      // );
  };
    return (
     
      <div>
       <Header/>
       <Switch>
         <Route path='/home' component={HomePage}/>
         <Route exact path='/menu' component={()=><Menu dishes={this.props.dishes} 
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
         onClick={(dishId) => this.onDishSelect(dishId)}/>}/>
          <Route exact path='/contactus' component={()=><Contact resetFeedbackForm={this.props.resetFeedbackForm}/>}/>
          <Route path="/menu/:dishId" component={DishWithId} />
         <Route exact path='/aboutus' component={()=><About leaders={this.props.leaders}/>}/>
           <Redirect to='/home'/> 
       </Switch>
      
        {/* <Menu dishes={this.props.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
        <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} /> */}
        <Footer/>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));