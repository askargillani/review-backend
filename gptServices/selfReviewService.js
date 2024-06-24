import express from "express";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

class SelfReviewService {
    constructor() {
        this.app = express();
        this.apiKey = "3a62feca26f24c41b2dd2549bb63bc04";
        this.endpoint = "https://tlx-ai-hackathon-2024.azure-api.net/gpt-4o/openai/deployments/gpt-4o/chat/completions?api-version=2024-02-15-preview";
        this.systemMessage = `
            You are ChatGPT, an AI assistant trained to detect positive or negative feedback regarding an employee's self-evaluation, as well as to identify the employee's name from the conversation. You will be given two components: context and prompt. Context is an array of previous messages between you (labeled as 'gpt') and the user (labeled as 'user'). You will look for positive or negative comments made by the user and the name of the employee (self) being referred to. You will respond in JSON format.

            The prompt will be the most recent message from the user. Follow these steps to respond appropriately:

            If the prompt is related to the self-review process (either containing a name or a review), proceed to step 2. Otherwise, respond politely that you cannot answer this query and terminate the process. This system does not handle reviews about other people.
            If the name is present in the prompt, set employeeName to the identified name. If a review is present, set review to the identified review.
            If both the name and review are found, inform the user politely that the review has been recorded and will be used during the final evaluation, then make a function call and terminate the process.
            If neither the name nor the review is found in the prompt, search for them in the context starting from the most recent message and working backward.
            If both the name and review are found in the context, inform the user politely that the review has been recorded and will be used during the final evaluation, then make a function call and terminate the process.
            If either the name or the review is still missing, ask the user for the missing information in your response.
            Your response should follow this format:

            functionCall: giveSelfReview if both employeeName and review are set
            employeeName: name if found or null
            review: review if found or null
            response: A polite message acknowledging the feedback if both name and review are found, otherwise asking for the missing information.
            Here are some examples to illustrate how to apply these steps:

            Example 1:
            Request:
            Context: ["How can I help you?"]
            Prompt: "I want to add my self-review."
            Response:
            functionCall: giveSelfReview
            employeeName: null
            review: null
            response: "What is your name and the review you want to add? 🤷‍♂️"
            Explanation: From the prompt to the first message, neither name nor review was found.

            Example 2:
            Request:
            Context: ["How can I help you?", "I want to add my self-review.", "What is your name and the review you want to add?"]
            Prompt: "My name is Ali and I have done incredibly well at stripe dashboard analytics."
            Response:
            functionCall: giveSelfReview
            employeeName: Ali
            review: I have done incredibly well at stripe dashboard analytics.
            response: "Great step towards efficient evaluation! Your self-review has been recorded and will be used during the final evaluation, Ali. 😁"
            Explanation: The name (Ali) and the review (I have done incredibly well at stripe dashboard analytics.) are present in the prompt.

            Example 3:
            Request:
            Context: ["How can I help you?"]
            Prompt: "I did not meet my goals for the quarter."
            Response:
            functionCall: giveSelfReview
            employeeName: null
            review: I did not meet my goals for the quarter.
            response: "I'm sorry to hear that. Can you please provide your name? 🫨"
            Explanation: The review (I did not meet my goals for the quarter.) is present in the prompt, but the name is missing.

            Example 4:
            Request:
            Context: ["How can I help you?"]
            Prompt: "Weather is dark"
            Response:
            functionCall: giveSelfReview
            employeeName: null
            review: null
            response: "Sorry partner, but I can only assist with self-reviews. Unfortunately, I am only talented at review taking. Nvm. 🤣"
            Explanation: The prompt is not within the scope of the self-review assistant.

            Example 5:
            Request:
            Context: ["How can I help you?", "I completed all my tasks using great techniques.", "Great to hear! However, can you please provide your name for the review? 🤔"]
            Prompt: "My name is Shahid"
            Response:
            functionCall: giveSelfReview
            employeeName: Shahid
            review: I completed all my tasks using great techniques.
            response: "The self-review is recorded, Shahid. It will be used during evaluation. Thanks for providing feedback. 😊"
            Explanation: Shahid's name is present in the prompt and the review is in the context.

            With this updated prompt, the system can now handle self-reviews where an employee is evaluating their own performance and does not handle reviews about other people.

        `;
        this.headers = {
            'Accept': '*/*',
            'Accept-Language': 'en-US,en;q=0.9',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Content-Type': 'application/json',
            'Origin': 'https://tlx-ai-hackathon-2024.developer.azure-api.net',
            'Referer': 'https://tlx-ai-hackathon-2024.developer.azure-api.net/',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
            'api-key': this.apiKey,
            'sec-ch-ua': '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'x-ms-api-devportal': 'OpenAI'
        };
    }

    async chatCompletion(context, prompt) {
        try {
            const data = {
                "response_format": { "type": "json_object" },
                "messages": [
                    { "role": "system", "content": this.systemMessage },
                    { "role": "user", "content": JSON.stringify({ context: context, prompt: prompt }) }
                ],
                "max_tokens": 100,
                "temperature": 1.5,
                "frequency_penalty": 1.5,
                "presence_penalty": 1.5,
                "top_p": 0.9,
                "stop": null
            };
            
            const response = await axios.post(this.endpoint, data, { headers: this.headers });
            return response.data.choices[0].message.content;
        } catch (error) {
            console.error('Error making request:', error);
            throw new Error('Error making request');
        }
    }
}

// const rerviewAdditionManagerService = new ReviewAdditionManagerService();
// rerviewAdditionManagerService.chatCompletion("askar","yasir");
export const selfReviewService = new SelfReviewService;
