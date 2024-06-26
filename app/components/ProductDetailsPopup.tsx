'use client'
import React, { useRef } from 'react'

type popupProps = {
    setShowPopup,
    model?,
}

const ProductDetailsPopup: React.FC<popupProps> = ({ setShowPopup, model }: popupProps) => {

    const popupContainerRef = useRef<HTMLDivElement | null>(null);
    const popupCanvasRef = useRef<HTMLCanvasElement | null>(null);

    const handleClosePopup = () => {
        setShowPopup(false)
    }



    return (
        <div ref={popupContainerRef} id="popup" className="popup-container">
            <p id="closePopupBtn" className="close" onClick={handleClosePopup}>x</p>
            <canvas ref={popupCanvasRef} className="popup-canvas" />
        </div>
    )
}

export default ProductDetailsPopup