import type { User } from "./user.types";

const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "Ana Silva",
    email: "ana.silva@example.com",
    plan: "free",
    cpf: "12345678901",
    birthDate: "1992-03-15",
  },
  {
    id: "2",
    name: "Bruno Costa",
    email: "bruno.costa@example.com",
    plan: "pro",
    cpf: "98765432100",
    birthDate: "1988-11-02",
  },
  {
    id: "3",
    name: "Carla Mendes",
    email: "carla.mendes@example.com",
    plan: "free",
    cpf: "11144477735",
    birthDate: "1995-07-22",
  },
  {
    id: "4",
    name: "Daniel Oliveira",
    email: "daniel.oliveira@example.com",
    plan: "pro",
    cpf: "52998224725",
    birthDate: "1990-01-20",
  },
  {
    id: "5",
    name: "Elena Ferreira",
    email: "elena.ferreira@example.com",
    plan: "free",
    cpf: "39053344705",
    birthDate: "1993-12-08",
  },
  {
    id: "6",
    name: "Felipe Santos",
    email: "felipe.santos@example.com",
    plan: "pro",
    cpf: "86288366757",
    birthDate: "1985-09-30",
  },
  {
    id: "7",
    name: "Gabriela Lima",
    email: "gabriela.lima@example.com",
    plan: "free",
    cpf: "19119119100",
    birthDate: "1998-04-12",
  },
  {
    id: "8",
    name: "Henrique Alves",
    email: "henrique.alves@example.com",
    plan: "pro",
    cpf: "24856374043",
    birthDate: "1991-06-25",
  },
  {
    id: "9",
    name: "Isabela Rocha",
    email: "isabela.rocha@example.com",
    plan: "free",
    cpf: "08528372804",
    birthDate: "1994-02-14",
  },
  {
    id: "10",
    name: "João Pereira",
    email: "joao.pereira@example.com",
    plan: "pro",
    cpf: "33428373001",
    birthDate: "1987-10-03",
  },
];

const MOCK_DELAY_MS = 400;

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function listUsersMock(): Promise<User[]> {
  await delay(MOCK_DELAY_MS);
  return [...MOCK_USERS];
}
