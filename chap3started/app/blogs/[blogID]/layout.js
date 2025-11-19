import React from 'react'

const layout = ({children}) => {
   // throw new Error("Error occurred");//this error cannot be handleed untill we move error file into parent blogs folder from blogID or a new error.js new to handle this in parent    return (
    return(<div>
        this is layout of blog page
      {children}
    </div>
  );
}

export default layout
