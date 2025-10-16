import { useState } from "react";
import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";

export default function Header({ onLogout }) {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("Home");

  const items = [
    {
      label: "Home",
      icon: "pi pi-home",
      command: () => {
        navigate("/home");
        setActiveItem("Home");
      },
    },
    {
      label: "Prenotazioni",
      icon: "pi pi-list",
      command: () => {
        navigate("/lista-prenotazioni");
        setActiveItem("Prenotazioni");
      },
    },
  ];

  const menuBarEnd = (
    <Button
      icon="pi pi-sign-out"
      className="p-button-rounded"
      onClick={onLogout}
      style={{
        height: "2rem",
        width: "2rem",
      }}
    />
  );

  return (
    <header
      style={{
        minWidth: "300px",
        display: "flex",
        alignItems: "center",
        padding: "0.5rem 1rem",
        background: "#2c3e50",
        color: "white",
        gap: "1rem",
      }}
    >
      <h1 style={{ margin: 0, whiteSpace: "nowrap" }}>☕ ICoffee</h1>

      <div style={{ flexGrow: 1 }}>
        <Menubar
          model={items}
          end={menuBarEnd}
          style={{
            width: "100%",
            minWidth: "95px",
            border: "none",
            padding: "0.25rem 0.5rem",
            height: "2.5rem",
            fontSize: "0.9rem",
          }}
        />
      </div>
    </header>
  );
}



/*
  const menuBarStart = (
    <h1 style={{ margin: 0 }}>☕ ICoffee</h1>
  );
  const items = [
    { label: "Home", icon: "pi pi-home", command: () => navigate("/home") },
  ];
  const menubarEnd = (
      <div className="flex align-items-center gap-2">
        <Button
          label="Logout"
          icon="pi pi-sign-out"
          className="p-button-rounded"
          onClick={onLogout}
          style={{
            backgroundColor: "#e2e2e2ff",
            borderColor: "#a1a1a1ff",
            color: "black",
          }}
        />
      </div>
  );



        <Menubar model={items} start= {menuBarStart} end={menubarEnd}/>

  */


/*    <div className="card">
      <Menubar model={items} />
    </div>




    
   [
    { label: "Logout", icon: "pi pi-sign-out", command: onLogout },
  ]
    

<Button
          label="Home"
          icon="pi pi-home"
          className="p-button p-button-squared"
          onClick={() => navigate("/home")}
          style={{
            backgroundColor: "#ffffffff",
            borderColor: "#000000ff",
            color: "black",
          }}
        />


    */