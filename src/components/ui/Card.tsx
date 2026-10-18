
import type { ReactNode } from "react";

interface CardProps {
  title: string;
  description: string;
  image?: string;
  children?: ReactNode;
}

export default function Card({
  title,
  description,
  image,
  children,
}: CardProps) {
  return (
    <article className="reusable-card">
      {image && (
        <img className="card-image" src={image} alt={title} />
      )}

      <div className="card-body">
        <h3>{title}</h3>
        <p>{description}</p>

        {children && <div className="card-children">{children}</div>}
      </div>
    </article>
  );
}
