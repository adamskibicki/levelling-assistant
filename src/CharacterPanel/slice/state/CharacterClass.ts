import { ClassModifier } from "./ClassModifier";
import { Skill } from "./Skill";

export interface CharacterClass {
    name: "None";
    level: number;
    modifiers: Array<ClassModifier>;
    skills: Array<Skill>;
}
