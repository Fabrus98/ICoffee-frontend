import React from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export default function PannelloControllo() {
	const navigate = useNavigate();

	const buttons = [
		{ label: "Prenotazioni", icon: "pi pi-users", color: "p-button-primary", action: () => navigate("/pannello/utenti") },
		{ label: "Cibo", icon: "pi pi-calendar", color: "p-button-success", action: () => navigate("/pannello/prenotazioni") },
		{ label: "Utenti", icon: "pi pi-chart-bar", color: "p-button-warning", action: () => navigate("/pannello/statistiche") },
		{ label: "Impostazioni", icon: "pi pi-cog", color: "p-button-secondary", action: () => navigate("/pannello/impostazioni") },
		{ label: "Menu", icon: "pi pi-list", color: "p-button-help", action: () => navigate("/pannello/menu") },
	];

	return (
		<div style={{ maxWidth: "900px", margin: "2rem auto", textAlign: "center" }}>
			<h2>Pannello di Controllo</h2>
			<p>Scegli quale categoria gestire</p>

			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
					gap: "1.5rem",
					marginTop: "2rem",
				}}
			>
				{buttons.map((btn, index) => (
					<div key={index}>
						<Button
							className={`${btn.color} p-button-rounded p-button-lg`}
							style={{
								width: "100%",
								height: "140px",
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
								fontSize: "1rem",
							}}
							onClick={btn.action}
						>
							<i className={`${btn.icon}`} style={{ fontSize: "2rem", marginBottom: "0.5rem" }}></i>
							<span>{btn.label}</span>
						</Button>
					</div>
				))}
			</div>
		</div>
	);
}



/*
import { useNavigate } from "react-router-dom";
import "primereact/resources/themes/lara-light-blue/theme.css";
import { Button } from "primereact/button";

//export default function Home({ onLogout }) {
export default function Home() {
  const goTo = (path) => () => navigate(path);
  const navigate = useNavigate();
  const is_admin = localStorage.getItem("is_admin") === "true";

  return (
	<>
	  <div style={{ maxWidth: 400, margin: "2rem auto" }}>

		<div style={{ maxWidth: 300, margin: "2rem auto" }}>
		  <div style={{ display: "flex", padding: 10 }}>
			<Button
			  onClick={goTo("/prenotazione")}
			  label="Nuova prenotazione"
			  icon="pi pi-pen-to-square"
			  className="p-button-raised p-button-rounded p-button-lg"
			  style={{ width: "100%", justifyContent: "flex-start", padding: "1rem 1.25rem" }}
			/>
		  </div>
		  <div style={{ display: "flex", padding: 10 }}>
			<Button
			  onClick={goTo("/lista-prenotazioni")}
			  label="Tutte le prenotazioni"
			  icon="pi pi-book"
			  className="p-button-raised p-button-rounded p-button-lg"
			  style={{ width: "100%", justifyContent: "flex-start", padding: "1rem 1.25rem" }}
			/>
		  </div>
		  <div style={{ display: "flex", padding: 10 }}>
			<Button
			  onClick={goTo("/developing")}
			  label="Profilo"
			  icon="pi pi-user"
			  className="p-button-raised p-button-rounded p-button-lg"
			  style={{ width: "100%", justifyContent: "flex-start", padding: "1rem 1.25rem" }}
			/>
		  </div>
		  
		  {is_admin ? (
			<>
			  <div style={{ display: "flex", padding: 10 }}>
				<Button
				  onClick={goTo("/pannello")}
				  label="Pannello di Controllo"
				  icon="pi pi-cog"
				  className="p-button-raised p-button-rounded p-button-lg p-button-secondary"
				  style={{ width: "100%", justifyContent: "flex-start", padding: "1rem 1.25rem" }}
				/>
			  </div>
			  <div style={{ display: "flex", padding: 10 }}>
				<Button
				  onClick={goTo("/test")}
				  label="test"
				  icon="pi pi-cog"
				  className="p-button-raised p-button-rounded p-button-lg p-button-help"
				  style={{ width: "100%", justifyContent: "flex-start", padding: "1rem 1.25rem" }}
				/>
			  </div>
			</>
		  ) : (
			<>
			</>
		  )}
		</div>
	  </div>
	</>
  );
}
*/