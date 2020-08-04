/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
import React,{Component}from 'react';
import { Link} from 'react-router-dom';
import {LocalForm,Control,Errors}from 'react-redux-form';
import {Card,CardImg,CardBody,CardText,CardTitle,BreadcrumbItem,Breadcrumb,Button,Modal,ModalBody,ModalHeader, Row, Label,Col} from 'reactstrap';


    function RenderDish({dish}){
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
    function RenderComments({comments}){
       const com= comments.map((comment)=>{
       
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
    const required=(val)=>val && val.length;
    const maxLength=(len)=>(val)=>!(val)||(val.length<=len);
    const minLength=(len)=>(val)=>!(val)||(val.length>=len);
  class DishDetail extends Component{
     
    constructor(props){
        super(props);
        this.state={
            isModalOpen:false
        }
        this.toggleModal=this.toggleModal.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);

    }
    toggleModal()
    {
        this.setState({
            isModalOpen:!this.state.isModalOpen
        });
    }
    handleSubmit(value){
        this.toggleModal();
        console.log("Current State: " +JSON.stringify(value));
        alert("Current State: "+JSON.stringify(value));
    }
    render(){
       
       const CommentForm=()=>{
            return(
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
                    <ModalHeader toggle={this.toggleModal}>Comment Form</ModalHeader>
                 <ModalBody>
                        <LocalForm onSubmit={(value)=>this.handleSubmit(value)}>
                            <Row className="form-group">
                           
                                <Label htmlFor="rating" md={4}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" name="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>

                                    </Control.select>
                                  
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="yourname" name="yourname" md={4}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".yourname"
                                    className="form-control"
                                    name="yourname"
                                    id="yourname"
                                    placeholder="Your Name"
                                    validators={{required,
                                    minLength:minLength(3),
                                maxLength:maxLength(15)}}
                                    />
                                    <Errors 
                                    className="text-danger"
                                    show="touched"
                                    model=".yourname"
                                    messages={{
                                        required:'Required',
                                        minLength:"Must be greater than 3",
                                        maxLength:'Must be 15 characters or less'
                                    }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={4}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea
                                    model=".comment"
                                   rows="12"
                                   className="form-control"
                                    placeholder="Your Comment"
                                    id="comment" name="comment"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10 }}>
                                <Button color="primary" type="submit" >Submit</Button>
                                </Col>
                              
                            </Row>
                        </LocalForm>
                 </ModalBody>
                </Modal>
            )
        }
    
    return (
        <div className="container">
        <div className="row">
            <Breadcrumb>

                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
                <h3>{this.props.dish.name}</h3>
                <hr />
            </div>                
        </div>
        <div className="row">
            <div className="col-12 col-md-5 m-1">
                <RenderDish dish={this.props.dish} />
            </div>
            <div className="col-12 col-md-5 m-1">
                <RenderComments comments={this.props.comments} />
                <Button outline className="fa fa-pencil bg-lg"  onClick={this.toggleModal}>Submit Comment</Button>
                <CommentForm></CommentForm>
           </div>
        </div>
        </div>
    );
    }   
      
}
export default DishDetail;