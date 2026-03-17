import React from 'react'

export const Notification = () => {
  return (
    <>
     <div className="dropdown nxl-h-item">
                        <a className="nxl-head-link me-3" data-bs-toggle="dropdown" href="#" role="button" data-bs-auto-close="outside">
                            <i className="feather-bell"></i>
                            <span className="badge bg-danger nxl-h-badge">3</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end nxl-h-dropdown nxl-notifications-menu">
                            <div className="d-flex justify-content-between align-items-center notifications-head">
                                <h6 className="fw-bold text-dark mb-0">Notifications</h6>
                                <a href="javascript:void(0);" className="fs-11 text-success text-end ms-auto" data-bs-toggle="tooltip" title="Make as Read">
                                    <i className="feather-check"></i>
                                    <span>Make as Read</span>
                                </a>
                            </div>
                            <div className="notifications-item">
                                <img src="assets/images/avatar/2.png" alt="" className="rounded me-3 border" />
                                <div className="notifications-desc">
                                    <a href="javascript:void(0);" className="font-body text-truncate-2-line"> <span className="fw-semibold text-dark">Malanie Hanvey</span> We should talk about that at lunch!</a>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="notifications-date text-muted border-bottom border-bottom-dashed">2 minutes ago</div>
                                        <div className="d-flex align-items-center float-end gap-2">
                                            <a href="javascript:void(0);" className="d-block wd-8 ht-8 rounded-circle bg-gray-300" data-bs-toggle="tooltip" title="Make as Read"></a>
                                            <a href="javascript:void(0);" className="text-danger" data-bs-toggle="tooltip" title="Remove">
                                                <i className="feather-x fs-12"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="notifications-item">
                                <img src="assets/images/avatar/3.png" alt="" className="rounded me-3 border" />
                                <div className="notifications-desc">
                                    <a href="javascript:void(0);" className="font-body text-truncate-2-line"> <span className="fw-semibold text-dark">Valentine Maton</span> You can download the latest invoices now.</a>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="notifications-date text-muted border-bottom border-bottom-dashed">36 minutes ago</div>
                                        <div className="d-flex align-items-center float-end gap-2">
                                            <a href="javascript:void(0);" className="d-block wd-8 ht-8 rounded-circle bg-gray-300" data-bs-toggle="tooltip" title="Make as Read"></a>
                                            <a href="javascript:void(0);" className="text-danger" data-bs-toggle="tooltip" title="Remove">
                                                <i className="feather-x fs-12"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="notifications-item">
                                <img src="assets/images/avatar/4.png" alt="" className="rounded me-3 border" />
                                <div className="notifications-desc">
                                    <a href="javascript:void(0);" className="font-body text-truncate-2-line"> <span className="fw-semibold text-dark">Archie Cantones</span> Don't forget to pickup Jeremy after school!</a>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="notifications-date text-muted border-bottom border-bottom-dashed">53 minutes ago</div>
                                        <div className="d-flex align-items-center float-end gap-2">
                                            <a href="javascript:void(0);" className="d-block wd-8 ht-8 rounded-circle bg-gray-300" data-bs-toggle="tooltip" title="Make as Read"></a>
                                            <a href="javascript:void(0);" className="text-danger" data-bs-toggle="tooltip" title="Remove">
                                                <i className="feather-x fs-12"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center notifications-footer">
                                <a href="javascript:void(0);" className="fs-13 fw-semibold text-dark">Alls Notifications</a>
                            </div>
                        </div>
</div>
    </>
  )
}
