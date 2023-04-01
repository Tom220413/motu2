import { useEffect } from "react";

declare global {
    interface Window {
        google: any;
    }
}

export const Map = () => {
    useEffect(() => {
        // Google Maps APIが読み込まれるまで待つ
        if (typeof window.google === "undefined") {
            const t = setInterval(() => {
                if (typeof window.google !== "undefined") {
                    clearInterval(t);
                    initializeMap();
                }
            }, 100);
        } else {
            initializeMap();
        }
    }, []);

    const initializeMap = () => {
        const map = new window.google.maps.Map(document.getElementById("map"), {
            center: { lat: 35.6809591, lng: 139.7673068 },
            zoom: 8,
        });

        // マーカーを追加する
        const marker = new window.google.maps.Marker({
            position: { lat: 35.6809591, lng: 139.7673068 },
            map: map,
            title: "Tokyo",
        });
    };

    return <div id="map" style={{ height: "500px", width: "100%" }}></div>;
};

export default Map;
