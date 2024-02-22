import { Column, Entity, ManyToOne } from "typeorm";
import DefaultEntity from "./defaultEntity";
import { AIAgent } from "./agent";

export enum IntegratedTool {
    YOUTUBE_VIDEO_TRANSCRIPTION = "YouTube Video Transcription"
}

@Entity()
export default class Tools extends DefaultEntity {
    @Column()
    name: string;

    @Column({ type: 'enum', enum: IntegratedTool, nullable: false })
    type: IntegratedTool;

    @ManyToOne(() => AIAgent, agent => agent.tools)
    agent: AIAgent;
}