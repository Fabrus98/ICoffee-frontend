import { useNavigate } from "react-router-dom";

export default function Home({ onLogout }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout();
  };

  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto" }}>
    	<h2>ICoffee ☕</h2>
    	<p>Spiacente, la pagina è ancora sotto sviluppo.<br></ br>Verrà aggiunta a breve</p>
    	<button onClick={() => navigate("/home")}>🏠 Home</button>
    </div>
  );
}
