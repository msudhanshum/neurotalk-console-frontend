import React from 'react'

export const Timesheets = () => {
  return (
    <>
    
     <div className="dropdown nxl-h-item">
                        <a href="javascript:void(0);" className="nxl-head-link me-0" data-bs-toggle="dropdown" role="button" data-bs-auto-close="outside">
                            <i className="feather-clock"></i>
                            <span className="badge bg-success nxl-h-badge">2</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end nxl-h-dropdown nxl-timesheets-menu">
                            <div className="d-flex justify-content-between align-items-center timesheets-head">
                                <h6 className="fw-bold text-dark mb-0">Timesheets</h6>
                                <a href="javascript:void(0);" className="fs-11 text-success text-end ms-auto" data-bs-toggle="tooltip" title="Upcomming Timers">
                                    <i className="feather-clock"></i>
                                    <span>3 Upcomming</span>
                                </a>
                            </div>
                            <div className="d-flex justify-content-between align-items-center flex-column timesheets-body">
                                <i className="feather-clock fs-1 mb-4"></i>
                                <p className="text-muted">No started timers found yes!</p>
                                <a href="javascript:void(0);" className="btn btn-sm btn-primary">Started Timer</a>
                            </div>
                            <div className="text-center timesheets-footer">
                                <a href="javascript:void(0);" className="fs-13 fw-semibold text-dark">Alls Timesheets</a>
                            </div>
                        </div>
               </div>
    
    </>
  )
}
