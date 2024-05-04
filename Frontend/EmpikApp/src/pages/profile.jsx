import UserService from "../services/user-service.js";

export default function Profile() {
    const user = JSON.parse(localStorage.getItem("user"));
    const usern = UserService.getUser(user.id);

    return(
        <div>
            <text>{user.id}</text>
        </div>
    );
}
