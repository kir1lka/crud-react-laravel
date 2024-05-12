import { useAppDispatch, useAppSelector } from "../hooks";
import { removeAccessToken } from "../store/authSlice";
import { removeUser } from "../store/userSlice";

export const Users: React.FC = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);

    const handleClick = () => {
        dispatch(removeAccessToken());
        dispatch(removeUser());
    };

    return (
        <div className="">
            <button onClick={handleClick}>logout</button>
            <p>{user.name} heloy!</p>
        </div>
    );
};
