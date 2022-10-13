import React from "react";
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";
import {Affix, Box, Button, Card, Center, Container, Group, Stack, Text, UnstyledButton} from "@mantine/core";
import {IconSettings} from "@tabler/icons";

function getActualRoom(room: string) {
    let actualRoom = room ? room : "Nessuna aula";

    if (!actualRoom.startsWith("Aula")) {
        if (actualRoom.includes("Aula")) {
            actualRoom = actualRoom.lastIndexOf("Aula") == -1 ? "Aula ?" : actualRoom.substring(actualRoom.lastIndexOf("Aula"));
        }
    }

    return actualRoom;
}

export const Timetable = () => {
    const [timetable, setTimetable] = React.useState<any>(null);
    const order = ['LUN', 'MAR', 'MER', 'GIO', 'VEN', 'SAB'];
    const days = {
        'LUN': 'Lunedì',
        'MAR': 'Martedì',
        'MER': 'Mercoledì',
        'GIO': 'Giovedì',
        'VEN': 'Venerdì',
        'SAB': 'Sabato'
    };

    let initialDay = new Date().getDay() - 1 >= 0 ? new Date().getDay() - 1 : 0;
    const [day, setDay] = React.useState(order[initialDay]);

    const navigate = useNavigate();
    const cookies = new Cookies();

    if (cookies.get("type") === undefined || cookies.get("value") === undefined) {
        navigate("/choose");
    }

    let type = cookies.get("type");
    const value = cookies.get("value");
    let func = null;

    if (type === "teacher") {
        type = "DOCENTI";
        func = teacherCards;
    } else if (type === "student") {
        type = "CLASSI";
        func = studentCards;
    } else if (type === "room") {
        type = "AULE";
        func = roomCards;
    }

    if (timetable === null) {
        fetch("https://archimedeapi.fumaz.dev/" + type + "/" + value, {
            method: "GET",
            mode: "cors",
        }).then((response) => {
            return response.json();
        }).then((data) => {
            setTimetable(data);
        });
    }

    function daysTitles() {
        const children = [];

        for (let i = 0; i < order.length; i++) {
            children.push(dayTitle(order[i], day === order[i]));
        }

        return children;
    }

    function dayTitle(day: string, selected: boolean) {
        return (
            <UnstyledButton onClick={() => setDay(day)} m={0} p={10} style={{}}>
                <Text weight={"bolder"} size={40} m={0} p={0} color={selected ? 'red' : 'black'}>{day[0]}</Text>
            </UnstyledButton>
        )
    }

    function teacherCard(clazz: string, subject: string, teachers: string[], room: string, selectedDay: boolean, time: string) {
        const current = new Date().getHours() === parseInt(time.split(":")[0]) && selectedDay;
        const color = randomColor(clazz);
        const actualRoom = getActualRoom(room);
        const actualClass = clazz ? clazz : subject ? subject : "Nessuna materia";
        const actualSubject = actualClass !== subject ? (subject ? subject : "Nessuna classe") : (clazz ? clazz : "Nessuna classe");

        return (
            <Center p={0} m={0}>
                <Box style={{
                    width: '100%',
                    maxWidth: '1000px',
                    backgroundColor: (current ? 'pink' : 'transparent'),
                    borderRadius: '10px'
                }} px={"sm"}>
                    <Card shadow={"sm"} radius={"md"} withBorder style={{width: '100%', backgroundColor: color}}
                          p={"xl"}>
                        <Group position={"apart"} spacing={"sm"}>
                            <Text size={20} weight={"bold"}>{actualClass}</Text>
                            <Text size={17}>{time.replace('.', ':')}</Text>
                        </Group>

                        <Group position={"apart"} spacing={"sm"}>
                            <Text size={15}>{actualSubject}</Text>
                            <Text size={17}>{actualRoom}</Text>
                        </Group>

                        <Stack p={0} m={0} spacing={0} style={{marginTop: '.5vh'}}>
                            {getTeachers(teachers)}
                        </Stack>
                    </Card>
                </Box>
            </Center>
        )
    }

    function studentCard(clazz: string, subject: string, teachers: string[], room: string, selectedDay: boolean, time: string) {
        const current = new Date().getHours() === parseInt(time.split(":")[0]) && selectedDay;
        const actualRoom = getActualRoom(room);
        const actualClass = clazz ? clazz : subject ? subject : "Nessuna materia";
        const actualSubject = actualClass !== subject ? (subject ? subject : "Nessuna classe") : (clazz ? clazz : "Nessuna classe");
        const color = randomColor(actualClass);

        return (
            <Center p={0} m={0}>
                <Box style={{
                    width: '100%',
                    maxWidth: '1000px',
                    backgroundColor: (current ? 'pink' : 'transparent'),
                    borderRadius: '10px'
                }} px={"sm"}>
                    <Card shadow={"sm"} radius={"md"} withBorder style={{width: '100%', backgroundColor: color}}
                          p={"xl"}>
                        <Group position={"apart"} spacing={"sm"}>
                            <Text size={20} weight={"bold"}>{actualClass}</Text>
                            <Text size={17}>{time.replace('.', ':')}</Text>
                        </Group>

                        <Group position={"apart"} spacing={"sm"}>
                            <Stack p={0} m={0} spacing={0}>
                                {getTeachers(teachers)}
                            </Stack>

                            <Text size={17}>{actualRoom}</Text>
                        </Group>
                    </Card>
                </Box>
            </Center>
        )
    }

    function roomCard(clazz: string, subject: string, teachers: string[], room: string, selectedDay: boolean, time: string) {
        const current = new Date().getHours() === parseInt(time.split(":")[0]) && selectedDay;
        const color = randomColor(clazz);
        const actualRoom = getActualRoom(room);
        const actualClass = clazz ? clazz : subject ? subject : "Nessuna materia";
        const actualSubject = actualClass !== subject ? (subject ? subject : "Nessuna classe") : (clazz ? clazz : "Nessuna classe");

        return (
            <Center p={0} m={0}>
                <Box style={{
                    width: '100%',
                    maxWidth: '1000px',
                    backgroundColor: (current ? 'pink' : 'transparent'),
                    borderRadius: '10px'
                }} px={"sm"}>
                    <Card shadow={"sm"} radius={"md"} withBorder style={{width: '100%', backgroundColor: color}}
                          p={"xl"}>
                        <Group position={"apart"} spacing={"sm"}>
                            <Text size={20} weight={"bold"}>{actualClass}</Text>
                            <Text size={17}>{time.replace('.', ':')}</Text>
                        </Group>

                        <Group position={"apart"} spacing={"sm"}>
                            <Text size={15}>{actualSubject}</Text>
                            <Text size={17}>{actualRoom}</Text>
                        </Group>

                        <Stack p={0} m={0} spacing={0} style={{marginTop: '.5vh'}}>
                            {getTeachers(teachers)}
                        </Stack>
                    </Card>
                </Box>
            </Center>
        )
    }

    function freeCard() {
        return (
            <Center p={0} m={0}>
                <Box style={{
                    width: '100%',
                    maxWidth: '1000px',
                    backgroundColor: 'transparent',
                    borderRadius: '10px'
                }} px={"sm"}>
                    <Card shadow={"sm"} radius={"md"} withBorder style={{width: '100%', backgroundColor: 'orange'}}
                          p={"xl"}>
                        <Group position={"apart"} spacing={"sm"}>
                            <Text size={20} weight={"bold"}>Nessuna lezione</Text>
                            <Text size={17}>Tutto il giorno</Text>
                        </Group>

                        <Group position={"apart"} spacing={"sm"}>
                            <Text size={15}>Goditi il giorno libero!</Text>
                        </Group>
                    </Card>
                </Box>
            </Center>
        )
    }

    function availableCard(time: string) {
        return (
            <Center p={0} m={0}>
                <Box style={{
                    width: '100%',
                    maxWidth: '1000px',
                    backgroundColor: 'transparent',
                    borderRadius: '10px'
                }} px={"sm"}>
                    <Card shadow={"sm"} radius={"md"} withBorder style={{width: '100%', backgroundColor: 'gray'}}
                          p={"xl"}>
                        <Group position={"apart"} spacing={"sm"}>
                            <Text size={20} weight={"bold"}>Ora libera</Text>
                            <Text size={17}>{time.replace('.', ':')}</Text>
                        </Group>

                        <Group position={"apart"} spacing={"sm"}>
                            <Text size={15}>Niente da fare!</Text>
                        </Group>
                    </Card>
                </Box>
            </Center>
        )
    }

    function teacherCards() {
        const children = [];

        let first = -1;
        let last = -1;

        if (timetable !== null) {
            for (let timestamp in timetable[day]) {
                if (timestamp === undefined) {
                    continue;
                }

                if (timetable[day][timestamp] === null) {
                    continue;
                }

                if (first === -1) {
                    first = parseInt(timestamp);
                }

                last = parseInt(timestamp);
            }
        }

        if (timetable !== null) {
            for (let timestamp in timetable[day]) {
                if (timestamp === undefined) {
                    if (parseInt(timestamp) >= first && parseInt(timestamp) <= last) {
                        children.push(availableCard(timestamp));
                    }

                    continue;
                }

                if (timetable[day][timestamp] === null) {
                    if (parseInt(timestamp) >= first && parseInt(timestamp) <= last) {
                        children.push(availableCard(timestamp));
                    }

                    continue;
                }

                const clazz = timetable[day][timestamp]["class"];
                const subject = timetable[day][timestamp]["subject"];
                const teachers = timetable[day][timestamp]["teachers"];
                const room = timetable[day][timestamp]["room"];

                children.push(teacherCard(clazz, subject, teachers, room, true, timestamp));
            }
        }

        if (children.length === 0) {
            children.push(freeCard())
        }

        return children;
    }

    function studentCards() {
        const children = [];

        let first = -1;
        let last = -1;

        if (timetable !== null) {
            for (let timestamp in timetable[day]) {
                if (timestamp === undefined) {
                    continue;
                }

                if (timetable[day][timestamp] === null) {
                    continue;
                }

                if (first === -1) {
                    first = parseInt(timestamp);
                }

                last = parseInt(timestamp);
            }
        }

        if (timetable !== null) {
            for (let timestamp in timetable[day]) {
                if (timestamp === undefined) {
                    if (parseInt(timestamp) >= first && parseInt(timestamp) <= last) {
                        children.push(availableCard(timestamp));
                    }

                    continue;
                }

                if (timetable[day][timestamp] === null) {
                    if (parseInt(timestamp) >= first && parseInt(timestamp) <= last) {
                        children.push(availableCard(timestamp));
                    }

                    continue;
                }

                const clazz = timetable[day][timestamp]["class"];
                const subject = timetable[day][timestamp]["subject"];
                const teachers = timetable[day][timestamp]["teachers"];
                const room = timetable[day][timestamp]["room"];
                children.push(studentCard(clazz, subject, teachers, room, true, timestamp));
            }
        }

        if (children.length === 0) {
            children.push(freeCard())
        }

        return children;
    }

    function roomCards() {
        const children = [];

        let first = -1;
        let last = -1;

        if (timetable !== null) {
            for (let timestamp in timetable[day]) {
                if (timestamp === undefined) {
                    continue;
                }

                if (timetable[day][timestamp] === null) {
                    continue;
                }

                if (timetable[day][timestamp]["class"] === "") {
                    continue;
                }

                if (first === -1) {
                    first = parseInt(timestamp);
                }

                last = parseInt(timestamp);
            }
        }

        if (timetable !== null) {
            for (let timestamp in timetable[day]) {
                if (timestamp === undefined || timestamp === "") {
                    if (parseInt(timestamp) >= first && parseInt(timestamp) <= last) {
                        children.push(availableCard(timestamp));
                    }

                    continue;
                }

                if (timetable[day][timestamp] === null || timetable[day][timestamp] === "") {
                    if (parseInt(timestamp) >= first && parseInt(timestamp) <= last) {
                        children.push(availableCard(timestamp));
                    }

                    continue;
                }

                const clazz = timetable[day][timestamp]["class"];
                const subject = timetable[day][timestamp]["subject"];
                const teachers = timetable[day][timestamp]["teachers"];
                const room = timetable[day][timestamp]["room"];

                if (subject === undefined || subject === "" || subject === null || clazz === undefined || clazz === null || clazz === "") {
                    if (parseInt(timestamp) >= first && parseInt(timestamp) <= last) {
                        children.push(availableCard(timestamp));
                    }

                    continue;
                }

                children.push(roomCard(clazz, subject, teachers, value, true, timestamp));
            }
        }

        if (children.length === 0) {
            children.push(freeCard())
        }

        return children;
    }

    function getTeachers(teachers: string[]) {
        const elements = [];

        for (let i = 0; i < teachers.length; i++) {
            elements.push(<Text size={15} m={0} p={0}>{teachers[i]}</Text>);
        }

        return elements;
    }

    function randomColor(object: any) {
        const random = require('random-seed').create(object);

        return `hsla(${random(100000) % 360}, 100%, 75%, 1)`;
    }

    return (
        <Container fluid style={{backgroundColor: 'rgb(128, 187, 255)', height: '100vh'}} p={0} m={0}>
            <Affix position={{bottom: 20, right: 20}}>
                <Button size={"lg"} radius={"xl"}
                        onClick={() => {
                            navigate("/choose")
                        }}>
                    <IconSettings size={25}/>
                </Button>
            </Affix>

            <Center style={{width: '100vw'}} p={0} m={0}>
                <Group position={"apart"}>
                    {daysTitles()}
                </Group>
            </Center>

            <Container fluid style={{backgroundColor: 'white', height: '100vh', paddingTop: '1%'}} p={0} m={0}>
                <Center style={{width: '100vw'}}>
                    <Stack style={{width: '100vw'}} py={"sm"}>
                        {func != null ? func() : null}
                    </Stack>
                </Center>
            </Container>
        </Container>
    );
}
