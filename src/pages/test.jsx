
import React, { useState, useEffect } from "react";
import axios from "axios";
import { PickList } from "primereact/picklist";
import { InputNumber } from "primereact/inputnumber";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function ProductPickList() {
  const [menu, setMenu] = useState([]);
  const [source, setSource] = useState([]); // tutti i prodotti
  const [target, setTarget] = useState([]); // prodotti selezionati
  const [ThisSession, setThisSession] = useState([]); // sessione attuale
  const [message, setMessage] = useState("");


  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(backendUrl + "/api/items/", {
          headers: { Authorization: `Token ${token}` },
        });
        setMenu(res.data);

        // Trasforma il JSON in un unico array per la PickList
        const allProducts = Object.entries(res.data).flatMap(([category, items]) =>
          items.map((item) => ({
            ...item,
            category,
            quantity: 1,
          }))
        );
        setSource(allProducts);
      } catch (err) {
        console.error("❌ Errore nel caricamento del menu:", err);
      }
    };

    fetchMenu();
  }, []);

  const onChange = (event) => {
    setSource(event.source);
    setTarget(event.target);
  };

  // Funzione per modificare la quantità di un prodotto selezionato
  const updateQuantity = (product, newQty) => {
    setTarget((prev) =>
      prev.map((p) =>
        p.id === product.id && p.category === product.category
          ? { ...p, quantity: newQty }
          : p
      )
    );
  };

  // Template personalizzato per mostrare i prodotti
  const itemTemplate = (product, isTargetList) => {
    return (
      <div className="flex justify-between items-center w-full">
        <div>
          <strong>{product.name}</strong>
          <div style={{ fontSize: "0.85rem", color: "#555" }}>
            {product.category}
          </div>
        </div>
        {isTargetList && (
          <InputNumber
            value={product.quantity}
            onValueChange={(e) => updateQuantity(product, e.value || 1)}
            showButtons
            buttonLayout="horizontal"
            decrementButtonClassName="p-button-secondary"
            incrementButtonClassName="p-button-secondary"
            incrementButtonIcon="pi pi-plus"
            decrementButtonIcon="pi pi-minus"
            min={1}
            style={{ width: "8rem" }}
          />
        )}
      </div>
    );
  };

  return (
    <div className="card" style={{ padding: "2rem" }}>
      <h2>Seleziona prodotti</h2>
      <PickList
        source={source}
        target={target}
        onChange={(e) => {
          setSource(e.source);
          setTarget(e.target);
        }}
        itemTemplate={(item) => (
          <div>
            <strong>{item.name}</strong> <br />
            <small>{item.category}</small>
          </div>
        )}
        sourceHeader="Menu"
        targetHeader="Prodotti selezionati"
        showSourceControls={false}
        showTargetControls={false}
      />
      {message && <p>{message}</p>}
    </div>
  );
}
