
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

function Navbar() {
  const [showNavRight, setShowNavRight] = useState(false);

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
              <MDBNavbarLink active={true} h aria-current='page' href='#'>
                Home
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink active={false} href='#'>Your Plan</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink active={false} h href='#'>Pricing</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem >
              <MDBNavbarLink active={false} h href='#'>Newsletter</MDBNavbarLink>
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

            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag='a' className='nav-link'>
                  Users
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem link>Action</MDBDropdownItem>
                  <MDBDropdownItem link>Another action</MDBDropdownItem>
                  <MDBDropdownItem link>Something else here</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>

            <MDBNavbarItem>
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

          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  )
}

export default Navbar