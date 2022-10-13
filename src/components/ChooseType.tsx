import React from "react";
import {Button, Center, Container, Group, Space, Text} from "@mantine/core";
import {IconChalkboard, IconPencil, IconSchool} from "@tabler/icons";
import {useNavigate} from "react-router-dom";


export const ChooseType = () => {
    const navigate = useNavigate();

    return (
        <Container fluid className={"vh-100 background"}>
            <Center className={"vh-100"}>
                <Container px={'xl'} py={'xl'} size='sm' className={"panel"}>
                    <Space h={'xl'}></Space>

                    <Center>
                        <Text weight={"bolder"} size={40}>Ciao! Chi sei?</Text>
                    </Center>

                    <Space h={'xl'}></Space>
                    <Group position={"center"} py={"xl"} px={"xl"}>
                        <Container>
                            <Button variant={"outline"} size={"xl"} color={"green"} radius={"md"}
                                    onClick={() => navigate('/student')}>
                                <IconPencil size={50}></IconPencil>
                            </Button>

                            <Center>
                                <Text color={"green"} weight={"bold"} size={20}>Studente</Text>
                            </Center>
                        </Container>

                        <Container>
                            <Button variant={"outline"} size={"xl"} color={"yellow"} radius={"md"}
                                    onClick={() => navigate('/teacher')}>
                                <IconSchool size={50}></IconSchool>
                            </Button>

                            <Center>
                                <Text color={"yellow"} weight={"bold"} size={20}>Professore</Text>
                            </Center>
                        </Container>

                        <Container>
                            <Button variant={"outline"} size={"xl"} color={"red"} radius={"md"}
                                    onClick={() => navigate('/room')}>
                                <IconChalkboard size={50}></IconChalkboard>
                            </Button>

                            <Center>
                                <Text color={"red"} weight={"bold"} size={20}>Aula</Text>
                            </Center>
                        </Container>
                    </Group>
                </Container>
            </Center>
        </Container>
    )
}
