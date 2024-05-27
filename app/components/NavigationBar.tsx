'use client'
import { Button } from "@/components/ui/button";
import LogInForm from "./userForm";
import { useState } from "react";

function NavBar() {
  const [formState,setFormState] = useState(false)

  function showForm() {
    setFormState(true)
  }

  function closeForm() {
    setFormState(false)
  }

  return (
    <div>
      {formState 
        ? 
          <LogInForm close={closeForm} /> 
        :
          <div className="fixed flex justify-end w-full p-3 z-50">
            <Button onClick={showForm}>Login</Button>
          </div> 
      }
    </div>
  )
}

export default NavBar;