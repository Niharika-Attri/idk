import React, {useRef, useEffect} from "react";

const ImageBackgroundDetector = ({imgurl}) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d')

        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = imgurl

        img.onload = () => {
            ctx.drawImage(img, 0, 0)
        }
    })
}