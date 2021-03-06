import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  InputGroupAddon,
  InputGroup,
  Input,
  NavDropdown,
  NavbarBrand,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  ButtonGroup,
  Button,
} from 'reactstrap';
import { logoutUser } from '../../actions/user';
import { toggleSidebar, positionSidebar, toggleOpenSidebar } from '../../actions/navigation';

import i1 from '../../images/1.png';
import i2 from '../../images/2.png';
import i3 from '../../images/3.png';

import s from './Header.scss';

class Header extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    sidebarState: PropTypes.string.isRequired,
    sidebarPosition: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.doLogout = this.doLogout.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.toggleMessagesDropdown = this.toggleMessagesDropdown.bind(this);
    this.toggleSupportDropdown = this.toggleSupportDropdown.bind(this);
    this.toggleSettingsDropdown = this.toggleSettingsDropdown.bind(this);
    this.toggleAccountDropdown = this.toggleAccountDropdown.bind(this);
    this.moveSidebar = this.moveSidebar.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.toggleOpenSidebar = this.toggleOpenSidebar.bind(this);

    this.state = {
      visible: true,
      messagesOpen: false,
      supportOpen: false,
      settingsOpen: false,
      searchFocused: false,
      searchOpen: true,
    };
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  doLogout() {
    this.props
      .dispatch(logoutUser());
  }

  toggleMessagesDropdown() {
    this.setState({
      messagesOpen: !this.state.messagesOpen,
    });
  }

  toggleSupportDropdown() {
    this.setState({
      supportOpen: !this.state.supportOpen,
    });
  }

  toggleSettingsDropdown() {
    this.setState({
      settingsOpen: !this.state.settingsOpen,
    });
  }

  toggleAccountDropdown() {
    this.setState({
      accountOpen: !this.state.accountOpen,
    });
  }

  toggleSidebar(state) {
    this.props.dispatch(toggleSidebar(state));
  }

  moveSidebar(position) {
    this.props.dispatch(positionSidebar(position));
  }

  toggleOpenSidebar() {
    this.props.dispatch(toggleOpenSidebar());
  }

  render() {
    return (
      <Navbar>
        <NavbarBrand className={s.logo} href="/">
          <strong>Blue</strong>
        </NavbarBrand>
        <div className="ml-auto" />
        <Collapse className={[s.searchCollapse, 'ml-auto ml-lg-0 mr-md-3'].join(' ')} isOpen={this.state.searchOpen}>
          <InputGroup className={`${s.navbarForm} ${this.state.searchFocused ? s.navbarFormFocused : ''}`}>
            <InputGroupAddon className={s.inputAddon}><i className="fa fa-search" /></InputGroupAddon>
            <Input
              id="search-input" placeholder="Search..." className="input-transparent"
              onFocus={() => this.setState({ searchFocused: true })}
              onBlur={() => this.setState({ searchFocused: false })}
            />
          </InputGroup>
        </Collapse>
        <Nav className="ml-auto ml-md-0">
          <NavItem className="d-md-none">
            <NavLink onClick={() => this.setState({ searchOpen: !this.state.searchOpen })} className={s.navItem} href="#">
              <i className="glyphicon glyphicon-search" />
            </NavLink>
          </NavItem>
          <NavDropdown isOpen={this.state.messagesOpen} toggle={this.toggleMessagesDropdown}>
            <DropdownToggle nav className={s.navItem}>
              <i className="glyphicon glyphicon-comments" />
            </DropdownToggle>
            <DropdownMenu className={`${s.dropdownMenu} ${s.messages}`}>
              <DropdownItem>
                <img className={s.image} src={i1} alt="" />
                <div className={s.details}>
                  <div>Jane Hew</div>
                  <div className={s.text}>
                    Hey, John! How is it going? ...
                  </div>
                </div>
              </DropdownItem>
              <DropdownItem>
                <img className={s.image} src={i2} alt="" />
                <div className={s.details}>
                  <div>Alies Rumiancaŭ</div>
                  <div className={s.text}>
                    I will definitely buy this template
                  </div>
                </div>
              </DropdownItem>
              <DropdownItem>
                <img className={s.image} src={i3} alt="" />
                <div className={s.details}>
                  <div>Michał Rumiancaŭ</div>
                  <div className={s.text}>
                    Is it really Lore ipsum? Lore ...
                  </div>
                </div>
              </DropdownItem>
              <DropdownItem>
                <a>
                  See all messages <i className="fa fa-arrow-right" />
                </a>
              </DropdownItem>
            </DropdownMenu>
          </NavDropdown>
          <NavDropdown isOpen={this.state.supportOpen} toggle={this.toggleSupportDropdown}>
            <DropdownToggle nav className={s.navItem}>
              <i className="glyphicon glyphicon-globe" />
              <span className={s.count}>8</span>
            </DropdownToggle>
            <DropdownMenu right className={`${s.dropdownMenu} ${s.support}`}>
              <DropdownItem>
                <Badge color="danger"><i className="fa fa-bell-o" /></Badge>
                <div className={s.details}>
                  Check out this awesome ticket
                </div>
              </DropdownItem>
              <DropdownItem>
                <Badge color="warning"><i className="fa fa-question-circle" /></Badge>
                <div className={s.details}>
                  What is the best way to get ...
                </div>
              </DropdownItem>
              <DropdownItem>
                <Badge color="success"><i className="fa fa-info-circle" /></Badge>
                <div className={s.details}>
                  This is just a simple notification
                </div>
              </DropdownItem>
              <DropdownItem>
                <Badge color="info"><i className="fa fa-plus" /></Badge>
                <div className={s.details}>
                  12 new orders has arrived today
                </div>
              </DropdownItem>
              <DropdownItem>
                <Badge color="danger"><i className="fa fa-tag" /></Badge>
                <div className={s.details}>
                  One more thing that just happened
                </div>
              </DropdownItem>
              <DropdownItem>
                <a>
                  See all tickets <i className="fa fa-arrow-right" />
                </a>
              </DropdownItem>
            </DropdownMenu>
          </NavDropdown>
          <NavItem className={s.divider} />
          <NavDropdown isOpen={this.state.settingsOpen} toggle={this.toggleSettingsDropdown} className="d-sm-none-down">
            <DropdownToggle nav className={s.navItem}>
              <i className="glyphicon glyphicon-cog" />
            </DropdownToggle>
            <DropdownMenu className={`${s.dropdownMenu} ${s.settings}`}>
              <h6>Sidebar on the</h6>
              <ButtonGroup size="sm">
                <Button onClick={() => this.moveSidebar('left')} className={this.props.sidebarPosition === 'left' ? 'active' : ''}>Left</Button>
                <Button onClick={() => this.moveSidebar('right')} className={this.props.sidebarPosition === 'right' ? 'active' : ''}>Right</Button>
              </ButtonGroup>
              <h6 className="mt-2">Sidebar</h6>
              <ButtonGroup size="sm">
                <Button onClick={() => this.toggleSidebar('show')} className={this.props.sidebarState === 'show' ? 'active' : ''}>Show</Button>
                <Button onClick={() => this.toggleSidebar('hide')} className={this.props.sidebarState === 'hide' ? 'active' : ''}>Hide</Button>
              </ButtonGroup>
            </DropdownMenu>
          </NavDropdown>
          <NavDropdown isOpen={this.state.accountOpen} toggle={this.toggleAccountDropdown} className="d-sm-none-down">
            <DropdownToggle nav className={s.navItem}>
              <i className="glyphicon glyphicon-user" />
            </DropdownToggle>
            <DropdownMenu right className={`${s.dropdownMenu} ${s.account}`}>
              <section>
                <img src={i2} alt="" className={s.imageAccount} />
                Philip Daineka
              </section>
              <DropdownItem>
                <NavLink href="/profile">
                  <i className="fa fa-user fa-fw" />
                  Profile
                </NavLink>
              </DropdownItem>
              <DropdownItem>
                <NavLink href="/calendar">
                  <i className="fa fa-calendar fa-fw" />
                  Calendar
                </NavLink>
              </DropdownItem>
              <DropdownItem>
                <NavLink href="/inbox">
                  <i className="fa fa-inbox fa-fw" />
                  Inbox
                </NavLink>
              </DropdownItem>
            </DropdownMenu>
          </NavDropdown>
          <NavItem className="d-sm-none-down">
            <NavLink onClick={this.doLogout} className={s.navItem} href="#">
              <i className="glyphicon glyphicon-off" />
            </NavLink>
          </NavItem>
          <NavItem className="d-md-none">
            <NavLink onClick={this.toggleOpenSidebar} className={s.navItem} href="#">
              <i className="fa fa-bars" />
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarState: store.navigation.sidebarState,
    sidebarPosition: store.navigation.sidebarPosition,
  };
}

export default withRouter(connect(mapStateToProps)(withStyles(s)(Header)));

