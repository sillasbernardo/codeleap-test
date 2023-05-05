import { createPortal } from "react-dom";

import './Backdrop.scss';

interface PropType {
  closeModal: () => void
}

const Backdrop = ({ closeModal }:PropType) => {
  const backdropRootEl = document.getElementById('backdrop') as HTMLElement;

  return createPortal(<div onClick={closeModal} className="backdrop"></div>, backdropRootEl)
}

export default Backdrop;