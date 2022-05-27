
/***************************Imports***************** */
import { useState } from "react";
import {integrationDashboardBaseUrl} from "../Config";
import {setSearchWord} from "./Students/StudentList";

/***********************Components******************/
function NavBar()
{
    const [showNavBar, setShowNavBar] = useState(true);
    const isUsersList = (window.location.pathname === "/admin/students");

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-default fixed-top" id="mainNav">
        <a className="navbar-brand" href="/admin/dashboard"><img src="/img/speedlabs-new-logo.png" data-retina="true" alt="SpeEdLabs" padding-left="60px" height="50"/></a>
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <i className="fa fa-fw fa-bars"></i>
          {/* <span className="navbar-toggler-icon"></span> */}
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          {showNavBar && <SideNavBar />}
          <ul className="navbar-nav sidenav-toggler">
            <li className="nav-item" onClick={() => setShowNavBar(!showNavBar)}>
              <a className="nav-link text-center" id="sidenavToggler" >
                <i className="fa fa-fw fa-angle-left" ></i>
              </a>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item hidden">
              <form className="form-inline my-2 my-lg-0 mr-lg-2">
                <div className="input-group">
                  <input className="form-control search-top" id="user-search-bar" type="text" placeholder="Search for..." disabled={!isUsersList}/>
                  <span className="input-group-btn">
                    <button className="btn btn-primary" type="button" disabled={!isUsersList} onClick={userSearch}>
                      <i className="fa fa-search"></i>
                    </button>
                  </span>
                </div>
              </form>
            </li>
            <li className="nav-item logout" id="inline">
              <div>
              <a className="nav-link logout" if="color" data-toggle="modal" data-target="#exampleModal">
                <i className="fa fa-fw fa-sign-out"></i></a></div>
                <div>
                <a  if="color" data-toggle="modal" data-target="#exampleModal">
                Logout</a></div>
            </li>
          </ul>
        </div>
      </nav>
    );
}

function SideNavBar()
{
    return (
        <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
            <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard">
              <a className="nav-link" href="/admin/dashboard">
                <i className="fa fa-fw fa-dashboard"></i>
                <span className="nav-link-text">Dashboard</span>
              </a>
            </li>
            <li className="nav-item" data-toggle="tooltip" data-placement="right" title="My profile">
              <a className="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseProfile" data-parent="#exampleAccordion">
                <i className="fa fa-fw fa-graduation-cap"></i>
                <span className="nav-link-text">Courses</span>
              </a>
              <ul className="sidenav-second-level collapse" id="collapseProfile">
                <li>
                  <a href="/admin/courses"><i className="fa fa-fw fa-list"></i> All Courses</a>
                </li>
                <li>
                  <a href="/admin/courses/create"className="highlight bob-on-hover"><i className="fa fa-fw fa-plus-circle"></i> Create Course</a>
                </li>
              </ul>
            </li>
            <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Reviews">
              <a className="nav-link" href="/admin/coupons">
                <i className="fa fa-fw fa-tag coupon-icon"></i>
                <span className="nav-link-text">Coupons</span>
              </a>
            </li>
            <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Categories">
              <a className="nav-link" href="/admin/categories">
                <i className="fa fa-fw fa-list"></i>
                <span className="nav-link-text">Categories</span>
              </a>
            </li>
            <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Add listing">
              <a className="nav-link" href="/admin/students">
                <i className="fa fa-fw fa-user"></i>
                <span className="nav-link-text">Students/Users</span>
              </a>
            </li>
    
            <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Bookings">
              <a className="nav-link" href="/admin/orders">
                <i className="fa fa-fw fa-shopping-cart order-icon"></i>
                <span className="nav-link-text">Orders</span>
              </a>
            </li>
    
            <li className="nav-item hidden" data-toggle="tooltip" data-placement="right" title="Admin Panel">
              <a className="nav-link" href={`${integrationDashboardBaseUrl}/`}>
                <i class="fa fa-fw fa-building"></i>
                <span className="nav-link-text">Admin Panel</span>
              </a>
            </li>
          </ul>
    );
}

/***********************Functions******************* */
function userSearch()
{
  setSearchWord(document.getElementById("user-search-bar").value.trim());
}

/***********************Exports******************* */
export default NavBar;