import { Link } from "react-router-dom";
import { Search, Armchair, Check } from "lucide-react";
import "./HowItWorks.css";

export function HowItWorks() {
  const steps = [
    {
      id: 1,
      icon: <Search />,
      title: "See it",
      description: "Browse restaurants near you with real photos of the room and the table."
    },
    {
      id: 2,
      icon: <Armchair />,
      title: "Choose it",
      description: "Pick the exact table, by the window, the booth, or the bar."
    },
    {
      id: 3,
      icon: <Check />,
      title: "Reserve it",
      description: "Confirm instantly and get reminded the day of your reservation."
    }
  ];

  return (
    <section className="how-it-works-section">
      <div className="how-it-works-header">
        <p className="subtitle">THE PROCESS</p>
        <h2 className="title">How reserving works</h2>
      </div>

      <div className="steps-container">
        {steps.map((step) => (
          <div key={step.id} className="step-card">
            {/* Clickable Icon Wrapper */}
            <Link to="/restaurants" className="icon-link">
              <div className="icon-wrapper">
                {step.icon}
              </div>
            </Link>
            
            <h3 className="step-title">{step.title}</h3>
            <p className="step-description">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}