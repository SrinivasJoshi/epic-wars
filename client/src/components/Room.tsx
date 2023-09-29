import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
export default function Room() {
  const { roomId } = useParams();
  return (
    <div>
      <Navbar />
      <section className="bg-primary min-h-screen flex flex-col items-center justify-evenly">
        <h1 className="text-4xl text-secondary font-bold font-Handjet">
          Welcome to the Room - {roomId}
        </h1>
      </section>
    </div>
  );
}
