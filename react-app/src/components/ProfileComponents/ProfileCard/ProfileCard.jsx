//This will live on single item page
import { useSelector } from "react-redux";


export const ProfileCard = ({ item }) => {
    const user = useSelector(state => state.session.user);
    console.log("ITEM --->", item);
    console.log('USER --->', user)

    return (
        <div>
            {user.username}
        </div>
    )
}