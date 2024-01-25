# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list




 # Forum Frontend Application

This is a simple forum frontend application written in React. The application provides user authentication, thread creation, and thread details functionalities.

## Setup Instructions

Follow these steps to set up and run the forum frontend application on your local machine.

### Prerequisites

- Node.js installed on your machine
- The backend server (forum-backendplsda) is running on [http://localhost:8080](http://localhost:8080)

### Steps

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/your-frontend-repo.git
   cd your-frontend-repo ```

2. **Install Dependencies:**

 ```bash
npm install ```

3. **Run:**

 ```bash
npm run dev
```

### Navigation:

Navigate through the Application:
The Landing page ("/") will prompt you to login to signup.
Navigate to "/login" to access the login page.
Navigate to "/signup" to access the signup page.
After logging in, user will be navigated to "/home" to access the home page, where user can see all threads.
Explore a thread in detail by clicking on a thread in the home page.
Create a new thread by navigating to "/create-thread" or by clicking "Create Thread" on the homepage.



