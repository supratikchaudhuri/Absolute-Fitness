import React, {useState} from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse, 
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBDropdownToggle
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const [showNavRight, setShowNavRight] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'))
  console.log(user);
  const userType = user.type;


  const logout = () => {
    localStorage.clear()
    navigate('/login')
  }


  return (
   <MDBNavbar expand='lg' light style={{'color':'red', 'background-color':'#4cc9f0'}} sticky>
        <MDBContainer fluid>
        <MDBNavbarBrand href='#'>Absolute Fitness  <i class="fas fa-dumbbell" style={{'margin-left': '5px'}}></i></MDBNavbarBrand>
        <MDBNavbarToggler
          type='button'
          data-target='#navbarText'
          aria-controls='navbarText'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>

          {
            userType === 'member'
            &&
            <>
            <MDBNavbarItem>
              <Link to="/home">
                <MDBNavbarLink active={true} h aria-current='page' >Gyms</MDBNavbarLink>
              </Link>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <Link to={'user/'+user.email+'/health-plan'}>
              <MDBNavbarLink active={false} >My Health Plan</MDBNavbarLink>
              </Link>
            </MDBNavbarItem>
            <MDBNavbarItem >
              <MDBNavbarLink active={false} h onClick={e => alert("Newsletters comming soon!")}>Newsletter</MDBNavbarLink>
            </MDBNavbarItem>
            </>
          }

          {
            userType === 'admin'
            &&
            <>
            <MDBNavbarItem>
              <Link to="/home">
                <MDBNavbarLink active={true} h aria-current='page' >Gyms</MDBNavbarLink>
              </Link>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <Link to={'gym/'+user.gym_id+'/members'}>
              <MDBNavbarLink active={false} >Members</MDBNavbarLink>
              </Link>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <Link to={'gym/'+user.gym_id+'/staff'}>
              <MDBNavbarLink active={false} h >Staff</MDBNavbarLink>
              </Link>
            </MDBNavbarItem>
            </>
          }

{
            userType === 'trainer'
            &&
            <>
            <MDBNavbarItem>
              <Link to="/home">
                <MDBNavbarLink active={true} h aria-current='page' >Gyms</MDBNavbarLink>
              </Link>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <Link to={'trainer/'+user.gym_id+'/members'}>
              <MDBNavbarLink active={false} >My Clients</MDBNavbarLink>
              </Link>
            </MDBNavbarItem>
            </>
          }
            
            
          </MDBNavbarNav>


            
        </MDBCollapse>
      </MDBContainer>

      <MDBContainer fluid>
        <MDBNavbarToggler
          type='button'
          data-target='#navbarRightAlignExample'
          aria-controls='navbarRightAlignExample'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowNavRight(!showNavRight)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showNavRight}>
          <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>

            <MDBNavbarItem style={{cursor: 'pointer'}}>
              <MDBDropdown>
                <MDBDropdownToggle tag='a' className='nav-link'>
                  {user.name}
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  {userType === 'member' && <MDBDropdownItem link href='/health-record'>My Health</MDBDropdownItem>}
                  <MDBDropdownItem link href='/trainers'>Profile</MDBDropdownItem>
                  <MDBDropdownItem link href='' style={{color: 'red !important'}} onClick={logout}>Log Out</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
            

          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
              
  )
}

export default Navbar