import { useContext } from "react";
import QuiescoContext from "../context/QuiescoProvider";

const useQuiesco = () =>{
    return useContext(QuiescoContext)
}

export default useQuiesco