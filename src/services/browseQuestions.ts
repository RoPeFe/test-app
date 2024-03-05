import { DataObject } from "../interfaces/interfaces";

export const searchQuestions = async ({ number = 60 }: { number?: number } = {}) => {
    try {
        const response = await fetch(`https://opentdb.com/api.php?amount=${number}`);
        const json = await response.json();

        const typedResults: DataObject[] = json.results;

        return typedResults;
    } catch (e) {
        throw new Error('Error al buscar preguntas');
    }
};