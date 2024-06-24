import express from "express";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

class FinalReviewService {
    constructor() {
        this.app = express();
        this.apiKey = "3a62feca26f24c41b2dd2549bb63bc04";
        this.endpoint = "https://tlx-ai-hackathon-2024.azure-api.net/gpt-4o/openai/deployments/gpt-4o/chat/completions?api-version=2024-02-15-preview";
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
        this.tools = [
            {
              "type": "function",
              "function": {
                "name": "updateProgrammingSkills",
                "description": "Check, update and return scale and comments of programming skills of the employee by looking into context, prompt, earlier reviews, managerReviews, selfReviews of employee.",
                "parameters": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string",
                      "description": "The name of the employee i.e. Ali"
                    }
                  },
                  "required": ["name"]
                }
              }
            },
            {
              "type": "function",
              "function": {
                "name": "updateSenseOfResponsibility",
                "description": "Check, update and return scale and comments of sense of responsibility by looking into context, prompt, earlier reviews, managerReviews, selfReviews of employee.",
                "parameters": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string",
                      "description": "The name of the employee i.e. Ali"
                    }
                  },
                  "required": ["name"]
                }
              }
            },
            {
              "type": "function",
              "function": {
                "name": "updateTeamWork",
                "description": "Check, update and return scale and comments of teamwork of the employee by looking into context, prompt, earlier reviews, managerReviews, selfReviews of employee.",
                "parameters": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string",
                      "description": "The name of the employee i.e. Ali"
                    }
                  },
                  "required": ["name"]
                }
              }
            },
            {
              "type": "function",
              "function": {
                "name": "updateSelfLearning",
                "description": "Check, update and return the scale and comments of self learning of the employee by looking into context, prompt, earlier reviews, managerReviews, selfReviews of employee.",
                "parameters": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string",
                      "description": "The name of the employee i.e. Ali"
                    }
                  },
                  "required": ["name"]
                }
              }
            },
            {
              "type": "function",
              "function": {
                "name": "updateProfessionalAppearance",
                "description": "Check, update and return the scale and comments of professional appearance of the employee by looking into context, prompt, earlier reviews, managerReviews, selfReviews of employee.",
                "parameters": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string",
                      "description": "The name of the employee i.e. Ali"
                    }
                  },
                  "required": ["name"]
                }
              }
            }
          ];
    }

    async handlePrompt(context) {
        var messagesList = [{
            "role": "system", "content":`
                You are AI reviewer impact analyzer. Use the dialogues to check on which characteristics, 
                there will be impact on. There can be impact on programming skills, sense of responsibility, teamwork, self 
                learning and professional appearance. By looking at most recent prompt, analyze the impact.
                Impact analysis, programming skills(0), senseOfResponsibility(1), teamwork (2), self-learning(3), and professional appearance(4).
                You will return as json object.
                Note: Name is really important. So until name is not given don't go ahead. Always ask for name again until its not given.
                Example # 1
                Prompts
                [
                    {"role":"gpt","content":"Hey, how can I help you"},
                    {"role":"user","content":"I want to give review"},
                ]
                response will be in json like this always
                {
                    name: null,
                    impactAnalysis: [],
                    response: For review, name is important to begin with. Kindly provide the name of the employee you want to give review about?
                }
                Example # 2
                Prompts
                [
                    {"role":"gpt","content":"Hey, how can I help you"},
                    {"role":"user","content":"I want to give review"},
                    {"role":"gpt","content":"For review, name is important to begin with. Kindly provide the name of the employee you want to give review about?"},
                    {"role":"user","content":"Sorry but we cannot continue without having name so I can have his related information ready from database"},
                ]
                response 
                {
                    name: null,
                    impactAnalysis: [],
                    response: For review, name is important to begin with. Kindly provide the name of the employee you want to give review about?
                }
                Example # 3
                Prompts
                [
                    {"role":"gpt","content":"Hey, how can I help you"},
                    {"role":"user","content":"I want to give review"},
                    {"role":"gpt","content":"For review, name is important to begin with. Kindly provide the name of the employee you want to give review about?"},
                    {"role":"user","content":"Ali"},
                ]
                response 
                {
                    name: "Ali",
                    impactAnalysis: [],
                    response: "Thank you for providing the name. Lets start the final evaluation. Is there anything you want to tell me about Ali."
                },
                Example # 4
                Prompts
                [
                    {"role":"gpt","content":"Hey, how can I help you"},
                    {"role":"user","content":"I want to give review"},
                    {"role":"gpt","content":"For review, name is important to begin with. Kindly provide the name of the employee you want to give review about?"},
                    {"role":"user","content":"Ali"},
                    {"role":"gpt","content":"Thank you for providing the name. Lets start the final evaluation. Is there anything you want to tell me about Ali."},
                    {"role":"user","content": Ali worked extra hours to meet deadline, and learnt how to integrate apis to frontend. Update regarding it.}                
                ]
                response 
                {
                    name: "Ali",
                    impactAnalysis: [2,3],
                    response: "Wait for a second. Let me update teamwork and self learning fields"
                }     
            `
        }];
        messagesList.push(...context);

        try {
            const data = {
                "messages": messagesList,
                "max_tokens": 100,
                "temperature": 1.5,
                "frequency_penalty": 1.5,
                "presence_penalty": 1.5,
                "top_p": 0.9,
                "stop": null,
                "response_format":{ "type": "json_object" }
            }
            const response = await axios.post(this.endpoint, data, { headers: this.headers });
            return response.data.choices[0].message.content;
        } catch (error) {
            console.error('Error making request:', error);
            throw new Error('Error making request');
        }
    }

    async giveScaleAndCommentOfProgrammingSkills(context, managerReviews, pastManagerReviews,name) {
        var programmingSkillsUpdateSystemMessage = `
                You are review writer of programming skills. By looking into context of the context of conversation. Look into manager reviews and if
                not given manager reviews, look into past manager reviews regarding.programming skills and write a good review. Dont give anything other than programming skills and dont evaluate other than programming skills.
                You will give response in this
                format of json
                {
                    scale: "",
                    comments: ""
                }
                Don't write comments more than 15 words but mention manager reviews related to it if any. Dont write references any. Just comment. Dont miss important stuff.
                Scale can be from 1 to 5. 1 is does not meet expectations, 2 meet some expectations, 3 meets most expectations, 4 fully meets expectations, 5 exceeds expectations.
                Usually 4 is given on average who performs really well. But if you have in context, or manager reviews, or pastManagerReviews the proof that the name is employee has
                really worked well, then you can also give 5. context is the conversation happened yet.
                You will get request as this in json
                {
                    context:{},
                    managerReviews:[""],
                    pastManagerReview:[""],
                    name:
                }
            `;

        try {
            const data = {
                "messages": [
                    { "role": "system", "content": programmingSkillsUpdateSystemMessage },
                    { "role": "user", "content": JSON.stringify({ context: context,managerReviews: managerReviews, pastManagerReviews:pastManagerReviews,name: name }) }
                ],
                "max_tokens": 100,
                "temperature": 1.5,
                "frequency_penalty": 1.5,
                "presence_penalty": 1.5,
                "top_p": 0.9,
                "stop": null,
                "response_format":{ "type": "json_object" }
            }
            const response = await axios.post(this.endpoint, data, { headers: this.headers });
            return response.data.choices[0].message.content;
        } catch (error) {
            console.error('Error making request:', error);
            throw new Error('Error making request');
        }
    }
}

export const finalReviewService = new FinalReviewService;
