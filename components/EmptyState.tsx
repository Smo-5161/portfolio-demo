export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="card border-dashed p-10 text-center text-ink-500">
      {message}
    </div>
  );
}
