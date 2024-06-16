import {Link} from "react-router-dom";
import PATH from "../../paths.jsx";

function AdminBoard() {

    return (
        <div>
            <Link to={PATH.ADMIN_ORDERS}>
                <p>Orders</p>
            </Link>
            <Link to={PATH.ADMIN_ADD_PRODUCT}>
                <p>Add product</p>
            </Link>

        </div>
    );

}

export default AdminBoard;
