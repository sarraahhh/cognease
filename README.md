# 🧠 Cognitive Load Redistribution Agent

**An Agentic Wellness System for Detecting and Redistributing Invisible Cognitive Labor in Women**

---

## Overview

Modern wellness and productivity systems often assume burnout is caused by poor habits or lack of motivation. However, for many women, the root cause is **chronic invisible cognitive load** — the continuous mental effort involved in planning, remembering, coordinating, anticipating, and emotionally managing tasks.

This invisible cognitive labor is:

- Rarely quantified  
- Unevenly distributed  
- Often misinterpreted as low discipline or low energy  

As a result, existing systems frequently **add more tasks instead of reducing mental burden**, accelerating burnout rather than preventing it.

The **Cognitive Load Redistribution Agent** addresses this gap by detecting cognitive overload, reasoning about its causes, and recommending task simplification or redistribution through an **agentic decision-making loop**.

---

## 🎯 Target Users & Use Cases

### Target Users
- Women students and professionals  
- Women managing multiple roles (academics, work, caregiving)  
- Users experiencing burnout, chronic fatigue, or habit collapse  

### Use Cases
- Early detection of cognitive overload  
- Understanding why routines fail despite effort  
- Reducing mental strain through task simplification  
- Preventing burnout via proactive intervention  

---

## Why an Agentic System?

This problem **cannot be solved** with static rules or a simple chatbot because:

- Cognitive load changes daily  
- Overload emerges from patterns over time  
- The system must decide **when to intervene and when not to**  
- Trade-offs must be made under limited attention and energy  

An agentic system enables:

- Continuous observation  
- Context-aware reasoning  
- Decision-based interventions  
- Adaptive behavior over time  

> The goal is **not prediction accuracy**, but ongoing reasoning and decision-making.

---

## Agent Design

### Primary Agent: Cognitive Load Agent

#### 🎯 Goals
- Minimize sustained cognitive overload  
- Preserve user wellbeing and habit consistency  
- Prevent burnout escalation  

#### Constraints
- Limited user attention  
- Ethical boundaries (non-clinical, decision-support only)  
- Avoid over-intervention or decision fatigue  

#### Responsibilities
- Estimate intrinsic, extraneous, and germane cognitive load  
- Detect overload conditions  
- Decide whether to simplify, chunk, defer, or take no action  
- Explain decisions transparently  

---

##  System Architecture


Frontend (React + Tailwind)
        ↓
Backend Agent (FastAPI)
  - Cognitive load estimation
  - Agent decision logic
  - Conditional LLM usage
        ↓
Structured JSON response
        ↓
Frontend visualization


## 🔁 Agent Reasoning Workflow

### 1️⃣ Observe
User provides task descriptions representing current workload and mental demand.

### 2️⃣ Analyze
The agent derives cognitive load indicators using interpretable heuristics and computes:
- **Intrinsic load**
- **Extraneous load**
- **Germane load**

### 3️⃣ Plan
The agent evaluates thresholds and decides whether to:
- Simplify tasks  
- Chunk tasks  
- Defer low-impact components  
- Take no action  

### 4️⃣ Act
The system presents:
- Simplified task instructions (if required)  
- Agent decisions and reasoning  
- A cognitive relief checklist  

### 5️⃣ Adapt
Subsequent inputs may reflect reduced load, demonstrating adaptive behavior over time.

---

## Implementation Details

### Cognitive Load Estimation
- Heuristic-based, interpretable model  
- Weighted contributions with bounded ranges  
- Normalized cognitive load score (0–100)  

### Decision Logic
- Rule-based and state-aware  
- LLM usage is gated and invoked only when simplification is required  
- Prevents unnecessary intervention and hallucination  

### LLM Usage
- Open-source summarization model (free tier)  
- Used on
- ly for task simplification  
- Output is sanitized and converted into bullet-point checklists  

---

## Cognitive Relief Checklist

In addition to task simplification, the system provides optional cognitive offloading suggestions such as:
- Breaking tasks into smaller steps  
- Deferring non-urgent components  
- Writing things down instead of remembering  
- Reducing expectations for overloaded tasks  

These suggestions reduce mental burden without adding new obligations.

---

## Ethical Considerations & Limitations

### Limitations
- Relies on self-reported task descriptions  
- Simplified cognitive load estimation  
- Does not replace medical or mental health care  

### Ethical Framing
- Decision-support only  
- No diagnosis or prescriptive enforcement  
- User retains full control over actions  

---

## Setup & Execution

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn api:app --reload

-----
```
### Frontend
```bash
cd frontend
npm install
npm run dev



````

## What This Project Demonstrates
- Agentic reasoning and autonomy  
- Transparent decision-making  
- Responsible LLM usage  
- Ethical system boundaries  
- Real-world applicability for women’s wellness  

💙 **Built with a focus on care, clarity, and cognitive wellbeing.**

