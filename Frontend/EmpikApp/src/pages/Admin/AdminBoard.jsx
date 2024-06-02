import {Link} from "react-router-dom";
import PATH from "../../paths.jsx";

function AdminBoard() {

    return (
        <div>
            <Link to={PATH.ADMIN_ORDERS}>
                <p>Orders</p>
            </Link>

        </div>
    );

}

export default AdminBoard;
