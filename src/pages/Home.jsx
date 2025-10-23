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
        <div style={{ textAlign: "center" }}>
          <p>Buongiornissimo!</p>
        </div>

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
                  className="p-button-raised p-button-rounded p-button-lg p-button-danger"
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
