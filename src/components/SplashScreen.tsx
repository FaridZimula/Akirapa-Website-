
import React, { useEffect, useState } from "react";

const SplashScreen = () => {
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        // Start fading out slightly before the 4s mark for smooth transition if needed,
        // but the parent controls unmounting.
        // Let's just keep it simple and static, waiting for parent to unmount it.
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-1000">
            <div className="animate-pulse">
                <img
                    src="/Welcome logo.png"
                    alt="Welcome to SUYEL"
                    className="w-64 md:w-80 h-auto object-contain"
                />
            </div>
        </div>
    );
};

export default SplashScreen;
