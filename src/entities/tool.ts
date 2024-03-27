import { Column, Entity, ManyToMany } from "typeorm";
import DefaultEntity from "./defaultEntity";
import { Agent } from "./agent";

export enum ToolType {
  IndustryResearch = 'INDUSTRY_RESEARCH',
  EmailResponder = 'EMAIL_RESPONDER',
  YouTubeTranscriber = 'YOUTUBE_TRANSCRIBER',
  ExtractDataFromPDF = 'EXTRACT_DATA_FROM_PDF',
  InvoiceGeneratorAssistant = 'INVOICE_GENERATOR_ASSISTANT',
  MarketingRep = 'MARKETING_REP',
  Evveland = "EVVELAND_AI",
  MatchMaker = "MATCHMAKER",
  User = "USER"
}


interface Subtask {
  name: string;
  description?: string;
}

interface PromptChain {
  introduction: string;
  criteriaInput: string;
  dataRetrieval: string;
  matchingAlgorithm: string;
  matchPresentation: string;
  feedbackLoop: string;
}



@Entity()
export class Tool extends DefaultEntity {

  @Column()
  name: string;

  @Column({ nullable: true, type: 'text' })
  description?: string;

  @Column()
  isTemplate: boolean;

  @Column({ type: 'jsonb', nullable: true })
  promptChain?: PromptChain;

  @Column({ type: 'jsonb', nullable: true })
  subtasks?: Subtask[];

  @Column()
  knowledgeBase: string; // Represents the indexName on Langchain

  @Column({ type: 'enum', enum: ToolType, nullable: false, default: ToolType.Evveland })
  type: ToolType;


  @ManyToMany(() => Agent, agent => agent.tools)
  agents: Agent[];

}
