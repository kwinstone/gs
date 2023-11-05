import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RoleLimit from "../components/RoleLimit/RoleLimit";

const CheckRole = ({children}) => {
  const {user} = useSelector(s => s)

  const [role, setRole] = useState(null)

  useEffect(() => {
    if(user && user?.Role) {
      setRole(user?.Role)
    }
  },[user])

  if(role === 'Admin') {
    return children;
  }

  if(typeof role === 'string' && role !== 'Admin') {
    return <RoleLimit/>
  }
  
  return null
  // return children;
}

export default CheckRole;