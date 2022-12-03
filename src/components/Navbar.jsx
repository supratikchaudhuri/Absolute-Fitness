
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
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [showNavRight, setShowNavRight] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'))
  // console.log(user);    //calls everytime when we go to new page



  return (
    <MDBNavbar expand='lg' light style={{'color':'red', 'background-color':'#E4A11B'}} sticky>
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
            <MDBNavbarItem>
              <MDBNavbarLink active={true} h aria-current='page' href='home'>
                Home
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink active={false} href='myplan'>My Plan</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink active={false} h href='plans'>View Plans</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem >
              <MDBNavbarLink active={false} h href='newsletter'>Newsletter</MDBNavbarLink>
            </MDBNavbarItem>
            
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
                  <MDBDropdownItem link href='/branches'>My Health</MDBDropdownItem>
                  <MDBDropdownItem link href='/trainers'>Profile</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>

            {user.isAdmin &&
              (<MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle tag='a' className='nav-link'>
                    Admin
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem link>Action</MDBDropdownItem>
                    <MDBDropdownItem link>Another action</MDBDropdownItem>
                    <MDBDropdownItem link>Something else here</MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>
            )}
            

          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  )
}

export default Navbar