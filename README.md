# Nexa: AI-Powered Multi-Chain Yield Aggregator | [Demo Video](https://youtu.be/0vUTFah5Gs4)

A web application designed to simplify DeFi yield farming across multiple blockchains. Nexa identifies and ranks the best yield opportunities from sources like DefiLlama, constructs a clear, multi-step transaction plan, and uses the NEAR blockchain's intent-based architecture for execution.

## Features

-   **Dynamic Pool Ranking:** Fetches and ranks yield pools from DefiLlama based on user-defined amounts and chain preferences.
-   **Intent-Based Execution:** Creates a high-level plan (e.g., Swap → Bridge → Deposit) for the user.
-   **NEAR Wallet Integration:** Connects with NEAR wallets using the official Wallet Selector, with support for browser extensions (Sender) and mobile wallets (Trust Wallet via WalletConnect).
-   **Responsive UI:** A modern, fully responsive user interface built with Next.js, Tailwind CSS, and shadcn/ui.
-   **Light & Dark Mode:** Includes a theme toggle for user preference.

## Tech Stack

-   **Frontend:**
    -   Next.js (React)
    -   TypeScript
    -   Tailwind CSS v4
    -   shadcn/ui
    -   NEAR Wallet Selector
-   **Backend:**
    -   Node.js
    -   Express.js
    -   TypeScript
-   **APIs & Services:**
    -   DefiLlama API (for yield data)
    -   WalletConnect (for mobile wallet communication)

---
## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

-   Node.js (v18 or later)
-   npm (or your preferred package manager)
-   A WalletConnect Project ID from [cloud.walletconnect.com](https://cloud.walletconnect.com/)

### Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd nexa-backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create an environment file:**
    Create a file named `.env` in the `nexa-backend` root directory and add the following variables:
    ```
    PORT=4000
    DEFILLAMA_YIELDS_URL=[https://yields.llama.fi/pools](https://yields.llama.fi/pools)
    ONECLICK_API_BASE=[https://1click-api.intents.near.org](https://1click-api.intents.near.org)
    ```

4.  **Run the backend server:**
    ```bash
    npm run dev
    ```
    The backend will be running at `http://localhost:4000`.

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd nexa-frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create a local environment file:**
    Create a file named `.env.local` in the `nexa-frontend` root directory and add the following variables. Replace the placeholder with your own WalletConnect Project ID.
    ```
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your-project-id-goes-here
    NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
    ```

4.  **Run the frontend development server:**
    ```bash
    npm run dev
    ```
    The frontend will be running at `http://localhost:3000`.

---
## API Endpoints

The backend provides the following core API endpoints for the frontend to consume.

-   **`GET /rank`**: Fetches and ranks yield pools.
    -   **Query Params:** `amount`, `chains`, `token`.
    -   **Returns:** A ranked list of pools, an overall winner, and winners per chain.

-   **`POST /intent`**: Builds a transaction plan and gets a quote.
    -   **Body:** `{ user, amount, fromToken, fromChain, winner }`.
    -   **Returns:** A structured intent plan and a quote including the `depositAddress`.

-   **`POST /submit`**: Acknowledges a transaction submission (no-op in the MVP).

---
## License

This project is licensed under the MIT License.