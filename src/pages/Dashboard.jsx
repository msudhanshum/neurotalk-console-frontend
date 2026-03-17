import React from "react";
import "../styles/dashboard.css";
const Dashboard = () => {

  const cards = [
    {
      title: "Total Companies",
      value: "120",
      icon: "feather-briefcase",
      color: "bg-primary",
      growth: "+12%"
    },
    {
      title: "Active Companies",
      value: "95",
      icon: "feather-check-circle",
      color: "bg-success",
      growth: "+8%"
    },
    {
      title: "Today Campaigns",
      value: "18",
      icon: "feather-send",
      color: "bg-info",
      growth: "+5%"
    },
    {
      title: "Running Campaigns",
      value: "10",
      icon: "feather-activity",
      color: "bg-warning",
      growth: "+3%"
    },
    {
      title: "Pending Calls",
      value: "27",
      icon: "feather-phone-call",
      color: "bg-danger",
      growth: "-2%"
    }
  ];

  return (
    <div className="row">

      {cards.map((card, index) => (
        <div className="col-xl-3 col-md-6 mb-4" key={index}>
          <div className="card border-0 shadow-sm h-100 dashboard-card">

            <div className="card-body">

              <div className="d-flex justify-content-between align-items-center">

                <div>
                  <p className="text-muted mb-1 fw-semibold">
                    {card.title}
                  </p>

                  <h3 className="fw-bold mb-2">
                    {card.value}
                  </h3>

                  <span className="text-success small">
                    {card.growth} this week
                  </span>
                </div>

                <div className={`icon-box ${card.color}`}>
                  <i className={card.icon}></i>
                </div>

              </div>

            </div>

          </div>
        </div>
      ))}

    </div>
  );
};

export default Dashboard;