import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewRoom = () => {
	const [info, setInfo] = useState({});
	const [hotelId, setHotelId] = useState(undefined);
	const [rooms, setRooms] = useState([]);

	const { data, loading, error } = useFetch("/hotels");

	const handleChange = (e) => {
		setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value })); // yaha "prev" ka mtlb info-variable ka previous wala content.
		// callback-function define krtehh time apn jo parameters-create krtehh hai, voh parameters actually ess callback-fn ka parent enn parameters ko input deke ess callback-fn ko call krta hai.
	};

	// MERN-code meh mainly hamesa mostly function k andar ek callback-function toh hota hi hota hai, and voh callback-fn uss function(jismeh callback-fn as parameter pass kiya gaya hai) k duvra hi call kiya jata hai kabhi bhi mtlb after completion of somework or during anytime.

	const handleClick = async (e) => {
		e.preventDefault();
		const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
		try {
			await axios.post(`/rooms/${hotelId}`, { ...info, roomNumbers });
		} catch (err) {
			console.log(err);
		}
	};

	console.log(info);
	return (
		<div className="new">
			<Sidebar />
			<div className="newContainer">
				<Navbar />
				<div className="top">
					<h1>Add New Room</h1>
				</div>
				<div className="bottom">
					<div className="right">
						<form>
							{/* veryimp_notepoint:- ki mtlb agr apnko kabhi bhi ek hi jagah(mtlb ekhi component ya ek hi page meh) multiple components render or mtlb show krne hai then simply and always use map-function , (imp-baat about map-fn is ki yeh map-fn input meh ek callback-function(or mtlb simply "function") leta hai, jisko phir yeh map-fn har element ko as agrument pass krta hai in this callback-function.and phir uske according the callback-function simply return kr deta hai.)  */}
							{/* mtlb apnko har function ka syntax samajna hai. so toh yeh apnko simply kisi code k dekh k samaj sktehh hai, ya phir vs-code auto-suggestion ko dekh k samaj sktehh hai , and yeh auto-suggestion apnko hamesa uss function ka naam likhne pe dikkaee deta hai. */}
							{/* {roomInputs.map()} */}
							{roomInputs.map((input) => (
								<div className="formInput" key={input.id}>
									<label>{input.label}</label>
									<input
										id={input.id}
										type={input.type}
										placeholder={input.placeholder}
										onChange={handleChange} // onChange ess handleChange ko call krta hai. aur mtlb onChange pe ess handleChange-variable meh jo function hai usko call kiya jayega by passing some input-parameter so toh apnko ess handlechange-varialbe  meh function aseh define krna hai ki usmeh yeh agruments hove.
									/>
								</div>
							))}
							<div className="formInput">
								<label>Rooms</label>
								<textarea
									onChange={(e) => setRooms(e.target.value)}
									placeholder="give comma between room numbers."
								/>
							</div>
							<div className="formInput">
								<label>Choose a hotel</label>
								<select
									id="hotelId"
									onChange={(e) => setHotelId(e.target.value)}
								>
									{loading
										? "loading"
										: data &&
										  data.map((hotel) => (
												<option key={hotel._id} value={hotel._id}>
													{hotel.name}
												</option>
										  ))}
								</select>
							</div>
							<button onClick={handleClick}>Send</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewRoom;
