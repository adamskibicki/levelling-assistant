import { ClassModifier } from "./ClassModifier";
import { Skill } from "./Skill";

export interface CharacterClass {
    id: string;
    name: string;
    level: number;
    modifiers: Array<ClassModifier>;
    skills: Array<Skill>;
}
