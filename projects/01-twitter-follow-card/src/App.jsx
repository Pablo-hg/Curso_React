import "./App.css";
import { TwitterFollowCard } from "./assets/TwitterFollowCard";

const users = [
  {
    userName: "juacho",
    name: "Juan Perez",
    isFollowing: true,
  },
  {
    userName: "pepito",
    name: "Pepito Fernandez",
    isFollowing: false,
  },
  {
    userName: "PacoHdezs",
    name: "Paco Hdez",
    isFollowing: true,
  },
  {
    userName: "TMChein",
    name: "Tomas",
    isFollowing: false,
  },
];

export function App() {
  return (
    <section className="App">
      {users.map(({ userName, name, isFollowing }) => (
        <TwitterFollowCard
          key={userName}
          userName={userName}
          initialIsFollowing={isFollowing}
        >
          {name}
        </TwitterFollowCard>
      ))}
    </section>
  );
}
