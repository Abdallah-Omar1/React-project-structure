import { useState } from "react";
import Button from "../components/ui/Button";
import EmptyState from "../components/common/EmptyState";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="home-page">
      <h1>Home Page</h1>

      <p>Welcome</p>

      <Button onClick={() => setIsOpen(true)}>
        Test Button
      </Button>


      <EmptyState
        title="Test project"
        description="This is React Project Structure assignment."
      />

      {isOpen && (
        <div
          className="modal-overlay"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="modal-content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close modal"
            >
              &times;
            </button>

            <div className="modal-icon">✓</div>

            <h2 id="modal-title">Success!</h2>

            <p>Hello in my Task!</p>

            <Button onClick={() => setIsOpen(false)}>
              close it
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}