# AI Development Rules for Next.js Application

## Core Objectives
1. **Build a Next.js application** using the following core technologies:
   - Next.js v15.3.0-canary.20
   - React v19
   - Tailwind CSS v4
   - shadcn UI (latest version compatible with React v19 and Tailwind CSS v4)
   - React Hook Form
   - Zod

2. **Enforce strict TypeScript practices:**
   - Under no circumstances may the type "any" be used.

## Mandatory Rules
- **Use `pnpm` as the package manager** without exception.
- **Follow the prescribed folder structure exactly:**
  ```
  /app                 # Next.js application code (app router for Next.js 13+)
  /components          # Reusable React components (see components rules below)
  /styles              # Tailwind CSS files and global styles
  /public              # Static assets (images, fonts, etc.)
  /utils               # Utility functions and helper modules
  /lib                 # External libraries and integrations
  /hooks               # Custom React hooks
  /tasks.ai.md        # Maintain a task list to track progress
  /learnings.ai.md     # Record research findings and development learnings
  ```

## Components Folder Rules
- **Organize components by feature or domain.** Each subfolder within `/components` should represent a distinct feature, UI element grouping, or domain area.
- **File Organization and Naming:**
  - **Component Files:** Each component should reside in its own file named using PascalCase (e.g., `UserProfile.tsx`).
  - **Index Files:** When multiple components are part of a single feature, create an `index.ts` file to export them for cleaner imports.
  - **Separation of Concerns:** Split components into smaller, reusable parts if a component becomes too large or complex. Create new files when:
    - The component handles a distinct responsibility.
    - The component is reused in multiple places.
    - The file size or complexity exceeds manageable limits.
- **Guidelines for Creating New Files:**
  - **Evaluate Reusability:** If a component or utility is likely to be reused across different features, place it in the `/components` folder or create a shared subfolder (e.g., `/components/common`).
  - **Feature Isolation:** For feature-specific components, nest them within a subfolder named after that feature (e.g., `/components/Checkout/PaymentForm.tsx`).
  - **Documentation:** Each new file should include a header comment describing its purpose and usage.

## Pre-Development Phase
- **Clarification First:** Before starting research or coding, ask clarifying questions to resolve any ambiguities in requirements.
- **Document Clarifications:** Record any clarifications in `learnings.ai.md`.

## Research and Documentation
- **Conduct thorough research** on integrating all core technologies. Document all findings and decisions in `learnings.ai.md`.
- **Plan Tasks:** Break down the project into detailed, manageable tasks and record them in `tasks.ai.md` before writing any code.

## Development Workflow
1. **Ask Clarifying Questions:** Confirm all requirements and resolve ambiguities before initiating research or coding.
2. **Research:** Investigate best practices for integrating Next.js, React, Tailwind CSS, shadcn UI, React Hook Form, and Zod. Update `learnings.ai.md` with findings.
3. **Task Breakdown:** Create a comprehensive task list in `tasks.ai.md` outlining every necessary step.
4. **Coding:** Begin development only after completing the research and task breakdown.
   - Strictly follow the folder structure and file organization rules.
   - Use only TypeScript types and never use "any".
   - Adhere to React functional component standards and best practices.
5. **Review & Update:** Continuously update `tasks.ai.md` and `learnings.ai.md` with progress, new learnings, and completed tasks.

## Final Instruction
Proceed with these rules rigorously. Ask all necessary questions to clarify requirements before starting research or coding. Follow the file organization and development practices without deviation.