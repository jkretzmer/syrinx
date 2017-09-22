import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { IndexLinkContainer } from 'react-router-bootstrap';

import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';

import swiftLogo from '../../../assets/img/SwiftNav_Logo_NoText.svg';

import { routeCodes } from 'config/routes';
import syrinx_config from 'config/syrinx_config';


const NavbarBrand = Navbar.Brand;
const NavbarHeader = Navbar.Header;
const NavbarToggle = Navbar.Toggle;
const NavbarCollapse = Navbar.Collapse;

export default class Menu_NavBar extends Component {
  render() {

    const baseNavLinks = [
      { href: routeCodes.STATUS, title: 'Status' },
      { href: routeCodes.POSITION, title: 'Position'},
      { href: routeCodes.IMU, title: 'IMU'},
      { href: routeCodes.ABOUT, title: 'About'}
    ];

    const navLinksLeft = baseNavLinks.map(link => (
          <IndexLinkContainer key={'header-nav-left' + link.href} to={link.href}>
            <NavItem>{link.title}</NavItem>
          </IndexLinkContainer>
        ));

    return (
      <div className='app'>
      <Navbar fixedTop>
        <NavbarHeader>
          <NavLink to={ routeCodes.STATUS } className='logo'>
            <img src={ swiftLogo } alt={'Swift Navigation'} width={'118'} height={'66'} />
          </NavLink>
          <NavbarBrand>
            <NavLink exact to={ routeCodes.STATUS }>{syrinx_config.app.title}</NavLink>
          </NavbarBrand>
          <NavbarToggle />
        </NavbarHeader>

        <NavbarCollapse>
          <Nav navbar>
          {navLinksLeft}
          </Nav>
      </NavbarCollapse>
      </Navbar>
    </div>
/*
      <div className='Menu'>
        <div className='Menu-logo'>
          <img
            src={ swiftLogo }
            alt='Swift Navigation'
          />
        </div>
        <div className='Menu-links'>
          <NavLink
            activeClassName='Menu-link--active'
            className='Menu-link'
            exact
            to={ routeCodes.DASHBOARD }
          >
            Home
          </NavLink>
          <NavLink
            activeClassName='Menu-link--active'
            className='Menu-link'
            to={ routeCodes.ABOUT }
          >
            About
          </NavLink>
          <NavLink
            activeClassName='Menu-link--active'
            className='Menu-link'
            to='/404'
          >
            404
          </NavLink>
        </div>
      </div>
      */
    );
  }
}
