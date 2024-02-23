import { Column, Entity, ManyToOne } from "typeorm";
import DefaultEntity from "./defaultEntity";
import { AIAgent } from "./agent";


export enum IntegratedTool {
    YOUTUBE_VIDEO_TRANSCRIPTION = "YouTube Video Transcription"
}

@Entity({ name: 'integrated tool' })
export class Tool extends DefaultEntity {

    @Column({ type: 'enum', enum: IntegratedTool, nullable: false })
    name: IntegratedTool;

    @ManyToOne(() => AIAgent, agent => agent.tools)
    agent: AIAgent;

}

// export const addToolsToAgent = async (toolNames: IntegratedTool[], agent: AIAgent): Promise<AIAgent> => {
//     const toolRepository = AppDataSource.getRepository(Tool)

//     for (const toolName of toolNames) {
//         const tool = await toolRepository.findOne({
//             where: { type: toolName }
//         })

//         if (tool) {
//             agent.tools.push(tool);
//         }
//     }

//     return agent;

// }