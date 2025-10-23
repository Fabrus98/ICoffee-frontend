import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Calendar } from 'primereact/calendar';
import { FloatLabel } from 'primereact/floatlabel';
import { Dropdown } from 'primereact/dropdown';
import axios from "axios";

export default function ListaPrenotazioni() {
	const [selectedSession, setSelectedSession] = useState("");
	const [requestedSessionBookings, setRequestedSessionBookings] = useState([]);
	const [productList, setProductList] = useState([]);
	const [userProductList, setUserProductList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [message0, setMessage0] = useState("");
	const [message1, setMessage1] = useState("");
	const [calendarDate, setCalendarDate] = useState(null);
	const [users, setUsers] = useState([]);
  	const [selectedUser, setSelectedUser] = useState("");

	useEffect(() => {	// prende sessione attuale e prenotazioni odierne dal backend
		const preliminaryFetch = async () => {
			try {
				const token = localStorage.getItem("token");
				const sessionRes = await axios.get("/api/session/", {
					headers: { Authorization: `Token ${token}` },
				});
				const currentSession = sessionRes.data;

				const bookingRes = await axios.get("/api/bookings/", {
					headers: { Authorization: `Token ${token}` },
					params: { session_date: currentSession }
				});

				const usersRes = await axios.get("/api/list-users/", {
					headers: { Authorization: `Token ${token}` },
				});

        		setUsers(usersRes.data.users);
				setSelectedUser(localStorage.getItem("username"))
				setSelectedSession(currentSession);
				setCalendarDate(new Date(currentSession));
				setRequestedSessionBookings(bookingRes.data);
				
			} catch (err) {
				setMessage0("❌ Errore nel caricamento preliminare");
			} finally {
				setIsLoading(false);
			}
		};
		preliminaryFetch();
	}, []);

	useEffect(() => {	// aggiornamento lista prodotti generale e dell'utente specifico
		if (requestedSessionBookings.length > 0) {
			const loggedUserName = localStorage.getItem("username")
			const userBooking = requestedSessionBookings.find(b => b.user === loggedUserName)
			const rawProductList = [];

			for (const booking of requestedSessionBookings) {
				const products = booking.products || [];
				for (const p of products) {
					const productAlreadyInList = rawProductList.find(
						(x) => x.category === p.category && x.item_id === p.item_id
					);
					if (productAlreadyInList) {
						productAlreadyInList.quantity += p.quantity;
					} else {
						rawProductList.push({ ...p });
					}
				}
			}

			if (userBooking && userBooking.products) {
				setUserProductList(userBooking.products);
			} else {
				setUserProductList([]);
			}

			setProductList(rawProductList)
		}

	}, [requestedSessionBookings]);



	useEffect(() => {
		if (!calendarDate || isNaN(calendarDate.getTime())) return;
		
		const otherSessionFetch = async () => {

			console.log("passa")

			try {
				const token = localStorage.getItem("token");

				//const requestedSessionString = calendarDate.getDate() + "-" + calendarDate.getMonth() + "-" + calendarDate.getYear()

				const day = String(calendarDate.getDate()).padStart(2, '0');
				const month = String(calendarDate.getMonth() + 1).padStart(2, '0');
				const year = calendarDate.getFullYear();
				const requestedSessionString = `${day}-${month}-${year}`;
				console.log(calendarDate)

				const bookingRes = await axios.get("/api/bookings/", {
					headers: { Authorization: `Token ${token}` },
					params: { session_date: requestedSessionString }
				});

				setSelectedSession(requestedSessionString)
				setRequestedSessionBookings(bookingRes.data);
			} catch (err) {
				setMessage1("❌ Errore caricamento da calendario");
			} finally {
				setIsLoading(false);
			}
		};
		otherSessionFetch();
	}, [calendarDate]);

	return (
		<>
			<div style={{ padding: "2rem", textAlign: "center" }}>
				{message0 && <p>{message0}</p>}
				{message1 && <p>{message1}</p>}
				{isLoading ? (
					<div>Caricamento in corso...</div>
				) : (
					<>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
								marginTop: "1rem"
							}}
						>
							<FloatLabel>
								<Calendar
									value={calendarDate}
									inputId="calendar_date"
									onChange={(e) => setCalendarDate(e.value)}
									touchUI
									showIcon
									showButtonBar
									dateFormat="dd-mm-yy"
									style={{ minWidth: "14rem" }}
								/>
								<label htmlFor="calendar_date">Cerca per data</label>
							</FloatLabel>
							<Dropdown
								value={selectedUser}
								onChange={(e) => setSelectedUser(e.value)}
								options={users}
								placeholder="Seleziona un utente"
								className="w-full md:w-14rem"
								filter
							/>
						</div>

						{requestedSessionBookings.length > 0 ? (
							<div style={{
									flexDirection: "column",
									alignItems: "center",
									justifyContent: "center",
									marginTop: "1rem"
								}}>
								<h2>Colazione del<br></br>{selectedSession}</h2>

								<h2>La prenotazione di {selectedUser}</h2>
								<DataTable value={userProductList} stripedRows style={{ minWidth: "240px" }}>
									<Column field="quantity" header="Qt." />
									<Column field="item_description" header="Prodotto" />
								</DataTable>
							</div>
						) : (
							<h2>Nessun record disponibile per la data selezionata.</h2>
						)}
					</>
				)}
			</div>
		</>
	);
}
