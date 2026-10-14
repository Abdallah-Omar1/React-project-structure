interface EmptyStateProps {
    title?: string;
    description?: string;
  }
  
  export default function EmptyState({
    title = "No data found",
    description = "There is nothing to display yet.",
  }: EmptyStateProps) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="mt-2 text-gray-500">{description}</p>
      </div>
    );
  }