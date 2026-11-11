export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="card border-dashed p-10 text-center text-night-500">
      {message}
    </div>
  );
}
