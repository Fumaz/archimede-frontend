import React from "react";
import {useNavigate} from "react-router-dom";
import {Button, Center, Container, LoadingOverlay, Select, Space, Text} from "@mantine/core";
import {IconPencil} from "@tabler/icons";
import Cookies from "universal-cookie";

export const ChooseStudent = () => {
    const [classes, setClasses] = React.useState([]);
    const [error, setError] = React.useState(false);
    const [value, setValue] = React.useState<string | null>(null);
    const navigate = useNavigate();

    if (classes.length === 0) {
        fetch("https://archimedeapi.fumaz.dev/summary", {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            }
        }).then((response) => {
            return response.json();
        }).then((data) => {
            setClasses(data["CLASSI"]);
        });
    }

    return (
        <Container fluid className={"vh-100 background"}>
            <Center className={"vh-100"}>
                <Container px={'xl'} py={'xl'} size='sm' className={"panel"}>
                    <LoadingOverlay visible={classes.length === 0} overlayBlur={2} radius={"xl"}/>

                    <Space h={'xl'}/>

                    <Center>
                        <Text weight={"bolder"} size={40}>In che classe sei?</Text>
                    </Center>

                    <Space h={'xl'}/>

                    <Select
                        placeholder="Seleziona la tua classe..."
                        searchable
                        nothingFound="Nessun risultato"
                        data={classes}
                        size={"xl"}
                        transition="pop-top-left"
                        transitionDuration={80}
                        transitionTimingFunction="ease"
                        icon={<IconPencil size={25}/>}
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

                            cookies.set("type", "student", {
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
    );
}
