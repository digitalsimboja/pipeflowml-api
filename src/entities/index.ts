import { AIAgent } from "./aiAgent";
import { Company } from "./company";
import { Event } from "./event";
import { Feedback } from "./feedback";
import { Match } from "./match";
import { Preference } from "./preference";
import { Role } from "./role";
import { User } from "./user";
import { UserAgentDeployment } from "./userAgentDeployment";

export const registeredEntities = [
    User,
    Role,
    Company,
    Preference,
    Match,
    Event,
    Feedback,
    UserAgentDeployment,
    AIAgent,
]