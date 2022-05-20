import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const Navbar = () => {
	const { user } = useContext(AuthContext); // yaha object-destructing se apnne authContext ki state meh se sirf "user"-variable liya hai.

	return (
		<div className="navbar">
			<div className="navContainer">
				<Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
					<span className="logo">lamabooking</span>
				</Link>
				{user ? (
					user.username
				) : (
					<div className="navItems" style={{ border: "1px solid orange" }}>
						<button
							className="navButton"
							onClick={(e) => {
								console.log("button is clicked");
								// console.log(`the e event is ${JSON.stringify(e)}`);
							}}
							// mtlb yeh jitne bhi DOM-events hai yeh ek callback-fn expect krtehh hai, mtlb yeh ek function chahtehh hai joki bhi yeh uss event hone pe yeh run krtehh hai.
						>
							Register
						</button>
						<button className="navButton">Login</button>
					</div>
				)}
				{/* {!user ? "ajay" : "hotel"} */}
			</div>
		</div>
	);
};

export default Navbar;
