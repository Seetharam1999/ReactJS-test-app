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
import{CSSTransition,TransitionGroup}from 'react-transition-group';
import{postComment,fetchDishes,fetchPromos,fetchComments,fetchLeaders,addFeedback}from '../redux/ActionCreators'
const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
    
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes:()=>{dispatch(fetchDishes())},
  resetFeedbackForm:()=>{dispatch(actions.reset('feedback'))},
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  // addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders:()=>dispatch(fetchLeaders()),
  addFeedback:(value)=>dispatch(addFeedback(value)),
  //addFeedback:(firstname,lastname,telnum,email,contactType,agree,message)=>dispatch(addFeedback(firstname,lastname,telnum,email,contactType,agree,message))
});


class Main extends Component {

  constructor(props) {
    super(props);
    
  }
  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
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
  leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
  leadersLoading={this.props.leaders.isLoading}
  leadersErrMess={this.props.leaders.errMess}

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
        postComment={this.props.postComment}
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
       <TransitionGroup>
         <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
       <Switch location={this.props.location}>
         <Route path='/home' component={HomePage}/>
         <Route exact path='/menu' component={()=><Menu dishes={this.props.dishes} 
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
         onClick={(dishId) => this.onDishSelect(dishId)}/>}/>
          <Route exact path='/contactus' component={()=><Contact resetFeedbackForm={this.props.resetFeedbackForm}
          addFeedback={this.props.addFeedback}
          />}/>
          <Route path="/menu/:dishId" component={DishWithId} />
         <Route exact path='/aboutus' component={()=><About leaders={this.props.leaders.leaders}
          
          leadersLoading={this.props.leaders.isLoading}
          leadersErrMess={this.props.leaders.errMess}/>}/>
           <Redirect to='/home'/> 
       </Switch>
       </CSSTransition>
       </TransitionGroup>
        {/* <Menu dishes={this.props.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
        <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} /> */}
        <Footer/>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));