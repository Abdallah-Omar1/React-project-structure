
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Table from "../components/ui/Table";

const products = [
  { Name: "Laptop", Price: 25000, Category: "Electronics" },
  { Name: "Headphones", Price: 1500, Category: "Accessories" },
  { Name: "Keyboard", Price: 900, Category: "Accessories" },
  { Name: "Monitor", Price: 6500, Category: "Electronics" },
];

const students = [
  { Name: "Abdallah", Age: 24, City: "Cairo" },
  { Name: "Atef", Age: 21, City: "Giza" },
  { Name: "Omar", Age: 23, City: "Alexandria" },
];

export default function Home() {
  const handleClick = (message: string) => {
    alert(message);
  };

  return (
    <div className="home-page">
      <section className="hero">
        <span className="eyebrow">REACT · ASSIGNMENT 2</span>
        <h1>Reusable Components</h1>
        <p>
          Build once, reuse everywhere. Explore reusable buttons,
          cards, and tables powered by React props.
        </p>

        <div className="button-group">
          <Button
            text="Get Started"
            variant="primary"
            onClick={() => handleClick("Welcome to Reusable Components!")}
          />

          <Button
            text="Learn More"
            variant="secondary"
            onClick={() => handleClick("Explore the components below.")}
          />

          <Button
            text="Disabled Button"
            variant="danger"
            disabled
            onClick={() => handleClick("This will not run.")}
          />
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <span className="eyebrow">01 · CARD COMPONENT</span>
          <h2>Explore Our Cards</h2>
          <p>The same Card component, displaying different content.</p>
        </div>

        <div className="card-grid">
          <Card
            title="Web Development"
            description="Learn to build modern websites using React, TypeScript, and reusable UI components."
            image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
          >
            <Button
              text="Explore Course"
              variant="primary"
              onClick={() => handleClick("Web Development selected!")}
            />
          </Card>

          <Card
            title="UI/UX Design"
            description="Create intuitive digital experiences with thoughtful layouts and consistent design."
            image="https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80"
          >
            <p className="card-note">
              Includes design principles and prototyping.
            </p>
          </Card>

          <Card
            title="Clean Code"
            description="Write maintainable applications by organizing code into small, reusable components."
          >
            <Button
              text="View Details"
              variant="secondary"
              onClick={() => handleClick("Clean Code selected!")}
            />
          </Card>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <span className="eyebrow">02 · TABLE COMPONENT</span>
          <h2>Product Inventory</h2>
          <p>A reusable table displaying product information.</p>
        </div>

        <Table
          columns={["Name", "Price", "Category"]}
          data={products}
          striped
        />
      </section>

      <section className="content-section">
        <div className="section-heading">
          <span className="eyebrow">03 · REUSABILITY</span>
          <h2>Student Directory</h2>
          <p>The same Table component with a different dataset.</p>
        </div>

        <Table
          columns={["Name", "Age", "City"]}
          data={students}
        />
      </section>
    </div>
  );
}
