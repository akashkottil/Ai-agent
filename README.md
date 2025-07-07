# Chatiko: Your AI-Powered Assistant

Welcome to Chatiko, a versatile and intelligent chatbot built with Next.js, Genkit, and ShadCN UI. This application provides a seamless chat interface where you can interact with an AI assistant that can adopt various roles, such as a Real Estate Agent, Financial Advisor, and more.

## Getting Started

To get the application running on your local machine, follow these steps:

### Prerequisites

-   Node.js (v18 or later)
-   npm or yarn

### Installation

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your Google AI API key:
    ```
    GOOGLE_API_KEY=your_google_api_key_here
    ```
    You can obtain a key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Running the Application

You need to run two processes in separate terminals: the Next.js frontend and the Genkit AI flows.

1.  **Start the Next.js development server:**
    ```bash
    npm run dev
    ```
    This will start the frontend on `http://localhost:9002`.

2.  **Start the Genkit development server:**
    ```bash
    npm run genkit:dev
    ```
    This starts the Genkit developer UI, which allows you to inspect and test your AI flows. You can access it at `http://localhost:4000`.

Now, you can open your browser and navigate to `http://localhost:9002` to start using the application.

## Project Structure & Routes

This project uses the Next.js App Router. Here's an overview of the key files and routes:

### Frontend Route

-   **`src/app/page.tsx`**
    -   **Route:** `/`
    -   **Description:** This is the main and only page of the application. It renders the `ChatInterface` component, which provides the full chat experience.

### AI Flows (Server-Side Logic)

The core AI functionality is handled by Genkit flows, which are server-side functions that can be called from the frontend. These are not directly accessible as HTTP endpoints in the Next.js app but are exposed for development and debugging via the Genkit developer UI.

-   **`src/ai/flows/generate-bot-response.ts`**
    -   **Flow:** `generateBotResponse`
    -   **Purpose:** This flow is the heart of the chatbot. It takes the user's message, the selected bot persona (role), and the conversation history as input. It then calls the Gemini model to generate a contextually relevant response.
    -   **Inputs:** `userMessage`, `botRole`, `chatHistory`
    -   **Output:** `botResponse`

-   **`src/ai/flows/improve-response-quality.ts`**
    -   **Flow:** `improveResponseQuality`
    -   **Purpose:** This flow is designed to refine the bot's responses based on user feedback. It takes an original message and the user's corrective feedback to generate a better, more accurate response. (Note: This feature is not yet fully implemented in the UI).
    -   **Inputs:** `message`, `feedback`, `botRole`
    -   **Output:** `improvedResponse`

## How to Use the Application

1.  **Navigate to the Homepage:** Open your browser to `http://localhost:9002`.
2.  **Select a Role:** Use the dropdown menu at the top right to choose a persona for the AI assistant (e.g., "Real Estate Agent"). The chat will reset with a new introductory prompt for that role.
3.  **Start Chatting:** Type your message in the input box at the bottom and press Enter or click the send button.
4.  **Clear Chat:** Click the trash can icon to clear the current conversation and start over.
