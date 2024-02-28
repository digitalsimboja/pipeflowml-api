import { Column, Entity } from "typeorm";
import DefaultEntity from "./defaultEntity";

export enum IntegratedTool {
    YOUTUBE_VIDEO_TRANSCRIPTION = "YouTubeVideoTranscription",
    EMAILTOOOL = "emailresponder",
    EVVELANDAI = "evvelandai",
}

@Entity()
export class Tool extends DefaultEntity {

    @Column({ type: 'enum', enum: IntegratedTool, nullable: false, default: IntegratedTool.EVVELANDAI })
    name: IntegratedTool;

    @Column({ nullable: true, type: 'text' })
    description?: string;

}
