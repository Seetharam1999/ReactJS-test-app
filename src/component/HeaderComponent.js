import React,{Component} from 'react';
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron,Modal,Button,ModalBody,ModalHeader,Form, FormGroup, Label,Input} from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);
    
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal=this.toggleModal.bind(this);
        this.isHandleLogin=this.isHandleLogin.bind(this);
        this.state = {
          isNavOpen: false,
          isModalOpen:false,
        };
      }

      toggleNav() {
        this.setState({
          isNavOpen: !this.state.isNavOpen
        });
      }
      toggleModal(){
        this.setState({
            isModalOpen:!this.state.isModalOpen          });
      }
      isHandleLogin(event){
        this.toggleModal();
        alert("USername :" +this.username.value + " Password :" +this.password.value +"Checked :" + this.remember.checked)
        event.preventDefault();
      }
    render() {
        return(
            <div>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/"><img src='assets/images/logo.png' height="30" width="41" alt='Ristorante Con Fusion' /></NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link"  to='/home'><span className="fa fa-home fa-lg"></span> Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/aboutus'><span className="fa fa-info fa-lg"></span> About Us</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link"  to='/menu'><span className="fa fa-list fa-lg"></span> Menu</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/contactus'><span className="fa fa-address-card fa-lg"></span> Contact Us</NavLink>
                            </NavItem>
                            </Nav>
                            <Nav navbar className="ml-auto">
                                <NavItem>
                                    <Button outline  onClick={this.toggleModal}><span className="fa fa-sign-in bg-lg">Login</span></Button>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>

         
               
                <Jumbotron>
                
                 
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Ristorante con Fusion</h1>
                                <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                            </div>
                        </div>
                    </div>
                   
                </Jumbotron>
               <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                   <ModalHeader toggle={this.toggleModal}>Login </ModalHeader>
                   <ModalBody>
                       <Form onSubmit={this.isHandleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" 
                                innerRef={(input)=>this.username=input}
                                id="username" name="username" placeholder="username"/>                           
                             </FormGroup>
                             <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="text" 
                                innerRef={(input)=>this.password=input}
                                id="password" name="password" placeholder="password"/>                           
                             </FormGroup>
                             <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember"
                                     innerRef={(input) => this.remember = input}  
                                    />
                                    Remember me
                                </Label>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                            
                       </Form>
                   </ModalBody>
               </Modal>
            </div>
        );
    }
}
export default Header;