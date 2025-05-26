import { Link } from "react-router-dom";

import backButton from "@/assets/images/back_button.png";

const NotFound = () => {
  return (
    <>
      <div className="relative h-screen bg-[url(assets/images/error_page_404.png)] bg-no-repeat bg-contain bg-center">
        <Link
          to="/"
          className="absolute h-[100px] w-[100px] left-[30px] top-[30px] block"
        >
          <img
            className="object-contain"
            src={backButton}
          />
        </Link>
      </div>
    </>
  );
};

export default NotFound;
