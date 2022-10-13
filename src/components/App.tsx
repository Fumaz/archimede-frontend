import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ChooseTeacher} from "./ChooseTeacher";
import {ChooseStudent} from "./ChooseStudent";
import {ChooseRoom} from "./ChooseRoom";
import {Timetable} from "./Timetable";
import {ChooseType} from "./ChooseType";

export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<Timetable/>}/>
                    <Route path="choose" element={<ChooseType/>}/>
                    <Route path="teacher" element={<ChooseTeacher/>}/>
                    <Route path="student" element={<ChooseStudent/>}/>
                    <Route path="room" element={<ChooseRoom/>}/>
                    <Route path="timetable" element={<Timetable/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
