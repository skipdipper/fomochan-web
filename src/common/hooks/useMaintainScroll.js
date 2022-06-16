import { useState, useEffect } from 'react';
import { useRouter } from "next/router"

export default function useMaintainScroll() {
    const router = useRouter()

    useEffect(() => {
        console.log('useEffect scroll listener ran')

        // router.beforePopState(() => {
        //     restoreScrollPosition();
        //     return true;
        // })

        // Save current scroll position on url change
        router.events.on("routeChangeStart", saveScrollPosition)

        // Restore previous scroll position on url change complete
        router.events.on("routeChangeComplete", restoreScrollPosition)

        return () => {
            router.events.off("routeChangeStart", saveScrollPosition)
            router.events.off("routeChangeComplete", restoreScrollPosition)
        }
    }, [router]);

    function saveScrollPosition() {
        console.log('routeChangeStart');

        const scrollPosition = window.scrollY;
        if (true) { // scrollPosition
            sessionStorage.setItem('scrollPosition', scrollPosition);
            console.log(`saving current scroll position: ${scrollPosition} to session storage`);

            // // Store scroll position in history state instead session storage
            // history.replaceState({
            //     ...window.history.state,
            //     scrollPosition: scrollPosition, // add scrollPosition state
            // }, '')
            // console.log(`History.state before pushState: ${JSON.stringify(history.state)}`);
        } else {
            console.log('scroll position is 0')
        }
    }

    function restoreScrollPosition() {
        console.log('routeChangeComplete');

        if (sessionStorage.scrollPosition) {
            console.log(`restoring previous scroll position: ${sessionStorage.scrollPosition} scrolling...`);
            window.scrollTo({
                top: sessionStorage.scrollPosition,
                left: 0,
                behavior: 'auto'
            });
        }


        // console.log(`History.state on restore scroll: ${JSON.stringify(history.state)}`);
        // // issue: https://github.com/vercel/next.js/discussions/14203

        // if (window.history.state.scrollPosition) {
        //     window.scrollTo({
        //         top: window.history.state.scrollPosition,
        //         left: 0,
        //         behavior: 'auto'
        //     });
        //     console.log(`Retrieving scroll position from History.state: ${JSON.stringify(history.state)}`);

        // }
        // console.log('restoring previous scroll position');

    }


}