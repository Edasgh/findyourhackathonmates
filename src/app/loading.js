import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ErrorNotFound() {
  return (
    <div className="w-full h-[90vh] flex justify-center items-center m-auto text-textBgPrimaryHv text-4xl text-center">
      <FontAwesomeIcon icon={faSpinner} spinPulse />
    </div>
  );
}
