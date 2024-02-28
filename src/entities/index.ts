import { Agent } from "./agent";
import { Company } from "./company";
import { Event } from "./event";
import { Feedback } from "./feedback";
import { Match } from "./match";
import { Preference } from "./preference";
import { Tool } from "./tool";
import { User } from "./user";


export const registeredEntities = [
    User,
    Company,
    Preference,
    Match,
    Event,
    Feedback,
    Agent,
    Tool
]