import {Route, Routes} from "react-router-dom";
import {StatusPage} from "../StatusPage";
import {ReservationPage} from "../ReservationPage";
import {DeliveryPage} from "../DeliveryPage";

export const RootPage = () => {

    return (
        <div style={{ paddingTop: '82px', width: '100%' }}>
            <Routes>
                <Route path="/status" element={<StatusPage />} />
                <Route path="/reservation" element={<ReservationPage />} />
                <Route path="/delivery" element={<DeliveryPage />} />
            </Routes>
        </div>
    )
}