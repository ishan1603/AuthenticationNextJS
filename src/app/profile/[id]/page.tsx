export default function UserProfile({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl">
        Profile page{" "}
        <span className="p-2 rounded ml-2 bg-yellow-400">{params.id}</span>
      </p>
    </div>
  );
}
