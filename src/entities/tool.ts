import { Column, Entity } from "typeorm";
import DefaultEntity from "./defaultEntity";

export enum IntegratedTool {
    IndustryResearch = 'INDUSTRY_RESEARCH',
    EmailResponder = 'EMAIL_RESPONDER',
    YouTubeTranscriber = 'YOUTUBE_TRANSCRIBER',
    ExtractDataFromPDF = 'EXTRACT_DATA_FROM_PDF',
    InvoiceGeneratorAssistant = 'INVOICE_GENERATOR_ASSISTANT',
    MarketingRep = 'MARKETING_REP',
    EvvelandAI = "EVVELAND_AI",
    MatchMaker = "MATCHMAKER"
  }

@Entity()
export class Tool extends DefaultEntity {

    @Column({ nullable: true, type: 'text' })
    description?: string;

}
