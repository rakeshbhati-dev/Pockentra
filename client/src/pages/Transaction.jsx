import Header from "../components/Header";
import { useUser } from "../contexts/UserContextProvider";

function Transaction(){
    const { user, loading,token } = useUser();
    return(
        <>
         <Header firstName={user?.firstName} />
        Transaction
        </>
    )
}

export default Transaction