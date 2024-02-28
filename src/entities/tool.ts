import { Column, Entity } from "typeorm";
import DefaultEntity from "./defaultEntity";

export enum IntegratedTool {
    YOUTUBE_VIDEO_TRANSCRIPTION = "YouTube Video Transcription",
    EMAILTOOOL = "Email  Tool",
    EVVELANDAI = "Evveland AI Specialized trained model",
}

@Entity({ name: 'tools equipped with agent' })
export class Tool extends DefaultEntity {

    @Column({ type: 'enum', enum: IntegratedTool, nullable: false, default: IntegratedTool.EVVELANDAI })
    name: IntegratedTool;

    @Column({ nullable: true, type: 'text' })
    description?: string;

}