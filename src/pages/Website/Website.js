import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Website/Navbar/Navbar";
import Footer from './../../Components/Website/Footer/Footer';
import SimpleBar from "simplebar-react";
import 'simplebar-react/dist/simplebar.min.css';
import { useRef } from 'react';

export default function Website() {
    const simpleBarRef = useRef(null);

    return (
        <SimpleBar style={{ maxHeight: '100vh', overflow: 'auto' }} scrollableNodeProps={{ ref: simpleBarRef }}>
            <Navbar scrollableNodeRef={simpleBarRef} />
            <Outlet />
            <Footer />
        </SimpleBar>
    );
}
