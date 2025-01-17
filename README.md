# ToDo Web App

This is a mobile-adaptive ToDo web app built with **Next.js (App Router)**, **Redux Toolkit**, **Axios**, **MUI (Material-UI)**, and **TypeScript**. It allows users to create, update, delete, and list tasks. Task details are displayed in a modal when clicked.

---

## **Features**
- **Create Tasks**: Add new tasks with a title, description, start date, end date, and a "Completed" checkbox.
- **Update Tasks**: Edit existing tasks.
- **Delete Tasks**: Remove tasks from the list.
- **List Tasks**: View all tasks in a responsive layout.
- **Task Details Modal**: Click on a task to view its details in a modal.
- **Mobile-First Design**: Optimized for mobile devices with a clean and intuitive UI.

---

## **Tech Stack**
- **Frontend**:
    - React
    - Next.js (App Router)
    - Redux Toolkit (State Management)
    - Axios (API Calls)
    - MUI (Material-UI for UI Components)
    - TypeScript

---

## **Setup and Run Instructions**

### **Prerequisites**
- Node.js (v18 or higher)
- npm or yarn

### **Steps to Run the Project**

1. **Clone the Repository**
   ```bash
   git clone https://github.com/AAroRaad/todo_list.git
   cd todo_list

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install

3. **Run the Development Server**
   ```bash
   npm run dev
   # or
   yarn dev

4. **Open the App**

    - Open your browser and navigate to http://localhost:3000.

---
## **Project Structure**
```bash

todo_list/
├── public/   
├── src/   
│   ├── app/                   # Next.js app directory
│   │   ├── favicon.ico              # API route handlers
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── store.ts
│   │   ├── theme.ts
│   │   └── ThemeRegistry.tsx 
│   │
│   ├── components/       
│   │   ├── AllTasks.tsx    
│   │   ├── CreateTaskModal.tsx  
│   │   ├── Providers.tsx 
│   │   ├── TabsComponent.tsx   
│   │   ├── TaskCard.tsx 
│   │   ├── TaskDetailsModal.tsx
│   │   └── TaskList.tsx 
│   │
│   ├── features/          
│   │   └── tasks/        
│   │       └── taskSlice.ts       
│   │    
│   ├── types/  
│   │   └── task.ts  
│   │
│   ├── utils/  
│   │   └── helper.ts  
│   │                 
├── .gitignore
├── next.config.js
├── package.json
├── package-lock.json
├── README.md
├── tailwind.config.ts
└── tsconfig.json