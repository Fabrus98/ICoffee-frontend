import { useState, useEffect } from "react";
import axios from "axios";
import { Dropdown } from 'primereact/dropdown';
import { Button } from "primereact/button";
import { PickList } from 'primereact/picklist';

export default function Prenotazione() {
  const [isLoading, setIsLoading] = useState(true);
  const [menu, setMenu] = useState({});
  const [thisSession, setThisSession] = useState("");
  const [products, setProducts] = useState([{ category: "", item_id: "", item_description: "", quantity: 1 }]);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [userBookedState, setUserBookedState] = useState(false);

  // carica la sessione attuale e il menu dal backend
  useEffect(() => {
    const preliminaryFetch = async () => {
      try {
        const token = localStorage.getItem("token");

        const sessionRes = await axios.get("/api/session/", {
          headers: { Authorization: `Token ${token}` },
        });
        const productsRes = await axios.get("/api/items/", {
          headers: { Authorization: `Token ${token}` },
        });
        const usersRes = await axios.get("/api/list-users/", {
          headers: { Authorization: `Token ${token}` },
        });

        setUsers(usersRes.data.users);
        setSelectedUser(localStorage.getItem("username"))
        setThisSession(sessionRes.data);
        setMenu(productsRes.data);
      } catch (err) {
        setMessage("❌ Errore nel caricamento preliminare");
      } finally {
        setIsLoading(false);
      }
    };
    preliminaryFetch();
  }, []);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");

      const userAlreadyBookedRes = axios.get("/api/already_booked/", {
        headers: { Authorization: `Token ${token}` },
        params: { username: selectedUser }
      });
      setUserBookedState(userAlreadyBookedRes.data)
      console.log(userAlreadyBookedRes.data)
    } catch (err) {

    }
  }, [selectedUser]);

  // aggiorna stato per un prodotto
  const handleChange = (index, field, value) => {
    const updated = [...products];
    updated[index][field] = value;
    if (field === "category") {
      updated[index].item_id = ""; // reset item se cambio categoria
    }
    setProducts(updated);
  };

  // aggiungi nuovo prodotto
  const addProduct = () => {
    setProducts([...products, { category: "", item_id: "", item_description: "", quantity: 1 }]);
  };

  // invio prenotazione
  const handleSubmit = async (e) => {

    e.preventDefault();
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const rawProductData = products.map((p) => ({
        category: p.category,
        item_id: parseInt(p.item_id, 10),
        item_description: menu[p.category].find(i => i.id === Number(p.item_id))?.description,
        quantity: parseInt(p.quantity, 10),
      }));

      console.log(rawProductData)

      const mergedProductData = []

      rawProductData.forEach(p => {

        const existingIndex = mergedProductData.findIndex(item =>
          item.item_id === p.item_id && item.category === p.category
        );

        if (existingIndex !== -1) {
          // Se esiste già, somma le quantità
          mergedProductData[existingIndex].quantity += p.quantity;
        } else {
          // Se non esiste ancora questo item_id nell'accumulatore
          mergedProductData.push({ ...p }); // Crea una nuova entry
        }
      });

      const bookingData = {
        username: selectedUser,
        session: thisSession,
        products: mergedProductData
      }

      console.log(bookingData)

      await axios.post(
        "/api/bookings/",
        { items: bookingData },
        {
          headers: { Authorization: `Token ${token}` },
        }
      );

      setMessage("✅ Prenotazione effettuata!");
      setProducts([{ category: "", item_id: "", item_description: "", quantity: 1 }]);
    } catch (err) {
      setMessage("❌ Errore nella prenotazione");
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "2rem auto" }}>
      <h2>
        Nuova Prenotazione <br /> Sessione attuale: {thisSession}
      </h2>

      {isLoading ? (
        <div>Caricamento in corso...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="card flex justify-content-center">
            <p>Nuova prenotazione per l'utente:</p>
            <Dropdown
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.value)}
              options={users}
              placeholder="Seleziona un utente"
              className="w-full md:w-14rem"
              filter
            />
          </div>

          {userBookedState ? (
            <p>
              L'utente selezionato ha già effettuato una prenotazione.
              Per aggiungere o rimuovere prodotti bisogna modificare
              l'ordine precedentemente effettuato.
            </p>
          ) : (
            <>
              {products.map((p, index) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid #ccc",
                    padding: "1rem",
                    marginBottom: "1rem",
                    borderRadius: "8px",
                  }}
                >
                  {/* Select categoria */}
                  <label>Categoria:</label>
                  <select
                    value={p.category}
                    onChange={(e) =>
                      handleChange(index, "category", e.target.value)
                    }
                    required
                  >
                    <option value="">-- Seleziona categoria --</option>
                    {Object.keys(menu).map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>

                  <br />

                  {/* Select prodotto */}
                  <label>Prodotto:</label>
                  <select
                    value={p.item_id}
                    onChange={(e) =>
                      handleChange(index, "item_id", e.target.value)
                    }
                    required
                    disabled={!p.category}
                  >
                    <option value="">-- Seleziona prodotto --</option>
                    {p.category &&
                      menu[p.category]?.map((prod) => (
                        <option key={prod.id} value={prod.id}>
                          {prod.name}
                        </option>
                      ))}
                  </select>

                  <br />

                  {/* Quantità */}
                  <label>Quantità:</label>
                  <input
                    type="number"
                    min="1"
                    value={p.quantity}
                    onChange={(e) =>
                      handleChange(index, "quantity", e.target.value)
                    }
                    required
                  />
                </div>
              ))}
            </>
          )}

          {/* ✅ Qui chiudi il ternario prima di continuare con altri elementi */}
          <button type="button" onClick={addProduct}>
            ➕ Aggiungi prodotto
          </button>

          <br />
          <button type="submit">📌 Conferma prenotazione</button>
        </form>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}
