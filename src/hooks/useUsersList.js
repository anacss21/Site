import { useContext } from "react";
import UsersListContext from "../contexto/UserListContext"

function useUsersList() {
    return useContext(UsersListContext);
}

export default useUsersList;