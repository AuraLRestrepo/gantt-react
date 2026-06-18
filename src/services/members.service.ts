import type { Member } from "@/types";

const members: Member[] = [
  {
    id: "m1",
    name: "Ana Torres",
    initials: "AT",
    role: "UX Researcher",
    avatarColor: "#5b5bf6",
    email: "ana.torres@gantt.pro",
  },
  {
    id: "m2",
    name: "Sofía Núñez",
    initials: "SN",
    role: "Tech Lead",
    avatarColor: "#16a34a",
    email: "sofia.nunez@gantt.pro",
  },
  {
    id: "m3",
    name: "Marco Díaz",
    initials: "MD",
    role: "Product Designer",
    avatarColor: "#d97706",
    email: "marco.diaz@gantt.pro",
  },
];

export function getMembers(): Member[] {
  return members;
}

export function getMemberById(id: string): Member | undefined {
  return members.find((member) => member.id === id);
}

export default members;
