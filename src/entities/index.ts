import { AIAgent } from "./agent";
import { Company } from "./company";
import { Event } from "./event";
import { Feedback } from "./feedback";
import { Match } from "./match";
import { Preference } from "./preference";
import { User } from "./user";
import { UserAgentDeployment } from "./userAgentDeployment";

export const registeredEntities = [
    User,
    Company,
    Preference,
    Match,
    Event,
    Feedback,
    UserAgentDeployment,
    AIAgent,
]