import React from "react";

const Footer = () => {
  
    const scrollToTop = ()=> {
      window.scrollTo(0, 0);
  };

 
  return (
     <footer
        className="flex w-full justify-center bg-neutral-200 dark:bg-gray-900 py-4 dark:text-neutral-200 shadow-lg fixed bottom-0 z-10"
        >
        <h5 className="mr-2">Copyright  by Maximilian  &#169;{new Date().getFullYear()}</h5>
        <button onClick={scrollToTop} className="mr-2 fixed bottom-0.5 right-1 z-10 btn-danger-bordered px-4 py-2">Go to Top</button>
      </footer>
       
  );
};

export default Footer;
