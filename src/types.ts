import {
    AppState,
    SaluteHandler,
    SaluteRequest,
    SaluteRequestVariable
} from '@salutejs/scenario'


export interface ScenarioAppState extends AppState {

}

export interface ScenarioIntentsVariables extends SaluteRequestVariable {
    articleNumber?: string
}

export interface ScenarioSession extends Record<string, unknown>{
    
}

export type ScenarioRequest = SaluteRequest<ScenarioIntentsVariables, ScenarioAppState>
export type ScenarioHandler = SaluteHandler<ScenarioRequest, ScenarioSession>