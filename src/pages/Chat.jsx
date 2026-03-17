import React from 'react'

const Chat = () => {
  return (
    
        <div className="nxl-content without-header nxl-full-content">
           
            <div className="main-content d-flex">
              
                <div className="content-sidebar content-sidebar-xl" data-scrollbar-target="#psScrollbarInit">
                    <div className="content-sidebar-header bg-white sticky-top hstack justify-content-between">
                        <h4 className="fw-bolder mb-0">Chat</h4>
                        <a href="javascript:void(0);" className="app-sidebar-close-trigger d-flex">
                            <i className="feather-x"></i>
                        </a>
                    </div>
                    <div className="content-sidebar-body">
                        <div className="py-0 px-4 d-flex align-items-center justify-content-between border-bottom">
                            <form className="sidebar-search">
                                <input type="search" className="py-3 px-0 border-0" id="chattingSearch" placeholder="Search..."/>
                            </form>
                            <div className="dropdown sidebar-filter">
                                <a href="javascript:void(0)" data-bs-toggle="dropdown" className="d-flex align-items-center justify-content-center dropdown-toggle" data-bs-offset="0, 15"> Newest </a>
                                <ul className="dropdown-menu dropdown-menu-end overflow-auto">
                                    <li>
                                        <a href="javascript:void(0)" className="dropdown-item">Oldest</a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0)" className="dropdown-item active">Newest</a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0)" className="dropdown-item">Replied</a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0)" className="dropdown-item">Snoozed</a>
                                    </li>
                                    <li className="dropdown-divider"></li>
                                    <li>
                                        <a href="javascript:void(0)" className="dropdown-item">Ascending</a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0)" className="dropdown-item">Descending</a>
                                    </li>
                                    <li className="dropdown-divider"></li>
                                    <li>
                                        <a href="javascript:void(0)" className="dropdown-item">Mute Conversion</a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0)" className="dropdown-item">Block Conversion</a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0)" className="dropdown-item">Delete Conversion</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="content-sidebar-items">
                            <div className="p-4 d-flex position-relative border-bottom c-pointer single-item">
                                <div className="avatar-image">
                                    <img src="assets/images/avatar/10.png" className="img-fluid" alt="image" />
                                </div>
                                <div className="ms-3 item-desc">
                                    <div className="w-100 d-flex align-items-center justify-content-between">
                                        <a href="javascript:void(0);" className="hstack gap-2 me-2">
                                            <span>Erna Serpa</span>
                                            <div className="wd-5 ht-5 rounded-circle opacity-75 me-1 bg-success"></div>
                                            <span className="fs-10 fw-medium text-muted text-uppercase d-none d-sm-block">2 min ago</span>
                                        </a>
                                        <div className="dropdown">
                                            <a href="javascript:void(0)" className="avatar-text avatar-sm" data-bs-toggle="dropdown">
                                                <i className="feather-more-vertical"></i>
                                            </a>
                                            <ul className="dropdown-menu dropdown-menu-end overflow-auto">
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-check-circle me-3"></i>
                                                        <span>Make as Read</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-star me-3"></i>
                                                        <span>Add to Favorite</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-bell-off me-3"></i>
                                                        <span>Mute Notifications</span>
                                                    </a>
                                                </li>
                                                <li className="dropdown-divider"></li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#voiceCallingModalScreen">
                                                        <i className="feather-phone-call me-3"></i>
                                                        <span>Audio Call</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#videoCallingModalScreen">
                                                        <i className="feather-video me-3"></i>
                                                        <span>Video Call</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-mail me-3"></i>
                                                        <span>Send eMail</span>
                                                    </a>
                                                </li>
                                                <li className="dropdown-divider"></li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-alert-triangle me-3"></i>
                                                        <span>Report Chat</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-trash-2 me-3"></i>
                                                        <span>Delete Chat</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-archive me-3"></i>
                                                        <span>Archive Chat</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <p className="fs-12 fw-semibold text-dark mt-2 mb-0 text-truncate-2-line">Lorem ipsum dolor sit amet, consec tetuer adipi scing elit aenean commodo ipsum dolor sit amet, consec tetuer adipi scing elit aenean commodo</p>
                                </div>
                            </div>
                            <div className="p-4 d-flex position-relative border-bottom c-pointer single-item">
                                <div className="bg-success text-white avatar-text">N</div>
                                <div className="ms-3 item-desc">
                                    <div className="w-100 d-flex align-items-center justify-content-between">
                                        <a href="javascript:void(0);" className="hstack gap-2 me-2">
                                            <span>Norman Byrd</span>
                                            <div className="wd-5 ht-5 rounded-circle opacity-75 me-1 bg-danger"></div>
                                            <span className="fs-10 fw-medium text-muted text-uppercase d-none d-sm-block">5 min ago</span>
                                        </a>
                                        <div className="dropdown">
                                            <a href="javascript:void(0)" className="avatar-text avatar-sm" data-bs-toggle="dropdown">
                                                <i className="feather-more-vertical"></i>
                                            </a>
                                            <ul className="dropdown-menu dropdown-menu-end overflow-auto">
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-check-circle me-3"></i>
                                                        <span>Make as Read</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-star me-3"></i>
                                                        <span>Add to Favorite</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-bell-off me-3"></i>
                                                        <span>Mute Notifications</span>
                                                    </a>
                                                </li>
                                                <li className="dropdown-divider"></li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#voiceCallingModalScreen">
                                                        <i className="feather-phone-call me-3"></i>
                                                        <span>Audio Call</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#videoCallingModalScreen">
                                                        <i className="feather-video me-3"></i>
                                                        <span>Video Call</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-mail me-3"></i>
                                                        <span>Send eMail</span>
                                                    </a>
                                                </li>
                                                <li className="dropdown-divider"></li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-alert-triangle me-3"></i>
                                                        <span>Report Chat</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-trash-2 me-3"></i>
                                                        <span>Delete Chat</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-archive me-3"></i>
                                                        <span>Archive Chat</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <p className="fs-12 fw-semibold text-dark mt-2 mb-0 text-truncate-2-line">Lorem ipsum dolor sit amet, consec tetuer adipi scing elit aenean commodo ipsum dolor sit amet, consec tetuer adipi scing elit aenean commodo</p>
                                </div>
                            </div>
                            <div className="p-4 d-flex position-relative border-bottom c-pointer single-item">
                                <div className="avatar-image">
                                    <img src="assets/images/avatar/11.png" className="img-fluid" alt="image" />
                                </div>
                                <div className="ms-3 item-desc">
                                    <div className="w-100 d-flex align-items-center justify-content-between">
                                        <a href="javascript:void(0);" className="hstack gap-2 me-2">
                                            <span>Laura Foreman</span>
                                            <div className="wd-5 ht-5 rounded-circle opacity-75 me-1 bg-success"></div>
                                            <span className="fs-10 fw-medium text-muted text-uppercase d-none d-sm-block">7 min ago</span>
                                        </a>
                                        <div className="dropdown">
                                            <a href="javascript:void(0)" className="avatar-text avatar-sm" data-bs-toggle="dropdown">
                                                <i className="feather-more-vertical"></i>
                                            </a>
                                            <ul className="dropdown-menu dropdown-menu-end overflow-auto">
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-check-circle me-3"></i>
                                                        <span>Make as Read</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-star me-3"></i>
                                                        <span>Add to Favorite</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-bell-off me-3"></i>
                                                        <span>Mute Notifications</span>
                                                    </a>
                                                </li>
                                                <li className="dropdown-divider"></li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#voiceCallingModalScreen">
                                                        <i className="feather-phone-call me-3"></i>
                                                        <span>Audio Call</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#videoCallingModalScreen">
                                                        <i className="feather-video me-3"></i>
                                                        <span>Video Call</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-mail me-3"></i>
                                                        <span>Send eMail</span>
                                                    </a>
                                                </li>
                                                <li className="dropdown-divider"></li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-alert-triangle me-3"></i>
                                                        <span>Report Chat</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-trash-2 me-3"></i>
                                                        <span>Delete Chat</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-archive me-3"></i>
                                                        <span>Archive Chat</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <p className="fs-12 text-muted mt-2 mb-0 text-truncate-2-line">Lorem ipsum dolor sit amet, consec tetuer adipi scing elit aenean commodo ipsum dolor sit amet, consec tetuer adipi scing elit aenean commodo</p>
                                </div>
                            </div>
                            <div className="p-4 d-flex position-relative border-bottom c-pointer single-item">
                                <div className="bg-warning text-white avatar-text">B</div>
                                <div className="ms-3 item-desc">
                                    <div className="w-100 d-flex align-items-center justify-content-between">
                                        <a href="javascript:void(0);" className="hstack gap-2 me-2">
                                            <span>Bryan Waters</span>
                                            <div className="wd-5 ht-5 rounded-circle opacity-75 me-1 bg-gray-500"></div>
                                            <span className="fs-10 fw-medium text-muted text-uppercase d-none d-sm-block">10 min ago</span>
                                        </a>
                                        <div className="dropdown">
                                            <a href="javascript:void(0)" className="avatar-text avatar-sm" data-bs-toggle="dropdown">
                                                <i className="feather-more-vertical"></i>
                                            </a>
                                            <ul className="dropdown-menu dropdown-menu-end overflow-auto">
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-check-circle me-3"></i>
                                                        <span>Make as Read</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-star me-3"></i>
                                                        <span>Add to Favorite</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-bell-off me-3"></i>
                                                        <span>Mute Notifications</span>
                                                    </a>
                                                </li>
                                                <li className="dropdown-divider"></li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#voiceCallingModalScreen">
                                                        <i className="feather-phone-call me-3"></i>
                                                        <span>Audio Call</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#videoCallingModalScreen">
                                                        <i className="feather-video me-3"></i>
                                                        <span>Video Call</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-mail me-3"></i>
                                                        <span>Send eMail</span>
                                                    </a>
                                                </li>
                                                <li className="dropdown-divider"></li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-alert-triangle me-3"></i>
                                                        <span>Report Chat</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-trash-2 me-3"></i>
                                                        <span>Delete Chat</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-archive me-3"></i>
                                                        <span>Archive Chat</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <p className="fs-12 text-muted mt-2 mb-0 text-truncate-2-line">Lorem ipsum dolor sit amet, consec tetuer adipi scing elit aenean commodo ipsum dolor sit amet, consec tetuer adipi scing elit aenean commodo</p>
                                </div>
                            </div>
                            <div className="p-4 d-flex position-relative border-bottom c-pointer single-item">
                                <div className="avatar-image">
                                    <img src="assets/images/avatar/12.png" className="img-fluid" alt="image" />
                                </div>
                                <div className="ms-3 item-desc">
                                    <div className="w-100 d-flex align-items-center justify-content-between">
                                        <a href="javascript:void(0);" className="hstack gap-2 me-2">
                                            <span>Ursula Sanders</span>
                                            <div className="wd-5 ht-5 rounded-circle opacity-75 me-1 bg-success"></div>
                                            <span className="fs-10 fw-medium text-muted text-uppercase d-none d-sm-block">9 min ago</span>
                                        </a>
                                        <div className="dropdown">
                                            <a href="javascript:void(0)" className="avatar-text avatar-sm" data-bs-toggle="dropdown">
                                                <i className="feather-more-vertical"></i>
                                            </a>
                                            <ul className="dropdown-menu dropdown-menu-end overflow-auto">
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-check-circle me-3"></i>
                                                        <span>Make as Read</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-star me-3"></i>
                                                        <span>Add to Favorite</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-bell-off me-3"></i>
                                                        <span>Mute Notifications</span>
                                                    </a>
                                                </li>
                                                <li className="dropdown-divider"></li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#voiceCallingModalScreen">
                                                        <i className="feather-phone-call me-3"></i>
                                                        <span>Audio Call</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#videoCallingModalScreen">
                                                        <i className="feather-video me-3"></i>
                                                        <span>Video Call</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-mail me-3"></i>
                                                        <span>Send eMail</span>
                                                    </a>
                                                </li>
                                                <li className="dropdown-divider"></li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-alert-triangle me-3"></i>
                                                        <span>Report Chat</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-trash-2 me-3"></i>
                                                        <span>Delete Chat</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-archive me-3"></i>
                                                        <span>Archive Chat</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <p className="fs-12 text-muted mt-2 mb-0 text-truncate-2-line">Lorem ipsum dolor sit amet, consec tetuer adipi scing elit aenean commodo ipsum dolor sit amet, consec tetuer adipi scing elit aenean commodo</p>
                                </div>
                            </div>
                            <div className="p-4 d-flex position-relative border-bottom c-pointer single-item">
                                <div className="bg-danger text-white avatar-text">E</div>
                                <div className="ms-3 item-desc">
                                    <div className="w-100 d-flex align-items-center justify-content-between">
                                        <a href="javascript:void(0);" className="hstack gap-2 me-2">
                                            <span>Edward Andrade</span>
                                            <div className="wd-5 ht-5 rounded-circle opacity-75 me-1 bg-success"></div>
                                            <span className="fs-10 fw-medium text-muted text-uppercase d-none d-sm-block">13 min ago</span>
                                        </a>
                                        <div className="dropdown">
                                            <a href="javascript:void(0)" className="avatar-text avatar-sm" data-bs-toggle="dropdown">
                                                <i className="feather-more-vertical"></i>
                                            </a>
                                            <ul className="dropdown-menu dropdown-menu-end overflow-auto">
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-check-circle me-3"></i>
                                                        <span>Make as Read</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-star me-3"></i>
                                                        <span>Add to Favorite</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-bell-off me-3"></i>
                                                        <span>Mute Notifications</span>
                                                    </a>
                                                </li>
                                                <li className="dropdown-divider"></li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#voiceCallingModalScreen">
                                                        <i className="feather-phone-call me-3"></i>
                                                        <span>Audio Call</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#videoCallingModalScreen">
                                                        <i className="feather-video me-3"></i>
                                                        <span>Video Call</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-mail me-3"></i>
                                                        <span>Send eMail</span>
                                                    </a>
                                                </li>
                                                <li className="dropdown-divider"></li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-alert-triangle me-3"></i>
                                                        <span>Report Chat</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-trash-2 me-3"></i>
                                                        <span>Delete Chat</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-archive me-3"></i>
                                                        <span>Archive Chat</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <p className="fs-12 text-muted mt-2 mb-0 text-truncate-2-line">Lorem ipsum dolor sit amet, consec tetuer adipi scing elit aenean commodo ipsum dolor sit amet, consec tetuer adipi scing elit aenean commodo</p>
                                </div>
                            </div>
                            <div className="p-4 d-flex position-relative border-bottom c-pointer single-item">
                                <div className="avatar-image">
                                    <img src="assets/images/avatar/1.png" className="img-fluid" alt="image" />
                                </div>
                                <div className="ms-3 item-desc">
                                    <div className="w-100 d-flex align-items-center justify-content-between">
                                        <a href="javascript:void(0);" className="hstack gap-2 me-2">
                                            <span>Alexandra Della</span>
                                            <div className="wd-5 ht-5 rounded-circle opacity-75 me-1 bg-success"></div>
                                            <span className="fs-10 fw-medium text-muted text-uppercase d-none d-sm-block">15 min ago</span>
                                        </a>
                                        <div className="dropdown">
                                            <a href="javascript:void(0)" className="avatar-text avatar-sm" data-bs-toggle="dropdown">
                                                <i className="feather-more-vertical"></i>
                                            </a>
                                            <ul className="dropdown-menu dropdown-menu-end overflow-auto">
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-check-circle me-3"></i>
                                                        <span>Make as Read</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-star me-3"></i>
                                                        <span>Add to Favorite</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-bell-off me-3"></i>
                                                        <span>Mute Notifications</span>
                                                    </a>
                                                </li>
                                                <li className="dropdown-divider"></li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#voiceCallingModalScreen">
                                                        <i className="feather-phone-call me-3"></i>
                                                        <span>Audio Call</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#videoCallingModalScreen">
                                                        <i className="feather-video me-3"></i>
                                                        <span>Video Call</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-mail me-3"></i>
                                                        <span>Send eMail</span>
                                                    </a>
                                                </li>
                                                <li className="dropdown-divider"></li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-alert-triangle me-3"></i>
                                                        <span>Report Chat</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-trash-2 me-3"></i>
                                                        <span>Delete Chat</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-archive me-3"></i>
                                                        <span>Archive Chat</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <p className="fs-12 text-muted mt-2 mb-0 text-truncate-2-line">Lorem ipsum dolor sit amet, consec tetuer adipi scing elit aenean commodo ipsum dolor sit amet, consec tetuer adipi scing elit aenean commodo</p>
                                </div>
                            </div>
                            <div className="p-4 d-flex position-relative border-bottom c-pointer single-item">
                                <div className="bg-gray-200 text-dark avatar-text">T</div>
                                <div className="ms-3 item-desc">
                                    <div className="w-100 d-flex align-items-center justify-content-between">
                                        <a href="javascript:void(0);" className="hstack gap-2 me-2">
                                            <span>Timothy Boyd</span>
                                            <div className="wd-5 ht-5 rounded-circle opacity-75 me-1 bg-success"></div>
                                            <span className="fs-10 fw-medium text-muted text-uppercase d-none d-sm-block">13 min ago</span>
                                        </a>
                                        <div className="dropdown">
                                            <a href="javascript:void(0)" className="avatar-text avatar-sm" data-bs-toggle="dropdown">
                                                <i className="feather-more-vertical"></i>
                                            </a>
                                            <ul className="dropdown-menu dropdown-menu-end overflow-auto">
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-check-circle me-3"></i>
                                                        <span>Make as Read</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-star me-3"></i>
                                                        <span>Add to Favorite</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-bell-off me-3"></i>
                                                        <span>Mute Notifications</span>
                                                    </a>
                                                </li>
                                                <li className="dropdown-divider"></li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#voiceCallingModalScreen">
                                                        <i className="feather-phone-call me-3"></i>
                                                        <span>Audio Call</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#videoCallingModalScreen">
                                                        <i className="feather-video me-3"></i>
                                                        <span>Video Call</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-mail me-3"></i>
                                                        <span>Send eMail</span>
                                                    </a>
                                                </li>
                                                <li className="dropdown-divider"></li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-alert-triangle me-3"></i>
                                                        <span>Report Chat</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-trash-2 me-3"></i>
                                                        <span>Delete Chat</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-archive me-3"></i>
                                                        <span>Archive Chat</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <p className="fs-12 text-muted mt-2 mb-0 text-truncate-2-line">Lorem ipsum dolor sit amet, consec tetuer adipi scing elit aenean commodo ipsum dolor sit amet, consec tetuer adipi scing elit aenean commodo</p>
                                </div>
                            </div>
                            <div className="p-4 d-flex position-relative border-bottom c-pointer single-item">
                                <div className="avatar-image">
                                    <img src="assets/images/avatar/2.png" className="img-fluid" alt="image" />
                                </div>
                                <div className="ms-3 item-desc">
                                    <div className="w-100 d-flex align-items-center justify-content-between">
                                        <a href="javascript:void(0);" className="hstack gap-2 me-2">
                                            <span>Curtis Green</span>
                                            <div className="wd-5 ht-5 rounded-circle opacity-75 me-1 bg-success"></div>
                                            <span className="fs-10 fw-medium text-muted text-uppercase d-none d-sm-block">20 min ago</span>
                                        </a>
                                        <div className="dropdown">
                                            <a href="javascript:void(0)" className="avatar-text avatar-sm" data-bs-toggle="dropdown">
                                                <i className="feather-more-vertical"></i>
                                            </a>
                                            <ul className="dropdown-menu dropdown-menu-end overflow-auto">
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-check-circle me-3"></i>
                                                        <span>Make as Read</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-star me-3"></i>
                                                        <span>Add to Favorite</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-bell-off me-3"></i>
                                                        <span>Mute Notifications</span>
                                                    </a>
                                                </li>
                                                <li className="dropdown-divider"></li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#voiceCallingModalScreen">
                                                        <i className="feather-phone-call me-3"></i>
                                                        <span>Audio Call</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#videoCallingModalScreen">
                                                        <i className="feather-video me-3"></i>
                                                        <span>Video Call</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-mail me-3"></i>
                                                        <span>Send eMail</span>
                                                    </a>
                                                </li>
                                                <li className="dropdown-divider"></li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-alert-triangle me-3"></i>
                                                        <span>Report Chat</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-trash-2 me-3"></i>
                                                        <span>Delete Chat</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="dropdown-item">
                                                        <i className="feather-archive me-3"></i>
                                                        <span>Archive Chat</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <p className="fs-12 text-muted mt-2 mb-0 text-truncate-2-line">Lorem ipsum dolor sit amet, consec tetuer adipi scing elit aenean commodo ipsum dolor sit amet, consec tetuer adipi scing elit aenean commodo</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a href="javascript:void(0);" className="content-sidebar-footer px-4 py-3 fs-11 text-uppercase d-block text-center">Load More</a>
                </div>
              
                <div className="content-area" data-scrollbar-target="#psScrollbarInit">
                    <div className="content-area-header sticky-top">
                        <div className="page-header-left hstack gap-4">
                            <a href="javascript:void(0);" className="app-sidebar-open-trigger">
                                <i className="feather-align-left fs-20"></i>
                            </a>
                            <a href="javascript:void(0);" className="d-flex align-items-center justify-content-center gap-3" data-bs-toggle="offcanvas" data-bs-target="#userProfileDetails">
                                <div className="avatar-image">
                                    <img src="assets/images/avatar/1.png" className="img-fluid" alt="image" />
                                </div>
                                <div className="d-none d-sm-block">
                                    <div className="fw-bold d-flex align-items-center">Alexandra Della</div>
                                    <div className="d-flex align-items-center mt-1">
                                        <span className="wd-7 ht-7 rounded-circle opacity-75 me-2 bg-success"></span>
                                        <span className="fs-9 text-uppercase fw-bold text-success">Active Now</span>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="page-header-right ms-auto">
                            <div className="d-flex align-items-center justify-content-center gap-2">
                                <a href="javascript:void(0)" className="d-flex" data-bs-toggle="modal" data-bs-target="#voiceCallingModalScreen">
                                    <div className="avatar-text avatar-md" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Voice Call">
                                        <i className="feather-phone-call"></i>
                                    </div>
                                </a>
                                <a href="javascript:void(0)" className="d-flex d-flex" data-bs-toggle="modal" data-bs-target="#videoCallingModalScreen">
                                    <div className="avatar-text avatar-md" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Video Call">
                                        <i className="feather-video"></i>
                                    </div>
                                </a>
                                <a href="javascript:void(0)" className="d-flex d-none d-sm-block successAlertMessage">
                                    <div className="avatar-text avatar-md" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Add to Favorite">
                                        <i className="feather-star"></i>
                                    </div>
                                </a>
                                <a href="javascript:void(0)" className="ac-info-sidebar-open-trigger" data-bs-toggle="offcanvas" data-bs-target="#userProfileDetails">
                                    <div className="avatar-text avatar-md" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Profile Info">
                                        <i className="feather-info"></i>
                                    </div>
                                </a>
                                <div className="dropdown">
                                    <a href="javascript:void(0);" className="avatar-text avatar-md" data-bs-toggle="dropdown" data-bs-offset="0,22">
                                        <i className="feather-more-vertical"></i>
                                    </a>
                                    <div className="dropdown-menu">
                                        <a href="javascript:void(0);" className="dropdown-item">
                                            <i className="feather-plus me-3"></i>
                                            <span> Join Group</span>
                                        </a>
                                        <a href="javascript:void(0);" className="dropdown-item">
                                            <i className="feather-user-plus me-3"></i>
                                            <span>Invite People</span>
                                        </a>
                                        <a href="javascript:void(0);" className="dropdown-item">
                                            <i className="feather-star me-3"></i>
                                            <span>Add to Favorite</span>
                                        </a>
                                        <a href="javascript:void(0);" className="dropdown-item">
                                            <i className="feather-bell-off me-3"></i>
                                            <span>Mute Conversion</span>
                                        </a>
                                        <div className="dropdown-divider"></div>
                                        <a href="javascript:void(0);" className="dropdown-item">
                                            <i className="feather-phone-call me-3"></i>
                                            <span>Group Audio Call</span>
                                        </a>
                                        <a href="javascript:void(0);" className="dropdown-item">
                                            <i className="feather-video me-3"></i>
                                            <span>Group Video Call</span>
                                        </a>
                                        <div className="dropdown-divider"></div>
                                        <a href="javascript:void(0);" className="dropdown-item">
                                            <i className="feather-slash me-3"></i>
                                            <span>Block Conversion</span>
                                        </a>
                                        <a href="javascript:void(0);" className="dropdown-item">
                                            <i className="feather-trash-2 me-3"></i>
                                            <span>Delete Conversion</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content-area-body">

                        <div className="single-chat-item mb-5">
                            <div className="d-flex align-items-center gap-3 mb-3">
                                <a href="javascript:void(0)" className="avatar-image">
                                    <img src="assets/images/avatar/1.png" className="img-fluid rounded-circle" alt="image" />
                                </a>
                                <div className="d-flex align-items-center gap-2">
                                    <a href="javascript:void(0);">Alexandra Della</a>
                                    <span className="wd-5 ht-5 bg-gray-400 rounded-circle"></span>
                                    <span className="fs-11 text-muted">10:32 PM</span>
                                </div>
                            </div>
                            <div className="wd-500 p-3 rounded-5 bg-gray-200">
                                <p className="py-2 px-3 rounded-5 bg-white">Hi,</p>
                                <p className="py-2 px-3 rounded-5 bg-white mb-0">How are you?</p>
                            </div>
                        </div>
                     
                        <div className="single-chat-item mb-5">
                            <div className="d-flex flex-row-reverse align-items-center gap-3 mb-3">
                                <a href="javascript:void(0)" className="avatar-image">
                                    <img src="assets/images/avatar/2.png" className="img-fluid rounded-circle" alt="image" />
                                </a>
                                <div className="d-flex flex-row-reverse align-items-center gap-2">
                                    <a href="javascript:void(0);">Green Cute</a>
                                    <span className="wd-5 ht-5 bg-gray-400 rounded-circle"></span>
                                    <span className="fs-11 text-muted">10:35 PM</span>
                                </div>
                            </div>
                            <div className="wd-500 p-3 rounded-5 bg-gray-200 ms-auto">
                                <p className="py-2 px-3 rounded-5 bg-white">Hello Alex!!! Welcome to Live Chat!!!</p>
                                <p className="py-2 px-3 rounded-5 bg-white mb-0">My name is Green & How can I help you today???</p>
                            </div>
                        </div>
                       
                        <div className="single-chat-item mb-5">
                            <div className="d-flex align-items-center gap-3 mb-3">
                                <a href="javascript:void(0)" className="avatar-image">
                                    <img src="assets/images/avatar/1.png" className="img-fluid rounded-circle" alt="image" />
                                </a>
                                <div className="d-flex align-items-center gap-2">
                                    <a href="javascript:void(0);">Alexandra Della</a>
                                    <span className="wd-5 ht-5 bg-gray-400 rounded-circle"></span>
                                    <span className="fs-11 text-muted">10:40 PM</span>
                                </div>
                            </div>
                            <div className="wd-500 p-3 rounded-5 bg-gray-200">
                                <p className="py-2 px-3 rounded-5 bg-white">Hi, I wanted to check my order status....</p>
                                <p className="py-2 px-3 rounded-5 bg-white mb-0">My order number is <a href="javascript:void(0);">#NXL0458</a></p>
                            </div>
                        </div>
                      
                        <div className="single-chat-item mb-5">
                            <div className="d-flex flex-row-reverse align-items-center gap-3 mb-3">
                                <a href="javascript:void(0)" className="avatar-image">
                                    <img src="assets/images/avatar/2.png" className="img-fluid rounded-circle" alt="image" />
                                </a>
                                <div className="d-flex flex-row-reverse align-items-center gap-2">
                                    <a href="javascript:void(0);">Green Cute</a>
                                    <span className="wd-5 ht-5 bg-gray-400 rounded-circle"></span>
                                    <span className="fs-11 text-muted">10:42 PM</span>
                                </div>
                            </div>
                            <div className="wd-500 p-3 rounded-5 bg-gray-200 ms-auto">
                                <p className="py-2 px-3 rounded-5 bg-white">No problem, let me check that for you.</p>
                                <p className="py-2 px-3 rounded-5 bg-white">Thanks for the information!!! Give me one moment please while I check on that for you.</p>
                                <p className="py-2 px-3 rounded-5 bg-white mb-0">Thanks for your times, Your order <a href="javascript:void(0);">#NXL0458</a> will arive on this weekend.</p>
                            </div>
                        </div>
                       
                        <div className="single-chat-item mb-5">
                            <div className="d-flex align-items-center gap-3 mb-3">
                                <a href="javascript:void(0)" className="avatar-image">
                                    <img src="assets/images/avatar/1.png" className="img-fluid rounded-circle" alt="image"/>
                                </a>
                                <div className="d-flex align-items-center gap-2">
                                    <a href="javascript:void(0);">Alexandra Della</a>
                                    <span className="wd-5 ht-5 bg-gray-400 rounded-circle"></span>
                                    <span className="fs-11 text-muted">10:45 PM</span>
                                </div>
                            </div>
                            <div className="wd-500 p-3 rounded-5 bg-gray-200">
                                <p className="py-2 px-3 rounded-5 bg-white">Thanks. I'm worried😳 it won't arrive in time⌚ for my daughter's birthday🎂 party🎉 this weekend.</p>
                                <p className="py-2 px-3 rounded-5 bg-white mb-0">Order tracking number is: <a href="javascript:void(0);">#698745</a></p>
                            </div>
                        </div>
                       
                        <div className="single-chat-item mb-5">
                            <div className="d-flex flex-row-reverse align-items-center gap-3 mb-3">
                                <a href="javascript:void(0)" className="avatar-image">
                                    <img src="assets/images/avatar/2.png" className="img-fluid rounded-circle" alt="image" />
                                </a>
                                <div className="d-flex flex-row-reverse align-items-center gap-2">
                                    <a href="javascript:void(0);">Green Cute</a>
                                    <span className="wd-5 ht-5 bg-gray-400 rounded-circle"></span>
                                    <span className="fs-11 text-muted">10:48 PM</span>
                                </div>
                            </div>
                            <div className="wd-500 p-3 rounded-5 bg-gray-200 ms-auto">
                                <p className="py-2 px-3 rounded-5 bg-white">I understand your concern… I wouldn't want my child's gift to arrive late either.</p>
                                <p className="py-2 px-3 rounded-5 bg-white">It looks like your order is set to arrive in 2 business days, so it should arrive by Friday, just in time!</p>
                                <div className="mb-3 d-flex align-items-center justify-content-between bg-white border rounded-3">
                                    <div className="d-flex align-items-center">
                                        <a href="javascript:void(0)" className="p-3 d-flex align-items-center border-end wd-70 ht-70">
                                            <img src="assets/images/file-icons/zip.png" className="img-fluid" alt="image"/>
                                        </a>
                                        <div className="d-block ms-3">
                                            <a href="javascript:void(0)" className="fs-13 fw-700 text-dark d-block">Order.zip</a>
                                            <small className="fw-300 text-dark">402.65/KB</small>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center p-3 border-start">
                                        <a href="javascript:void(0)" className="avatar-text file-download">
                                            <i className="feather-download"></i>
                                        </a>
                                    </div>
                                </div>
                                <div className="mb-3 d-flex align-items-center justify-content-between bg-white border rounded-3">
                                    <div className="d-flex align-items-center">
                                        <a href="javascript:void(0)" className="p-3 d-flex align-items-center border-end wd-70 ht-70">
                                            <img src="assets/images/file-icons/png.png" className="img-fluid" alt="image"/>
                                        </a>
                                        <div className="d-block ms-3">
                                            <a href="javascript:void(0)" className="fs-13 fw-700 text-dark d-block">Document.png</a>
                                            <small className="fw-300 text-dark">480.14/KB</small>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center p-3 border-start">
                                        <a href="javascript:void(0)" className="avatar-text file-download">
                                            <i className="feather-download"></i>
                                        </a>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between bg-white border rounded-3">
                                    <div className="d-flex align-items-center">
                                        <a href="javascript:void(0)" className="p-3 d-flex align-items-center border-end wd-70 ht-70">
                                            <img src="assets/images/file-icons/psd.png" className="img-fluid" alt="image" />
                                        </a>
                                        <div className="d-block ms-3">
                                            <a href="javascript:void(0)" className="fs-13 fw-700 text-dark d-block">Photos.psd</a>
                                            <small className="fw-300 text-dark">248.54/KB</small>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center p-3 border-start">
                                        <a href="javascript:void(0)" className="avatar-text file-download">
                                            <i className="feather-download"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                       
                        <div className="single-chat-item mb-5">
                            <div className="d-flex align-items-center gap-3 mb-3">
                                <a href="javascript:void(0)" className="avatar-image">
                                    <img src="assets/images/avatar/1.png" className="img-fluid rounded-circle" alt="image"/>
                                </a>
                                <div className="d-flex align-items-center gap-2">
                                    <a href="javascript:void(0);">Alexandra Della</a>
                                    <span className="wd-5 ht-5 bg-gray-400 rounded-circle"></span>
                                    <span className="fs-11 text-muted">10:50 PM</span>
                                </div>
                            </div>
                            <div className="wd-500 p-3 rounded-5 bg-gray-200">
                                <p className="py-2 px-3 rounded-5 bg-white">The birthday🎂 ceremony preparation almost completed</p>
                                <p className="py-2 px-3 rounded-5 bg-white mb-0">Thank your so much.....!!!!</p>
                            </div>
                        </div>
                      
                        <div className="single-chat-item mb-5">
                            <div className="d-flex flex-row-reverse align-items-center gap-3 mb-3">
                                <a href="javascript:void(0)" className="avatar-image">
                                    <img src="assets/images/avatar/2.png" className="img-fluid rounded-circle" alt="image"/>
                                </a>
                                <div className="d-flex flex-row-reverse align-items-center gap-2">
                                    <a href="javascript:void(0);">Green Cute</a>
                                    <span className="wd-5 ht-5 bg-gray-400 rounded-circle"></span>
                                    <span className="fs-11 text-muted">10:53 PM</span>
                                </div>
                            </div>
                            <div className="wd-500 p-3 rounded-5 bg-gray-200 ms-auto">
                                <p className="py-2 px-3 rounded-5 bg-white">I understand your concern......!!</p>
                                <p className="py-2 px-3 rounded-5 bg-white mb-0">Anything else can I help you???</p>
                            </div>
                        </div>
                       
                        <div className="single-chat-item mb-0">
                            <div className="d-flex align-items-center gap-3 mb-3">
                                <a href="javascript:void(0)" className="avatar-image">
                                    <img src="assets/images/avatar/1.png" className="img-fluid rounded-circle" alt="image"/>
                                </a>
                                <div className="d-flex align-items-center gap-2">
                                    <a href="javascript:void(0);">Alexandra Della</a>
                                    <span className="wd-5 ht-5 bg-gray-400 rounded-circle"></span>
                                    <span className="fs-11 text-muted">00:00 AM/PM</span>
                                </div>
                            </div>
                            <div className="wd-500 p-3 rounded-5 bg-gray-200">
                                <div className="py-2 px-3 rounded-5 bg-white d-flex align-items-center text typing chat-message-items">
                                    <div className="fs-12 fw-semibold text-success">Typing</div>
                                    <div className="wave">
                                        <span className="dot"></span>
                                        <span className="dot"></span>
                                        <span className="dot"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                    
                  
                    
                </div>
                
            </div>
           
        </div>
   
  )
}

export default Chat