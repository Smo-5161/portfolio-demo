export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="border border-dashed border-gray-300 p-6 text-center text-gray-600">
      {message}
    </div>
  );
}
