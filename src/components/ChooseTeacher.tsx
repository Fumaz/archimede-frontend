import React from "react";
import {Button, Center, Container, LoadingOverlay, Select, Space, Text} from "@mantine/core";
import {IconSchool} from "@tabler/icons";
import {useNavigate} from "react-router-dom";
import Cookies from "universal-cookie";


export const ChooseTeacher = () => {
    const [teachers, setTeachers] = React.useState([]);
    const [error, setError] = React.useState(false);
    const [value, setValue] = React.useState<string | null>(null);
    const navigate = useNavigate();

    if (teachers.length === 0) {
        fetch("https://archimedeapi.fumaz.dev/summary", {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            }
        }).then((response) => {
            return response.json();
        }).then((data) => {
            setTeachers(data["DOCENTI"]);
        });
    }

    return (
        <Container fluid className={"vh-100 background"}>
            <Center className={"vh-100"}>
                <Container px={'xl'} py={'xl'} size='sm' className={"panel"}>
                    <LoadingOverlay visible={teachers.length === 0} overlayBlur={2} radius={"xl"}/>

                    <Space h={'xl'}/>

                    <Center>
                        <Text weight={"bolder"} size={40}>Come ti chiami?</Text>
                    </Center>

                    <Space h={'xl'}/>

                    <Select
                        placeholder="Seleziona il tuo nome..."
                        searchable
                        nothingFound="Nessun risultato"
                        data={teachers}
                        size={"xl"}
                        transition="pop-top-left"
                        transitionDuration={80}
                        transitionTimingFunction="ease"
                        icon={<IconSchool size={25}/>}
                        onChange={value => {
                            setError(false);
                            setValue(value);
                        }}
                        error={error}
                    />

                    <Space h={"xl"}/>

                    <Center>
                        <Button size={"xl"} onClick={() => {
                            if (value === null) {
                                setError(true);
                                return;
                            }

                            setError(false);

                            const cookies = new Cookies();

                            cookies.remove("type");
                            cookies.remove("value");

                            cookies.set("type", "teacher", {
                                path: "/",
                                maxAge: 60 * 60 * 24 * 365
                            });
                            cookies.set("value", value, {
                                path: "/",
                                maxAge: 60 * 60 * 24 * 365
                            });

                            navigate("/timetable");
                        }}>CONTINUA</Button>
                    </Center>
                </Container>
            </Center>
        </Container>
    )
}
